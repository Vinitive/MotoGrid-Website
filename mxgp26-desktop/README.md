# MotoGrid MXGP 26 Series — Windows Desktop App

A standalone Tauri desktop app for the MXGP 26 Series. This app lives in its own folder and branch; it does not replace or modify the existing website.

## Features in this starter
- Email/password account registration and sign-in via Supabase Auth
- Rider profile editing
- Championship standings based on admin-entered race results
- Ranked leaderboard with Bronze, Silver, Gold, Platinum, Diamond, and Elite tiers
- Admin-only race creation and result entry
- Server-side championship-points and ranked-rating calculation through a secured Postgres RPC
- Windows NSIS installer build through GitHub Actions

## 1. Configure Supabase
1. Create or use a Supabase project for this app. Do not use a service-role key in the desktop app.
2. Open the SQL Editor and run `supabase/schema.sql`.
3. In Supabase Project Settings → API, copy the project URL and publishable/anon key.
4. Create `src/.env` from `src/.env.example` and fill in those values. The publishable/anon key is designed for client apps; database RLS is the security boundary.
5. Register your own account through the app, then promote it to admin in the Supabase SQL Editor:
   ```sql
   update public.profiles set role = 'admin' where lower(email) = lower('YOUR-ACCOUNT-EMAIL');
   ```
   Never let users set their own role. Only trusted project administrators should run this query.

## 2. Run locally on Windows
Install Node.js LTS and Rust (stable MSVC toolchain), then from this directory:
```powershell
npm install
npm run tauri dev
``

## 3. Build the installer
```powershell
npm run tauri build
``
The installer should be produced under `src-tauri/target/release/bundle/nsis/`.

The GitHub Actions workflow at `.github/workflows/build-mxgp26-windows.yml` also builds the installer on Windows and uploads it as a workflow artifact. Run the workflow from the GitHub Actions tab on the `mxgp26-desktop-app` branch to get the built `.exe`.

## Ranked rating rules
- New riders start at 1000 rating.
- Race result submissions compare each rider's finishing position with the other participants and apply Elo-style rating changes server-side.
- Tiers: Bronze (under 900), Silver (900–1099), Gold (1100–1299), Platinum (1300–1499), Diamond (1500–1699), Elite (1700+).
- Championship points are tracked separately: 25, 22, 20, 18, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 for places 1–20; no points after 20th.
- Admins can correct results by resubmitting the event. The SQL RPC replaces that event's results and rebuilds affected riders' rank ratings from the baseline across all published events, so edits don't compound rating changes.

## Important release notes
- This is an initial implementation scaffold; configure Supabase and test it with a few test accounts/results before inviting the league.
- The installer is unsigned by default, so Windows SmartScreen may show a warning until you code-sign the app.
- Do not commit `.env` files, database passwords, service-role keys, or signing certificates.
