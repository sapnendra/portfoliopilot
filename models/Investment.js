import mongoose from 'mongoose';

const InvestmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: 'default'
  },
  stockSymbol: {
    type: String,
    required: true,
    trim: true,
    uppercase: true
  },
  stockName: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Stock', 'IPO']
  },
  purchaseDate: {
    type: Date,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  purchasePrice: {
    type: Number,
    required: true,
    min: 0
  },
  currentPrice: {
    type: Number,
    required: true,
    min: 0
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.models.Investment || mongoose.model('Investment', InvestmentSchema);
