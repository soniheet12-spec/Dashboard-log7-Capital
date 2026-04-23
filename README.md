# Log7 Capital — Deal Matching Platform

A private web app that pulls live data from your Google Sheets, reads pitch decks, and uses AI to match startups with investors.

---

## Setup in 4 steps

### Step 1 — Deploy Apps Script on your Investor Sheet

1. Open your **Investor Google Sheet**
2. Click **Extensions → Apps Script**
3. Delete any existing code
4. Open the file `INVESTOR_APPSCRIPT.js` from this repo and paste the entire contents
5. Click **Save** (floppy disk icon)
6. Click **Deploy → New deployment**
7. Click the gear icon next to "Type" and select **Web app**
8. Set **Execute as** → Me
9. Set **Who has access** → Anyone
10. Click **Deploy** → copy the Web app URL (looks like `https://script.google.com/macros/s/ABC123.../exec`)
11. Save this URL — this is your `INVESTOR_SHEET_URL`

Repeat the same steps for your **Startup Google Sheet** using `STARTUP_APPSCRIPT.js` — save that URL as `STARTUP_SHEET_URL`

---

### Step 2 — Get your Anthropic API key

1. Go to **console.anthropic.com**
2. Sign up or log in
3. Go to **API Keys → Create Key**
4. Copy the key (starts with `sk-ant-...`)

---

### Step 3 — Push to GitHub

1. Create a new repo on GitHub called `log7capital` (set to **Private**)
2. On your computer, open Terminal and run:

```bash
git clone https://github.com/YOURUSERNAME/log7capital.git
cd log7capital
```

3. Copy all the files from this project into that folder
4. Run:

```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

---

### Step 4 — Deploy on Vercel

1. Go to **vercel.com** and log in
2. Click **Add New → Project**
3. Import your `log7capital` GitHub repo
4. Before clicking Deploy, click **Environment Variables** and add:

| Name | Value |
|------|-------|
| `ANTHROPIC_API_KEY` | your key from Step 2 |
| `INVESTOR_SHEET_URL` | your URL from Step 1 |
| `STARTUP_SHEET_URL` | your URL from Step 1 |

5. Click **Deploy**
6. Your app is live at `https://log7capital.vercel.app`

---

## How to use

1. Open your Vercel URL
2. Click **Load from Google Sheets** — pulls live investor and startup data
3. Go to **Match** tab, select a startup
4. Upload their pitch deck PDF (or open their submitted deck from Drive)
5. Click **Run AI Match**
6. See every investor ranked 0–100 with reasons and concerns

Every time you click **Refresh from Sheets** it pulls the latest data — no manual entry needed.

---

## Adding new investors or startups

Just fill in your Google Forms as usual. Next time you click Refresh in the app, they appear automatically.
