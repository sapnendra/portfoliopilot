# 📊 PortfolioPilot - Personal Investment Tracker

A clean, modern web application for tracking stock and IPO investments. Built with Next.js and MongoDB, with support for Indian Rupee (₹) currency formatting.

## ✨ Features

- **Landing Page** - Professional home page with hero section, feature highlights, and call-to-action
- **Portfolio Dashboard** - View total invested, current value, profit/loss, and return percentage in INR
- **Investment Tracking** - Add, edit, and delete investments with real-time updates
- **Search & Filter** - Search investments by name/symbol and filter by type (Stock/IPO)
- **Sort Options** - Sort by name, profit/loss, invested amount, or purchase date in ascending/descending order
- **CSV Export** - Export all investments to CSV file for external analysis and record keeping
- **Real-time Calculations** - Automatic P/L calculations for each investment and overall portfolio
- **Dark/Light Mode** - Manual theme toggle with dark mode as default, preferences saved to localStorage
- **Modern Icons** - Lucide React icons throughout the interface for a clean, professional look
- **Custom Branding** - SVG logo with gradient design symbolizing portfolio growth and favicon
- **Indian Currency Support** - All amounts displayed in Indian Rupee (₹) format
- **Responsive Design** - Mobile-first approach, works perfectly on all devices
- **Clean UI** - Modern, professional interface with intuitive navigation
- **Tailwind CSS Ready** - Configured with Tailwind CSS v4 for future styling enhancements

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router) with React
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Data Fetching**: SWR for real-time updates
- **Icons**: Lucide React for modern, scalable icons
- **Styling**: Custom CSS with CSS variables for theming + Tailwind CSS v4
- **Theme Management**: React Context API with localStorage persistence

## 📁 Project Structure

```
portfoliopilot/
├── app/
│   ├── api/
│   │   └── investments/
│   │   track/
│   │   └── page.js                # Dashboard page (/track)
│   ├── layout.js                  # Root layout with theme provider
│   ├── page.js                    # Home/landing page (/)
│   └── globals.css                # Global styles with theme variables
├── components/
│   ├── Dashboard.js               # Main dashboard component
│   ├── HomePage.js                # Landing page component
│   ├── Logo.js                    # Custom SVG logo component
│   ├── ThemeToggle.js             # Dark/light mode toggle button
│   ├── ClientProviders.js         # Client-side provider wrapper
│   ├── FilterSortBar.js           # Search, filter, sort, and export controls
│   ├── MetricCard.js              # Portfolio metric display
│   ├── InvestmentCard.js          # Individual investment card
│   ├── AddInvestmentModal.js      # Add investment form
│   ├── EditInvestmentModal.js     # Edit investment form
│   ├── DeleteConfirmModal.js      # Delete confirmation
│   └── EmptyState.js              # Empty state view
├── contexts/
│   └── ThemeContext.js            # Theme management context
├── lib/
│   ├── mongodb.js                 # MongoDB connection
│   └── calculations.js            # P/L calculation utilities (INR)
│   ├── mongodb.js                 # MongoDB connection
│   └── calculations.js            # P/L calculation utilities
├── models/
│   └── Investment.js              # Mongoose schema
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier) or local MongoDB instance

### Installation

1. **Clone the repository (if applicable)**
   ```bash
   cd portfoliopilot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**

   Option A - MongoDB Atlas (Recommended):
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Get your connection string
   - Whitelist your IP address (or use 0.0.0.0/0 for all IPs)

   Option B - Local MongoDB:
   - Install MongoDB locally
   - Use connection string: `mongodb://localhost:27017/portfoliopilot`

4. **Configure environment variables**
   
   Edit `.env.local` file and add your MongoDB URI:
   ```env
   MORun the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) for the home page
   
   Or go directly to [http://localhost:3000/track](http://localhost:3000/track) for the dashboard

## 📱 Usage

### Navigating the App

- **Home Page** (`/`) - Landing page with overview and call-to-action to start tracking
- **Dashboard** (`/track`) - Main investment tracking interface with all your investments

### Theme Toggle

Click the **Sun/Moon icon** in the top right to switch between dark and light modes. Your preference is automatically saved.
   npm run devEdit icon** button on any investment card
2. Update the fields you want to change
3. Click "**Save Changes**"

**Pro Tip**: Most often you'll want to update the **Current Price** to recalculate your profit/loss.

### Deleting an Investment

1. Click the **X icon
### Adding an Investment

1. Click the "**+ Add Investment**" button
2. Fill in the required fields:
   - **Stock Symbol** (e.g., AAPL)
   - **Investment Type** (Stock or IPO)
   - **Purchase Date**
   - **Quantity** (number of shares)
   - **Purchase Price** per share
   - **Current Price** per share
   - **Notes** (optional)
3. Click "**Add Investment**"

### Editing an Investment

1. Click the **✎ (edit)** button on any investment card
2. Update the fields you want to change
3. Click "**Save Changes**"

**Pro Tip**: Most often you'll want to update the **Current Price** to recalculate your profit/loss.

### Deleting an Investment

1. Click the **× (delete)** button on any investment card
2. Confirm the deletion in the modal
3. The investment will be permanently removed (in ₹)
- **Current Value** = quantity × current price (in ₹)
- **Profit/Loss** = Current Value - Invested Amount (in ₹)
- **P/L Percentage** = (Profit/Loss / Invested Amount) × 100

**Visual Indicators**:
- 🟢 **Green** with up arrow icon = Profit
- 🔴 **Red** with down arrow icon = Loss

**Currency Format**: All amounts are displayed in Indian Rupee format (e.g., ₹2,50,000)
1. **Total Invested** = Sum of (quantity × purchase price) for all investments
2. *Dual Theme Support**
  - **Dark Mode** (default): Dark background with light text
  - **Light Mode**: Light background with dark text
  - Manual toggle with preference saved locally
  - CSS variables for seamless theme switching

- **Mobile-First Responsive Design**
  - Single column on mobile (< 640px)
  - 2 columns on tablet (640px - 1024px)
  - 3-4 columns on desktop (> 1024px)

- **Professional Branding**
  - Custom SVG logo with gradient effect
  - Cohesive color scheme across all pages
  - Modern Lucide React icons throughout

- **Dynamic Color Scheme**
  - **Dark Theme**: Rich dark backgrounds (#0f172a) with blue accents
  - **Light Theme**: Clean white backgrounds with subtle grays
  - Primary: Blue gradient (#3b82f6 to #8b5cf6)
  - Success: Green (#10b981)
  - Danger: Red (#ef4444)

- **Smooth Interactions**
  - Hover effects on cards and buttons
  - Modal animations (slide-in/fade)
  - Toast notifications for user feedback
  - Loading states with proper UX
  - Floating animation on home page visual card
## 🎨 Design Features

- **Mobile-First Responsive Design**
  - Single column on mobile (< 640px)
  - 2 columns on tablet (640px - 1024px)
  - 3-4 columns on desktop (> 1024px)

- **Clean Color Scheme**
  - Primary: Blue (#2563eb)
  - Success: Green (#16a34a)
  - Danger: Red (#dc2626)
  - Background: Light gray (#f9fafb)

- **Smooth Interactions**
  - Hover effects on cards
  - Modal animations
  - Toast notifications
  - Loading states

## 🔧 Configuration

### Validation Rules

- **Stock Symbol**: 1-10 characters, required
- **Quantity**: Positive number, required
- **Prices**: Positive numbers, required
- **Purchase Date**: Cannot be in the future, required

### API Routes

All API routes follow RESTful conventions:

```
GET    /api/investments        - Get all investments
POST   /api/investments        - Create new investment
GET    /api/investments/[id]   - Get single investment
PUT    /api/investments/[id]   - Update investment
DELETE /api/investments/[id]   - Delete investment
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Add environment variable: `MONGODB_URI`
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

**Important**: Don't forget to add your `MONGODB_URI` environment variable!

## 🐛 Troubleshooting

### "Failed to load investments"

- Check your MongoDB connection string in `.env.local`
- Ensure MongoDB Atlas whitelist includes your IP
- Verify MongoDB cluster is running

### Module not found errorsline chart for historical P/L)
- 🔍 Search and filter investments by symbol, type, or date range
- 📄 Export portfolio data to CSV or PDF
- 📈 Historical price tracking with timeline view
- 🔔 Price alerts and notifications
- 💰 Dividend tracking and reinvestment calculations
- 🌐 Multi-currency support beyond INR
- 👤 User authentication for multi-user support
- 📱 PWA support for mobile app-like experience
- 🔄 Auto-sync with live stock prices via API integration
- Check that `globals.css` is imported in `layout.js`
- Restart development server

## 📝 Future Enhancements

Post-MVP features that could be added:

- ✅ **Search and filter investments** - Implemented! Search by symbol/name, filter by type
- ✅ **Sort functionality** - Implemented! Sort by name, P/L, invested amount, or date
- ✅ **Export to CSV** - Implemented! Download complete portfolio data
- ✅ **Dark mode toggle** - Implemented! Manual theme switching with persistence
- 📊 Charts and graphs (pie chart for allocation, bar chart for P/L, line chart for historical P/L)
- 📈 Historical price tracking with timeline view
- 🔔 Price alerts and notifications
- 💰 Dividend tracking and reinvestment calculations
- 🌐 Multi-currency support beyond INR
- 👤 User authentication for multi-user support
- 📱 PWA support for mobile app-like experience
- 🔄 Auto-sync with live stock prices via API integration

## 📖 Using Advanced Features

### Search & Filter
1. Navigate to the dashboard at `/track`
2. Use the search box to find investments by symbol or name
3. Use the filter dropdown to show only Stocks or IPOs
4. Filter results update in real-time

### Sorting
- Click the sort dropdown to organize investments by:
  - **Name** (A-Z or Z-A)
  - **Profit/Loss** (High to Low or Low to High)
  - **Invested Amount** (High to Low or Low to High)
  - **Purchase Date** (Newest or Oldest)

### Export to CSV
1. Click the "Export CSV" button in the filter bar
2. A CSV file will download with all investment data
3. File includes: symbols, types, dates, quantities, prices, P/L calculations
4. Open in Excel, Google Sheets, or any spreadsheet app

### Theme Toggle
- Click the sun/moon icon in the header to switch themes
- Your preference is automatically saved
- Dark mode is the default theme

## 📄 License

This project is built for personal use and training purposes.

## 🤝 Contributing

This is a training project, but feel free to fork and customize for your own use!

---

**Built with ❤️ using Next.js and MongoDB**

For questions or issues, please check your MongoDB connection and ensure all environment variables are properly configured.
