# 🌸 Petal & Promise — Floral Event Planning & Custom Celebration Platform

> **"Where Dreams Blossom into Eternal Promises"**  
> An elegant, romantic, full-stack celebration platform with public atelier discovery, customer portal, director administration dashboard, and real **Pabbly Connect** workflow automations.

---

## 🎨 Romantic Luxury Aesthetics & Design Theme

Petal & Promise features a heavenly, lively floral experience with floating petals, glassmorphic accents, and romantic serif typography:

* **Ivory:** `#F8F1EC` (Ethereal parchment base)
* **Blush Pink:** `#DDA6B2` (Soft garden rose & peony ruffles)
* **Sage Green:** `#A7B9A0` (Silver eucalyptus & olive branches)
* **Midnight Berry:** `#754D58` (Deep velvet dahlias & rich contrast)
* **Warm Sand:** `#E8D9C5` (Tuscan terracotta & sunlit linens)

---

## 🌺 Complete Feature Tour

### 1. 🏛️ Public Website & Interactive Tools
- **Hero Section:** Heavenly floating petals animation canvas, dynamic celebration preview card with live countdown, and romantic editorial headlines.
- **Floral Theme Studio:** Real-time interactive mixer allowing celebrants to preview themes (*Parisian Elegance, Opulent Royalty, Romantic Rustic, Modern Minimalist*), click-to-copy color palettes, and explore signature stems with fragrance profiles.
- **Celebration Budget Planner:** Interactive cost calculator with sliders for budget ($1,500 – $20,000+), guest count (20 – 350), and installation checklists (Arches, Centerpieces, Bouquets, Ambient Lighting, Suspended Ceiling Gardens).
- **Curated Packages Collection:** High-resolution wedding, birthday, engagement, and anniversary packages with full lists of inclusions and 1-click booking links.
- **Mood Board Gallery:** Filterable inspiration board with bookmarking and full-screen preview.
- **Private Floral Tasting Modal:** Booking modal for Virtual Google Meet tastings, in-studio champagne & stem tastings, or architectural venue walkthroughs.
- **Customer Enquiry Form:** Real-time validation and submission.

### 2. 👰 Customer Celebration Portal
- **Google Sign-In & Email Authentication:** Secure authentication via Firebase Auth with instant 1-Click Demo login (`Elena Rostova`).
- **Live Event Countdown Card:** Dynamic days-until-celebration countdown timer.
- **5-Stage Visual Progress Tracker:**
  1. *Request Received & Logged*
  2. *Private Floral Tasting & Consultation*
  3. *Proposal & Mood Board Approved*
  4. *Seasonal Bloom Sourcing & Artistry Prep*
  5. *On-Site Installation & Ceremony Perfection*
- **Celebration Blueprint Creator:** 5-step wizard to customize celebration details, venues, flower preferences, budgets, and inspiration photos.
- **Reservation Management:** View detailed blueprints and cancel eligible bookings with reasons.
- **Scheduled Consultations Hub:** View upcoming tastings and Google Meet links.

### 3. 🛡️ Admin Director Dashboard
- **Executive KPIs:** Total Bookings, Confirmed Events, Pending Inquiries, Estimated Revenue, and Consultations.
- **Visual Analytics:** Monthly booking volume trajectory chart, celebration mix breakdown, and conversion metrics.
- **Bookings Management:** Filter by status, search by client/reference, and update status with 1 click.
- **Status Change Automation:** Changing a booking to *Confirmed*, *In Progress*, or *Completed* automatically dispatches a Pabbly webhook to email the client!
- **Enquiry Management & Consultation Scheduler:** View, track, and reply to client inquiries.
- **Package CRUD:** Create new floral packages and update pricing on the live catalog.
- **Pabbly Automation Engine & Outbox Monitor:** Real-time audit log of all outgoing webhooks with status indicators, attempts, HTTP response codes, and a **Live Test Dispatcher**.

---

## ⚙️ Real Pabbly Connect Automation Workflows

1. **Workflow 1: New Event Booking (`booking.created`)**  
   Customer submits event plan → Saved to MongoDB → Pabbly Webhook fires → Appends booking to Google Sheets → Sends client confirmation via Gmail → Notifies director.
2. **Workflow 2: Consultation Reminders (`consultation.scheduled`)**  
   Customer reserves tasting → Consultation recorded → Pabbly triggers Google Sheets & Gmail calendar invite.
3. **Workflow 3: Booking Status Updates (`booking.status_updated`)**  
   Admin updates status to *Confirmed* or *In Progress* → Pabbly triggers custom notification email with updated status to customer.
4. **Workflow 4: Customer Enquiry Follow-Up (`enquiry.created`)**  
   Visitor submits contact message → Stored in MongoDB → Pabbly records enquiry to Sheets and emails an acknowledgement.

---

## 💻 Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide React, Canvas Confetti |
| **Backend** | Node.js, Express.js, Mongoose, Morgan, Express Rate Limit |
| **Database** | MongoDB Atlas (with seamless in-memory fallback for zero-config testing) |
| **Authentication** | Firebase Authentication & Google Login + Firebase Admin SDK |
| **Automation** | Pabbly Connect Webhooks, Google Sheets, Gmail |
| **Testing** | Built-in Automated API & Outbox Test Suite |

---

## 🚀 Windows Quickstart

### Method A: One-Click Launcher (Recommended)
Double-click `start-all.bat` in the project root!  
It automatically boots both the backend API server and the frontend client.

* **Client Website:** `http://localhost:5173`
* **Backend API:** `http://localhost:5000`

### Method B: Manual Commands
```powershell
# 1. Run the Backend Server
cd server
node src/server.js

# 2. In a second terminal, run the Frontend Client
cd client
node ./node_modules/vite/bin/vite.js
```

---

## 🧪 Running Automated Tests

Run the built-in automated test suite to verify all API endpoints and Pabbly outbox flows:
```powershell
cd server
node test/api.test.js
```

---

## 🔑 Where to Replace Credentials
Read [`CREDENTIALS_SETUP_GUIDE.md`](./CREDENTIALS_SETUP_GUIDE.md) for detailed instructions on:
1. Adding your `MONGODB_URI` in `server/.env`.
2. Adding your `VITE_FIREBASE_*` keys in `client/.env` and `FIREBASE_SERVICE_ACCOUNT_KEY_PATH` in `server/.env`.
3. Adding your `PABBLY_WEBHOOK_*` endpoints in `server/.env`.

---

## 🚢 Deployment Guide

### Frontend on Vercel
1. Push project to GitHub.
2. In Vercel -> **Add New Project** -> Select repository.
3. Set **Root Directory** to `client`.
4. Build command: `node ./node_modules/vite/bin/vite.js build`.
5. Output directory: `dist`.
6. Add environment variables from `client/.env`.

### Backend on Render
1. In Render -> **New Web Service** -> Select repository.
2. Set **Root Directory** to `server`.
3. Build command: `npm install`.
4. Start command: `node src/server.js`.
5. Add environment variables from `server/.env` (`MONGODB_URI`, `PABBLY_WEBHOOK_URL`, `CLIENT_URL`, etc.).

---

*Crafted with 🌸 and passion for Petal & Promise.*
