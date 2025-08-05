# Setup Guide for Torre People Search

## Prerequisites

### Installing Node.js and npm

Since Node.js is not currently installed on your system, you'll need to install it first:

#### Option 1: Download from Official Website
1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the LTS version (recommended)
3. Run the installer and follow the installation wizard
4. Restart your terminal/command prompt

#### Option 2: Using Chocolatey (Windows)
```powershell
# Install Chocolatey first if you don't have it
# Then run:
choco install nodejs
```

#### Option 3: Using Winget (Windows 10/11)
```powershell
winget install OpenJS.NodeJS
```

### Verify Installation
After installation, verify that Node.js and npm are available:
```bash
node --version
npm --version
```

## Project Setup

Once Node.js is installed, follow these steps:

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## Alternative: Static HTML Version

If you prefer not to install Node.js, I've also created a static HTML version that can run directly in the browser. Check the `static-version` folder for a standalone version.

## Deployment Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload the `out` folder to Netlify

### Static Hosting
1. Build the project: `npm run build`
2. Upload the `out` folder to any static hosting service

## Troubleshooting

### Common Issues

1. **"npm is not recognized"**
   - Make sure Node.js is properly installed
   - Restart your terminal after installation
   - Check if Node.js is in your PATH

2. **Port 3000 already in use**
   - Use a different port: `npm run dev -- -p 3001`
   - Or kill the process using port 3000

3. **Build errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check TypeScript errors: `npm run lint`

## Project Structure

```
torre-people-search/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/             # React components
│   ├── SearchBar.tsx      # Search component
│   ├── PersonCard.tsx     # Person display
│   └── AnalyticsChart.tsx # Charts
├── lib/                   # Utilities
│   ├── torre-api.ts       # API client
│   └── analytics.ts       # Data analysis
├── types/                 # TypeScript types
│   └── torre.ts           # API interfaces
├── public/                # Static assets
├── package.json           # Dependencies
├── README.md              # Project documentation
└── SETUP.md               # This file
```

## Features Overview

### Core Features
- ✅ People search by name
- ✅ Detailed person profiles
- ✅ Skills and experience display
- ✅ Analytics and insights
- ✅ Responsive design
- ✅ Error handling

### Technical Features
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling
- ✅ Recharts for data visualization
- ✅ Axios for API calls
- ✅ Next.js 14 with App Router
- ✅ Mobile-responsive design

## API Integration

The application uses Torre's APIs:
- Search API: `POST https://torre.ai/api/entities/_searchStream`
- Genome API: `GET https://torre.ai/api/genome/bios/{username}`

## Development Notes

- The application is built with modern React patterns
- Uses TypeScript for better development experience
- Implements proper error boundaries and loading states
- Follows accessibility best practices
- Optimized for performance with Next.js features

---

**Ready to build amazing things with Torre! 🚀** 