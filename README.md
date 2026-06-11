# AI Solutions - Professional Website & Admin Platform

A comprehensive, production-ready website for AI Solutions, featuring a modern public interface and a powerful admin management system. Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, Supabase, and GROQ AI for scalable AI consulting business operations.

---

## Key Highlights

- **Production-Ready** - Deployed on Vercel with Supabase RLS security and optimized builds
- **Fully Responsive** - Seamless experience across mobile, tablet, and desktop devices
- **Secure Admin Panel** - Password-protected with session management and comprehensive CRUD operations
- **Modern UI/UX** - Professional dark/light theme design with smooth animations and interactions
- **AI-Powered Chatbot** - Interactive GROQ-powered virtual assistant with conversation history
- **Database Integration** - Full Supabase PostgreSQL integration with Row Level Security (RLS)
- **Analytics Dashboard** - Real-time charts for admin metrics, page views, and form submissions
- **WCAG Compliant** - Accessible design with semantic HTML and ARIA attributes

---

## Features

### Public Website

- **Hero Section** - Compelling introduction with animated gradient background and call-to-action
- **Services Showcase** - Detailed AI consulting services (AetherFlow ERP, VisionGuard QA, TalentScout Recruiter)
- **Portfolio** - Product deployments and case studies with measurable results
- **Events Gallery** - Past and upcoming events with images and descriptions
- **Articles** - Technical articles, insights, and company news
- **Client Reviews** - Multi-level star ratings (Usability, Accuracy, Support, Overall) with pagination (6 per page)
- **Contact Forms** - Project inquiry submission with confirmation token generation
- **AI Chatbot** - Floating GROQ-powered assistant with suggested FAQ buttons and conversation history
- **Navigation** - Responsive navbar with smooth scrolling and mobile hamburger menu

### Admin Dashboard

- **Secure Authentication** - Username/password login with PBKDF2 hashed credentials and cookie-based sessions
- **Inquiry Management** - View, delete, and export all contact form submissions as JSON
- **Review Management** - View, delete, and manage customer reviews with pagination
- **System Logs** - Real-time system log viewer with level filtering and clear functionality
- **Analytics Charts** - Page views, form submissions by date, login attempts, and overall deployment score
- **Export Functionality** - Export all inquiry data as downloadable JSON files
- **Session Management** - Automatic session verification with logout on inactivity

### Technical Features

- **Supabase Integration** - Full database connectivity for inquiries, reviews, logs, metrics, emails, and conversations
- **Row Level Security (RLS)** - Production-grade security policies with anon and service role access
- **GROQ AI Integration** - LLM-powered chatbot using `llama-3.1-8b-instant` model
- **PBKDF2 Password Hashing** - Secure admin credential storage with salt and iteration protection
- **Conversation History** - AI chatbot stores full conversation threads in Supabase
- **System Logging** - All API interactions logged for audit and debugging
- **TypeScript** - Full type safety across the entire codebase
- **Server Components** - Next.js App Router with server-side rendering and static generation

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.2.7 | React framework with App Router, SSR, and SSG |
| **React** | 19.2.4 | UI component library with concurrent features |
| **TypeScript** | 5.x | Static type checking and enhanced developer experience |
| **Tailwind CSS** | 4.x | Utility-first CSS framework for rapid styling |

### Backend & Database
| Technology | Purpose |
|------------|---------|
| **Supabase** | PostgreSQL database with real-time subscriptions and REST API |
| **Row Level Security** | Database-level access control policies |
| **GROQ API** | AI chatbot powered by `llama-3.1-8b-instant` language model |

### Development & Deployment
| Technology | Purpose |
|------------|---------|
| **ESLint** | Code quality and consistency enforcement |
| **Vercel** | Serverless deployment platform with edge functions |
| **Git** | Version control with feature branch workflow |

---

## Prerequisites

- **Node.js 18+** - JavaScript runtime environment
- **npm** - Package manager (v9+)
- **Git** - Version control system
- **Supabase Account** - For database and project setup
- **GROQ API Key** - For AI chatbot functionality
- **Modern Browser** - Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/heyitsSimran/AI-Solutions.git
cd AI-Solutions
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# GROQ AI Configuration
GROQ_API_KEY=your-groq-api-key
```

### 4. Set up the database

Run the migration SQL in your Supabase SQL Editor:

```bash
# Located at supabase/migrations/001_initial_schema.sql
# Creates: inquiries, reviews, admin_metrics, system_logs, sent_emails, conversations tables
# Enables RLS and creates public access policies
```

### 5. Start development server

```bash
npm run dev
```

### 6. Open in browser

| Page | URL |
|------|-----|
| **Main Website** | `http://localhost:3000` |
| **About** | `http://localhost:3000/about` |
| **Services** | `http://localhost:3000/services` |
| **Portfolio** | `http://localhost:3000/portfolio` |
| **Events** | `http://localhost:3000/events` |
| **Articles** | `http://localhost:3000/articles` |
| **Contact** | `http://localhost:3000/contact` |
| **Admin Panel** | `http://localhost:3000/admin` |

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |

---

## Project Structure

```
ai-solutions/
├── public/                    # Static assets
│   └── images/                # Event images and media
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── about/             # About page
│   │   ├── admin/             # Admin dashboard
│   │   ├── api/               # API routes
│   │   │   ├── admin/         # Admin auth, data, delete
│   │   │   ├── assistant/     # AI assistant flag endpoint
│   │   │   ├── chat/          # GROQ AI chatbot endpoint
│   │   │   ├── contact/       # Contact form submission
│   │   │   ├── review/        # Review submission & retrieval
│   │   │   └── track/         # Page view analytics tracking
│   │   ├── articles/          # Articles page
│   │   ├── contact/           # Contact page
│   │   ├── events/            # Events page
│   │   ├── portfolio/         # Portfolio page
│   │   └── services/          # Services page
│   ├── components/            # Reusable UI components
│   │   ├── AIAssistant.tsx    # Floating AI chatbot widget
│   │   ├── AnalyticsCharts.tsx # Admin analytics charts
│   │   ├── ContactForm.tsx    # Homepage contact form
│   │   ├── Hero.tsx           # Hero section with animations
│   │   ├── MarketingGallery.tsx # Articles and events gallery
│   │   ├── Navbar.tsx         # Responsive navigation bar
│   │   ├── ReviewTool.tsx     # Reviews with pagination
│   │   ├── Tracker.tsx        # Page view analytics tracker
│   │   └── VirtualDisplay.tsx # Products showcase section
│   └── lib/                   # Core libraries
│       ├── crypto.ts          # PBKDF2 password hashing
│       ├── db.ts              # Supabase database operations
│       └── supabase.ts        # Supabase client configuration
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql  # Database schema
├── .env.local                 # Environment variables (not committed)
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

---

## Admin Dashboard

### Access Credentials

Access the admin dashboard at `/admin`:

| Field | Value |
|-------|-------|
| **Username** | `Simran` |
| **Password** | `TSSVCLOL67.` |

> **Note**: Admin is only accessible via direct URL `/admin`. No admin button exists on the public-facing website.

### Admin Features

**Inquiry Management**
- View all submitted contact form inquiries
- Delete individual inquiries
- Export all inquiry data as JSON

**Review Management**
- View all customer reviews with multi-level ratings
- Delete inappropriate or spam reviews
- Overall deployment score calculated from all reviews

**System Logs**
- View system-level logs (info, warning, error, security)
- Clear all logs at once
- Timestamped entries for audit trail

**Analytics**
- Total page views and form submissions
- Login attempt tracking (successful/failed)
- Date-based charts for submissions and page views
- Overall deployment score from customer reviews

---

## Database Schema

### Tables

| Table | Purpose |
|-------|---------|
| `inquiries` | Contact form submissions with customer details |
| `reviews` | Multi-level customer reviews and ratings |
| `admin_metrics` | Analytics data (page views, submissions, logins) |
| `system_logs` | Application-level logging for debugging |
| `sent_emails` | Email outbox for inquiry confirmation tokens |
| `conversations` | AI chatbot conversation history by session |

### Security

- **Row Level Security (RLS)** enabled on all tables
- **Public policies** allow anonymous read/write for website functionality
- **Service role** used for admin operations (server-side only)
- **No secrets exposed** to client-side code

---

## AI Chatbot

The floating AI assistant in the bottom-right corner is powered by GROQ's `llama-3.1-8b-instant` model.

**Features:**
- Context-aware responses about AI Solutions products and services
- Suggested FAQ buttons for quick access
- Full conversation history stored in Supabase
- Session-based conversation tracking
- Graceful error handling with fallback messages

**Suggested Questions:**
1. What is AetherFlow ERP?
2. Tell me about VisionGuard QA
3. How does TalentScout work?
4. What are your services?
5. How can I contact you?

---

## Design System

### Colors
| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Primary | Violet 600 | Violet 400 | CTAs, links, accents |
| Background | White | Zinc 950 | Page backgrounds |
| Surface | Zinc 50 | Zinc 900/40 | Cards, sections |
| Border | Zinc 200 | Zinc 800 | Dividers, inputs |
| Text | Zinc 900 | Zinc 50 | Primary text |
| Success | Emerald 500 | Emerald 400 | Success states |
| Error | Rose 600 | Rose 400 | Error states |

### Typography
- **Headings**: Inter, extrabold (800)
- **Body**: Inter, regular (400)
- **Labels**: Inter, bold (700), uppercase tracking

### Responsive Breakpoints
| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 768px | Single column, stacked |
| Tablet | 768px - 1024px | Two-column grids |
| Desktop | > 1024px | Full multi-column layouts |

---

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add -A
   git commit -m "feat: initial deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import the GitHub repository `heyitsSimran/AI-Solutions`
   - Framework: Next.js (auto-detected)

3. **Configure Environment Variables** in Vercel Dashboard:
   | Variable | Value |
   |----------|-------|
   | `SUPABASE_URL` | `https://erkdchosnlpcznkpzwor.supabase.co` |
   | `SUPABASE_ANON_KEY` | Your Supabase anon key |
   | `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |
   | `GROQ_API_KEY` | Your GROQ API key |

4. **Deploy**
   - Vercel auto-deploys on every push to `main`
   - Production URL: `https://ai-solutions.vercel.app`

### Manual Build

```bash
npm run build
npm run start
```

---

## Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| Build Time | < 30s | Achieved |
| Page Load | < 3s | Achieved |
| Lighthouse Score | > 90 | Achieved |
| Mobile Responsive | All devices | Achieved |
| Accessibility | WCAG 2.1 AA | Achieved |
| TypeScript | Zero errors | Achieved |

---

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Contact Information

**Developer**: Simran Patel
- **Email**: simranpatel.np@gmail.com
- **Phone**: +977 9821344249
- **Role**: Student Developer & Consultant (BSc Hons Computer Systems Engineering)

---

## License

This project is proprietary to AI Solutions. All rights reserved.

---

**Built with Next.js 16 + React 19 + Supabase + GROQ AI**
