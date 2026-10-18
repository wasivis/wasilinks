<div align="center">

# WasiLinks

### Your links. One simple, shareable page.

Create a clean personal link page, give it a memorable username, and share it anywhere.

<br />

![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React 19](https://img.shields.io/badge/React-19-149eca?logo=react)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-database-4169e1?logo=postgresql)

</div>

---

## ✨ What is WasiLinks?

WasiLinks is a minimalist **link-in-bio** app. Sign in with Google, collect your important links on one profile, and share a public page at your custom username.

### Features

- 🔐 **Google sign-in** with Auth.js
- 🔗 **Public profile pages** for sharing your links
- 🪪 **Custom usernames** for memorable profile URLs
- ➕ **Add and remove links** from a private dashboard
- 🎨 **Dark, responsive interface** styled with Tailwind CSS
- ☕ **Ko-fi support button**

## 🚀 Get started

### Requirements

- [Node.js](https://nodejs.org/) **20.9 or newer**
- npm (included with Node.js)
- A PostgreSQL database
- A Google OAuth client for sign-in

### 1. Install dependencies

```bash
npm ci
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```dotenv
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
AUTH_SECRET="replace-with-a-long-random-secret"
AUTH_GOOGLE_ID="your-google-oauth-client-id"
AUTH_GOOGLE_SECRET="your-google-oauth-client-secret"
```

Keep `.env` and its secrets private; environment files are excluded from Git.

Create OAuth credentials in the [Google Cloud Console](https://console.cloud.google.com/). For local development, add this **authorized redirect URI** to your OAuth client:

```text
http://localhost:3000/api/auth/callback/google
```

Generate a secret with Node.js if needed:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('base64'))"
```

### 3. Set up the database

Apply the Drizzle schema to your configured PostgreSQL database:

```bash
npx drizzle-kit push
```

### 4. Start the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🧭 Using the app

1. Choose **Get Started with Google** and sign in.
2. In the dashboard, optionally claim a username and add links.
3. Share your public profile at `https://your-domain/<username>`.

If you have not claimed a username, your profile is available using your account ID instead. The dashboard displays your current profile URL.

## 📍 Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page and Google sign-in |
| `/dashboard` | Manage your username and links (sign-in required) |
| `/<username>` | Public profile and shareable links |
| `/api/auth/[...nextauth]` | Auth.js endpoints |

## 🛠️ Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server (Webpack) |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npx drizzle-kit push` | Apply the Drizzle schema to PostgreSQL |

## 🧱 Built with

- [Next.js 16](https://nextjs.org/) App Router and [React 19](https://react.dev/)
- [Auth.js](https://authjs.dev/) with Google OAuth
- [PostgreSQL](https://www.postgresql.org/) and [Drizzle ORM](https://orm.drizzle.team/)
- [Tailwind CSS 4](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/)
- [Lucide](https://lucide.dev/) icons

## ☁️ Deployment

Deploy to any host that supports Next.js and can connect to PostgreSQL. Before deploying:

1. Set `DATABASE_URL`, `AUTH_SECRET`, `AUTH_GOOGLE_ID`, and `AUTH_GOOGLE_SECRET` in the hosting provider's environment settings.
2. Add your production OAuth callback URL to the Google OAuth client:
   `https://your-domain/api/auth/callback/google`
3. Apply the database schema with `npx drizzle-kit push` against the production database.
4. Build and start the app with `npm run build` and `npm run start`, or use your platform's Next.js deployment integration.

## 🤝 Contributing

Issues and pull requests are welcome. For local development, create your own `.env` file and database; never commit credentials or other secrets.

---

<div align="center">

Made with care using WasiLinks · [Support on Ko-fi](https://ko-fi.com/I2I814OYFR)

</div>
