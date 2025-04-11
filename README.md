# 🧠 Codeforces Contest Scheduler

A smart platform that allows users to **sign in with Google**, browse **Codeforces contests**, and **schedule contests directly to their Google Calendar** based on their preferred contest types (Div 2, Div 3, Div 4, or All). Upcoming contests are automatically fetched and managed, offering a seamless CP planning experience.

Built with ❤️ using **Next.js 14 App Router**, **NextAuth.js**, **Google Calendar API**, and **MongoDB**.

---

## 🚀 Features

- 🔐 Google Authentication with NextAuth
- 📅 Google Calendar integration
- 🧠 Smart filtering of contests (Div 2, Div 3, etc.)
- 🗓️ Auto-scheduling and managing of upcoming contests
- 🧼 Clean UI with Tailwind CSS and ShadCN
- 💾 MongoDB for storing user preferences and events
- ✅ Fully responsive — works well on mobile and desktop

---

## 🧑‍💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/codeforces-calendar.git
cd codeforces-calendar
```

### 2. Install dependencies

```bash
npm install
# or
yarn
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory and paste the following:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key
GOOGLE_CALENDAR_SCOPE=https://www.googleapis.com/auth/calendar.events
MONGODB_URI=your_mongodb_connection_string
NEXT_URL=http://localhost:3000
CRON_SECRET=your_custom_cron_secret
```

💡 You can generate a secure `NEXTAUTH_SECRET` using:
```bash
 openssl rand -base64 32
  ```

---

### 4. Run the app

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧩 Project Structure

```bash
.
├── app/
│   └── page.tsx               # Landing page
│   └── upcoming/page.tsx      # Upcoming contests view
├── components/
│   └── upcoming-events.tsx    # Contest cards
│   └── ui/                    # UI components (Button, Card, etc.)
├── lib/
│   └── auth-options.ts        # NextAuth config
│   └── google.ts              # Google calendar logic
├── pages/api/
│   └── auth/                  # NextAuth API
│   └── scheduled-contests     # API routes to handle contests
```

---

## 🌐 Deployment

Deploy easily with **Vercel**:

[![Deploy with Vercel](https://consche.vercel.app/)]

Set the same environment variables in the Vercel Dashboard.

---

## 🛠️ Tech Stack

- **Next.js 14 (App Router)**
- **NextAuth.js**
- **Google Calendar API**
- **Tailwind CSS + ShadCN UI**
- **MongoDB with Mongoose**
- **TypeScript**

---

## ✨ Future Enhancements

- ✅ Notification system for upcoming contests
- 🧠 Machine learning to recommend contests
- 📊 Contest performance dashboard
- 📱 PWA support for mobile usage

---

## 🤝 Contributing

We welcome PRs and ideas! Fork this repo, create a branch, and open a PR with your enhancements.

---

## 📄 License

MIT © theAsd
