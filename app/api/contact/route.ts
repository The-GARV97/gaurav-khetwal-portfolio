import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  subject: z.string().trim().min(3).max(140),
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(0).optional().or(z.literal('')),
})

const recentSubmissions = new Map<string, number>()
const WINDOW_MS = 60_000

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const now = Date.now()
  const lastSubmission = recentSubmissions.get(ip)
  if (lastSubmission && now - lastSubmission < WINDOW_MS) {
    return NextResponse.json({ error: 'Please wait a minute before sending another message.' }, { status: 429 })
  }

  try {
    const payload = await request.json()
    const parsed = contactSchema.safeParse(payload)
    if (!parsed.success) return NextResponse.json({ error: 'Please check the form and try again.' }, { status: 400 })
    if (parsed.data.website) return NextResponse.json({ ok: true })

    const supabase = createClient(
      process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } },
    )
    const { error } = await supabase.from('contact_submissions').insert({
      name: parsed.data.name,
      email: parsed.data.email,
      subject: parsed.data.subject,
      message: parsed.data.message,
    })
    if (error) {
      console.error('[v0] contact submission failed:', error.message)
      return NextResponse.json({ error: 'Could not send your message right now.' }, { status: 500 })
    }
    recentSubmissions.set(ip, now)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[v0] contact request failed:', error)
    return NextResponse.json({ error: 'Please check the form and try again.' }, { status: 400 })
  }
}
