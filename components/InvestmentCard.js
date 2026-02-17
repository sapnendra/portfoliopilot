import { calculateInvestmentMetrics, formatCurrency, formatPercent } from '@/lib/calculations';

export default function InvestmentCard({ investment, onEdit, onDelete }) {
  const metrics = calculateInvestmentMetrics(investment);

  return (
    <div className="investment-card">
      <div className="investment-header">
        <div className="investment-title">
          <h3>{investment.stockSymbol}</h3>
          <span className={`badge badge-${investment.type.toLowerCase()}`}>
            {investment.type}
          </span>
        </div>
        <div className="investment-actions">
          <button 
            onClick={() => onEdit(investment)} 
            className="btn-icon"
            title="Edit"
          >
            ✎
          </button>
          <button 
            onClick={() => onDelete(investment)} 
            className="btn-icon btn-danger-icon"
            title="Delete"
          >
            ×
          </button>
        </div>
      </div>

      {investment.stockName && (
        <div className="investment-name">{investment.stockName}</div>
      )}

      <div className="investment-details">
        <div className="detail-row">
          <span className="detail-label">{investment.quantity} shares</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Invested:</span>
          <span className="detail-value">{formatCurrency(metrics.investedAmount)}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Current:</span>
          <span className="detail-value">{formatCurrency(metrics.currentValue)}</span>
        </div>
      </div>

      <div className={`investment-profit ${metrics.isProfit ? 'profit' : 'loss'}`}>
        <span>{metrics.isProfit ? '↑' : '↓'}</span>
        {formatCurrency(Math.abs(metrics.profitLoss))} ({formatPercent(metrics.profitLossPercent)})
      </div>
    </div>
  );
}
