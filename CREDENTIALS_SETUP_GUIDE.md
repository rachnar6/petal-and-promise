# 🌸 Petal & Promise — Credentials & Automation Setup Guide

Welcome to **Petal & Promise**! This guide gives you step-by-step instructions on where and how to replace all credentials for **MongoDB Atlas**, **Firebase Authentication (Google Sign-In)**, and **Pabbly Connect Webhook Automations**.

---

## ⚡ Quick Testing (Zero-Config Dev Mode)
**Good news!** The entire application is built with a resilient hybrid architecture:
- If you don't have your credentials handy right this second, you can run `start-all.bat` immediately!
- The backend automatically runs an in-memory database with pre-seeded luxury wedding packages, themes, bookings, and enquiries.
- The frontend includes instant **1-Click Demo Buttons** (`Demo Bride` & `Demo Admin`) and simulated Pabbly event logging.
- When you are ready to connect your live accounts, simply follow the steps below!

---

## 1. 🗄️ MongoDB Atlas Setup (`server/.env`)

### Where to replace:
File: `server/.env`
Variable: `MONGODB_URI`

### Steps to obtain your connection string:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and log into your account.
2. In your Cluster, click **Connect**.
3. Choose **Drivers** (Node.js).
4. Copy the connection string. It looks like this:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/petal_and_promise?retryWrites=true&w=majority
   ```
5. Replace `<username>` and `<password>` with your database user credentials.
6. Paste it into `server/.env` as `MONGODB_URI=...`.
7. Restart the backend server. You will see:
   ```
   [Database] MongoDB Atlas Connected: cluster0.abcde.mongodb.net
   ```

---

## 2. 🔐 Firebase Authentication & Google Login

Authentication uses Firebase on both frontend (Client SDK) and backend (Admin SDK).

### A. Frontend Web Credentials (`client/.env`)
1. Go to [Firebase Console](https://console.firebase.google.com/) and create or open your project.
2. Under **Project Overview** -> Click the **Web** icon `</>` to register a web app.
3. Name it `Petal and Promise`.
4. Copy the values from the `firebaseConfig` object and paste them into `client/.env`:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSyA...
   VITE_FIREBASE_AUTH_DOMAIN=petal-and-promise.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=petal-and-promise
   VITE_FIREBASE_STORAGE_BUCKET=petal-and-promise.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
   VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
   VITE_ADMIN_EMAIL=admin@petalandpromise.com
   ```
5. In Firebase Console -> **Authentication** -> **Sign-in method**:
   - Enable **Google** provider.
   - Enable **Email/Password** provider.
   - Under **Authorized domains**, make sure `localhost` is listed (enabled by default).

### B. Backend Firebase Admin SDK (`server/.env`)
1. In Firebase Console, click the **Gear Icon** ⚙️ next to Project Overview -> **Project Settings**.
2. Click the **Service accounts** tab.
3. Click **Generate new private key** and download the JSON file.
4. Place the file inside `server/config/` (for example: `server/config/serviceAccountKey.json`).
5. Open `server/.env` and specify the path:
   ```env
   FIREBASE_SERVICE_ACCOUNT_KEY_PATH=./config/serviceAccountKey.json
   FIREBASE_PROJECT_ID=petal-and-promise
   ```
   *(Alternatively, you can paste the entire JSON string in `FIREBASE_SERVICE_ACCOUNT_JSON`)*

---

## 3. ⚙️ Pabbly Connect Webhook Automations (`server/.env`)

Petal & Promise includes real backend event triggers that emit webhooks with idempotency keys and outbox retry logs.

### Where to replace:
File: `server/.env`

```env
# Catch-all webhook for testing all workflows
PABBLY_WEBHOOK_URL=https://connect.pabbly.com/workflow/sendwebhookdata/YOUR_DEFAULT_WEBHOOK

# Specific workflow webhooks (optional - overrides default)
PABBLY_WEBHOOK_BOOKING_CREATED=https://connect.pabbly.com/workflow/sendwebhookdata/YOUR_BOOKING_WEBHOOK
PABBLY_WEBHOOK_CONSULTATION_SCHEDULED=https://connect.pabbly.com/workflow/sendwebhookdata/YOUR_CONSULTATION_WEBHOOK
PABBLY_WEBHOOK_STATUS_UPDATED=https://connect.pabbly.com/workflow/sendwebhookdata/YOUR_STATUS_WEBHOOK
PABBLY_WEBHOOK_ENQUIRY_CREATED=https://connect.pabbly.com/workflow/sendwebhookdata/YOUR_ENQUIRY_WEBHOOK
```

---

### Step-by-Step Pabbly Workflow Setups:

### 🌿 Workflow 1: New Event Booking
**Flow:** Customer submits booking -> Backend saves to DB -> Pabbly Webhook triggers -> Appends to Google Sheets -> Customer gets Gmail acknowledgement -> Admin gets notification.

1. In [Pabbly Connect](https://www.pabbly.com/connect/), click **Create Workflow** -> Name it `Petal & Promise - New Booking`.
2. **Trigger Step**:
   - App: **Webhook**
   - Copy the generated Webhook URL.
   - Paste it in `server/.env` as `PABBLY_WEBHOOK_BOOKING_CREATED=...`.
3. **Capture Sample Data**:
   - In Petal & Promise Admin Portal (`http://localhost:5173/admin`), go to **Pabbly Automation Engine** tab.
   - Choose `Workflow A: New Booking` and click **Dispatch Test**.
   - Pabbly will instantly capture the complete sample payload!
4. **Action Step 1: Google Sheets**:
   - App: **Google Sheets** -> Action: **Add New Row**
   - Connect your Google Account and select your `Petal & Promise Bookings` spreadsheet.
   - Map columns: `Booking Reference`, `Client Name`, `Email`, `Event Date`, `Venue`, `Budget`.
5. **Action Step 2: Gmail (Client Acknowledgement)**:
   - App: **Gmail** -> Action: **Send Email**
   - Recipient: Map `clientEmail` from Webhook payload.
   - Subject: `Your Celebration with Petal & Promise is Received 🌸`
   - Body: `Bonjour {{clientName}}, we have received your booking {{bookingReference}} for your {{eventType}} on {{eventDate}}...`
6. Save and switch the workflow to **Active**.

---

### 🌿 Workflow 2: Consultation Scheduling & Automated Reminders
**Flow:** Customer books tasting -> Pabbly logs consultation to Sheets -> Automated calendar/reminder email scheduled.

1. In Pabbly Connect, click **Create Workflow** -> Name it `Petal & Promise - Consultation Reminders`.
2. **Trigger Step**: Webhook -> Copy URL -> Paste in `server/.env` as `PABBLY_WEBHOOK_CONSULTATION_SCHEDULED`.
3. In Petal & Promise Admin Portal, test dispatch `Workflow B: Consultation`.
4. **Action Step 1**: Google Sheets -> Add row to `Consultations` sheet.
5. **Action Step 2**: Gmail -> Send meeting link (`{{meetingLink}}`) and calendar invitation.

---

### 🌿 Workflow 3: Booking Status Updates
**Flow:** Admin changes booking status -> Backend emits `booking.status_updated` -> Pabbly sends customer updated status email.

1. In Pabbly Connect, create workflow `Petal & Promise - Status Updates`.
2. **Trigger Step**: Webhook -> Paste into `server/.env` as `PABBLY_WEBHOOK_STATUS_UPDATED`.
3. In Petal & Promise Admin Portal -> Bookings -> Click **Manage Status** on any booking -> Select **Confirmed** -> Click **Save & Emit**.
4. Pabbly captures the update payload containing `bookingReference`, `newStatus`, and `adminNotes`.
5. **Action Step**: Gmail -> Email customer with the exciting update (e.g. *"Your floral booking has been Confirmed! Our florists have reserved your Sarah Bernhardt Peonies."*).

---

### 🌿 Workflow 4: Customer Enquiry Follow-Up
**Flow:** Customer submits public contact enquiry -> Backend stores in DB -> Pabbly logs in Google Sheets -> Dispatches immediate response.

1. In Pabbly Connect, create workflow `Petal & Promise - Customer Enquiry Follow-Up`.
2. **Trigger Step**: Webhook -> Paste into `server/.env` as `PABBLY_WEBHOOK_ENQUIRY_CREATED`.
3. In Public Website -> Contact section -> Submit a test message.
4. **Action Step**: Google Sheets -> Record enquiry -> Gmail acknowledgement to customer.

---

## 4. 📋 Summary of Files to Edit

| Component | Target File | What to Put There |
| :--- | :--- | :--- |
| **Database** | `server/.env` | `MONGODB_URI=mongodb+srv://...` |
| **Backend Firebase** | `server/.env` | `FIREBASE_SERVICE_ACCOUNT_KEY_PATH=...` |
| **Pabbly Webhooks** | `server/.env` | `PABBLY_WEBHOOK_URL=...` |
| **Frontend Firebase** | `client/.env` | `VITE_FIREBASE_API_KEY=...` and project keys |
| **Admin Email** | Both `.env` files | `ADMIN_EMAIL=your-email@example.com` |

---

*Enjoy bringing Petal & Promise to life! If you need any assistance with credential mapping, all logs are visible in the Admin Portal under "Pabbly Automation Engine".* 🌸
