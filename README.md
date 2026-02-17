# 📊 PortfolioPilot - Personal Investment Tracker

A clean, modern web application for tracking stock and IPO investments. Built with Next.js and MongoDB.

## ✨ Features

- **Portfolio Dashboard** - View total invested, current value, profit/loss, and return percentage
- **Investment Tracking** - Add, edit, and delete investments
- **Real-time Calculations** - Automatic P/L calculations for each investment and overall portfolio
- **Responsive Design** - Mobile-first approach, works perfectly on all devices
- **Clean UI** - Modern, professional interface with intuitive navigation

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router) with React
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Data Fetching**: SWR for real-time updates
- **Styling**: Custom CSS with mobile-first approach

## 📁 Project Structure

```
portfoliopilot/
├── app/
│   ├── api/
│   │   └── investments/
│   │       ├── route.js           # GET, POST endpoints
│   │       └── [id]/route.js      # GET, PUT, DELETE endpoints
│   ├── layout.js                  # Root layout
│   ├── page.js                    # Home page
│   └── globals.css                # Global styles
├── components/
│   ├── Dashboard.js               # Main dashboard component
│   ├── MetricCard.js              # Portfolio metric display
│   ├── InvestmentCard.js          # Individual investment card
│   ├── AddInvestmentModal.js      # Add investment form
│   ├── EditInvestmentModal.js     # Edit investment form
│   ├── DeleteConfirmModal.js      # Delete confirmation
│   └── EmptyState.js              # Empty state view
├── lib/
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
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfoliopilot
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

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
3. The investment will be permanently removed

## 🧮 How It Works

### Portfolio Metrics

The dashboard displays four key metrics at the top:

1. **Total Invested** = Sum of (quantity × purchase price) for all investments
2. **Current Value** = Sum of (quantity × current price) for all investments
3. **Total P/L** = Current Value - Total Invested
4. **Return %** = (Total P/L / Total Invested) × 100

### Per-Investment Calculations

Each investment card shows:
- **Invested Amount** = quantity × purchase price
- **Current Value** = quantity × current price
- **Profit/Loss** = Current Value - Invested Amount
- **P/L Percentage** = (Profit/Loss / Invested Amount) × 100

Colors:
- 🟢 **Green** = Profit
- 🔴 **Red** = Loss

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

### Module not found errors

- Run `npm install` to ensure all dependencies are installed
- Delete `.next` folder and restart: `rm -rf .next && npm run dev`

### Styles not loading

- Clear browser cache
- Check that `globals.css` is imported in `layout.js`
- Restart development server

## 📝 Future Enhancements

Post-MVP features that could be added:

- 📊 Charts and graphs (pie chart for allocation, bar chart for P/L)
- 🌙 Dark mode toggle
- 🔍 Search and filter investments
- 📄 Export to CSV
- 📈 Historical price tracking
- 🔔 Price alerts
- 💰 Dividend tracking
- 👤 User authentication for multi-user support

## 📄 License

This project is built for personal use and training purposes.

## 🤝 Contributing

This is a training project, but feel free to fork and customize for your own use!

---

**Built with ❤️ using Next.js and MongoDB**

For questions or issues, please check your MongoDB connection and ensure all environment variables are properly configured.
