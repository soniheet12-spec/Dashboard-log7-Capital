import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const url = process.env.STARTUP_SHEET_URL
    if (!url) return NextResponse.json({ error: 'STARTUP_SHEET_URL not set' }, { status: 500 })

    const res = await fetch(url, { cache: 'no-store' })
    const json = await res.json()

    if (!json.success) throw new Error(json.error)

    const startups = json.data.map((row: Record<string, string>) => ({
      timestamp: row['Timestamp'] || '',
      email: row['email address'] || '',
      company: row['Company Name'] || '',
      founder: row["Founder's Name"] || '',
      phone: row["Founder's Contact No."] || '',
      sector: row['Sector'] || '',
      location: row['Location'] || '',
      website: row['Website'] || '',
      valuation: row['Proposed Valuation'] || '',
      roundSize: row['Round Size'] || '',
      fundedBefore: row['Have you received funding earlier? If yes, please provide details'] || '',
      problem: row['What problem are you solving?'] || '',
      currentRound: row['Current Round'] || '',
      arr: row['ARR(Annual run-rate)'] || '',
      prevRevenue: row['Previous Month\'s Revenue'] || '',
      pitchDeckUrl: row['Attach your Pitch Deck (PDF)'] || '',
      stage: row['What stage is your company in?'] || '',
    })).filter((s: {company: string}) => s.company)

    return NextResponse.json({ startups })
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed to fetch startups' }, { status: 500 })
  }
}
