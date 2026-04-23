import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const url = process.env.INVESTOR_SHEET_URL
    if (!url) return NextResponse.json({ error: 'INVESTOR_SHEET_URL not set' }, { status: 500 })

    const res = await fetch(url, { cache: 'no-store' })
    const json = await res.json()

    if (!json.success) throw new Error(json.error)

    // Map your exact column headers to clean field names
    const investors = json.data.map((row: Record<string, string>) => ({
      name: row['Full Name'] || '',
      phone: row['WhatsApp Number'] || '',
      email: row['Email Address'] || '',
      type: row['Investor Type'] || '',
      ticketSize: row['Typical Ticket Size'] || '',
      sectors: row['Sector Preferences'] || '',
      stage: row['Investment Stage Preference'] || '',
      sendVia: row['Where should we send you investment opportunities?'] || '',
      startupStage: row['Startup Stage Preference'] || '',
      sweetSpot: row["What's your sweet spot in terms of investment?"] || '',
      thesis: row['Thesis Notes'] || '',
      hardNos: row["Hard No's"] || '',
      deploying: row['Currently Deploying'] || '',
      submittedAt: row['Submitted At'] || '',
    })).filter((i: {name: string}) => i.name)

    return NextResponse.json({ investors })
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed to fetch investors' }, { status: 500 })
  }
}
