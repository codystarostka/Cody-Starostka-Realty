# Cody Starostka Real Estate Website

Licensed Real Estate Agent | eXp Realty | IL · MI · FL

## Deployment Instructions

### Step 1 — Upload to GitHub

1. Go to github.com and sign in (or create a free account)
2. Click the green **"New"** button to create a repository
3. Name it `cody-starostka-realty`
4. Set it to **Public**
5. Click **"Create repository"**
6. On the next screen, click **"uploading an existing file"**
7. Drag and drop ALL files from this folder into GitHub:
   - `package.json`
   - `vite.config.js`
   - `index.html`
   - `README.md`
   - The entire `src/` folder (containing `App.jsx` and `main.jsx`)
8. Click **"Commit changes"**

### Step 2 — Deploy on Vercel

1. Go to vercel.com and sign up free with your GitHub account
2. Click **"Add New Project"**
3. Find and select your `cody-starostka-realty` repository
4. Vercel will auto-detect it as a Vite project — don't change any settings
5. Click **"Deploy"**
6. Done! Your site is live at a `.vercel.app` URL in about 60 seconds

### Step 3 — Connect Your HostGator Domain

1. In Vercel, go to your project → **Settings → Domains**
2. Type in your domain (e.g. `codystarostka.com`) and click **Add**
3. Vercel will show you:
   - An **A record**: `@` → `76.76.21.21`
   - A **CNAME record**: `www` → `cname.vercel-dns.com`
4. Log into HostGator → **Domains → Manage Domains** → click your domain
5. Go to **DNS Management / Zone Editor**
6. Delete any existing A record pointing to HostGator
7. Add the new A record and CNAME from Vercel
8. Save — your domain will be live within 1 hour (up to 48 hrs)

### Making Changes Later

To update text, colors, or content:
- Open `src/App.jsx` in any text editor
- Make your changes
- Re-upload the file to GitHub (same drag-and-drop process)
- Vercel automatically redeploys within seconds

Or simply come back to Claude and say "update my website" — paste in your current App.jsx and describe what you want changed.

---

**Contact:** (708) 310-9619 | codystarostka@gmail.com
