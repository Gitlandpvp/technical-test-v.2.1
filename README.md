# Torre People Search - Technical Test

A full-stack web application for searching and discovering people on the Torre platform, built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Functionality
- **People Search**: Search for people by name using Torre's API
- **Detailed Profiles**: View comprehensive person details including skills, experience, and education
- **Real-time Analytics**: Generate insights from search results including skill distribution and geographic analysis
- **Responsive Design**: Modern, mobile-friendly UI with smooth animations

### Advanced Features
- **Skill Analysis**: Automatic analysis of skills across search results
- **Location Analytics**: Geographic distribution of professionals
- **Experience Level Detection**: Automatic categorization of experience levels
- **Interactive Charts**: Visual data representation using Recharts
- **Error Handling**: Robust error handling and loading states

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **API**: Torre.ai APIs

## 📁 Project Structure

```
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main application page
├── components/
│   ├── SearchBar.tsx        # Search input component
│   ├── PersonCard.tsx       # Person display card
│   └── AnalyticsChart.tsx   # Chart component for analytics
├── lib/
│   ├── torre-api.ts         # API client for Torre endpoints
│   └── analytics.ts         # Data analysis utilities
├── types/
│   └── torre.ts             # TypeScript interfaces
└── public/                  # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd torre-people-search
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🔧 API Integration

The application integrates with Torre's APIs:

- **Search API**: `POST https://torre.ai/api/entities/_searchStream`
- **Genome API**: `GET https://torre.ai/api/genome/bios/{username}`

### API Features
- Search people by name
- Retrieve detailed person information
- Handle API errors gracefully
- Implement proper loading states

## 📊 Analytics & Insights

### Skill Analysis
- Top skills distribution across search results
- Average skill levels
- Percentage breakdown by skill

### Location Analytics
- Geographic distribution of professionals
- Location-based insights
- Interactive charts and visualizations

### Experience Level Detection
- Automatic categorization (Junior, Mid-level, Senior, Expert)
- Based on years of experience
- Visual indicators in person cards

## 🎨 UI/UX Features

### Design Principles
- **Clean & Modern**: Minimalist design with focus on content
- **Responsive**: Mobile-first approach with responsive breakpoints
- **Accessible**: Proper semantic HTML and ARIA labels
- **Interactive**: Smooth animations and hover effects

### Components
- **SearchBar**: Intelligent search with clear functionality
- **PersonCard**: Comprehensive person information display
- **AnalyticsChart**: Interactive data visualization
- **Loading States**: Skeleton loaders and spinners

## 🔍 Search Functionality

### Search Features
- Real-time search with debouncing
- Clear search functionality
- Search result highlighting
- No results handling

### Result Display
- Grid layout for search results
- Person cards with key information
- View details functionality
- Back navigation

## 📈 Analytics Dashboard

### Data Visualization
- Bar charts for skill distribution
- Geographic location charts
- Interactive tooltips
- Responsive chart layouts

### Insights Generated
- Top skills across search results
- Geographic distribution
- Experience level breakdown
- Skill match percentages

## 🛡️ Error Handling

### Robust Error Management
- API error handling
- Network error recovery
- Graceful degradation
- User-friendly error messages

### Loading States
- Skeleton loaders
- Progress indicators
- Loading spinners
- Disabled states during operations

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push to main branch
3. Environment variables configured automatically

### Other Platforms
- Netlify
- Railway
- Heroku

## 📝 Development Notes

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Component-based architecture

### Performance
- Next.js optimization
- Image optimization
- Code splitting
- Lazy loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is created for the Torre Engineering technical test.

## 🙏 Acknowledgments

- Torre.ai for providing the APIs
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Recharts for the charting library

---

**Built with ❤️ for Torre Engineering Technical Test** 