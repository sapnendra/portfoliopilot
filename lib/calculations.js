// Calculation utilities for portfolio metrics

export function calculateInvestmentMetrics(investment) {
  const investedAmount = investment.quantity * investment.purchasePrice;
  const currentValue = investment.quantity * investment.currentPrice;
  const profitLoss = currentValue - investedAmount;
  const profitLossPercent = (profitLoss / investedAmount) * 100;
  
  return {
    investedAmount,
    currentValue,
    profitLoss,
    profitLossPercent,
    isProfit: profitLoss >= 0
  };
}

export function calculatePortfolioMetrics(investments) {
  if (!investments || investments.length === 0) {
    return {
      totalInvested: 0,
      totalCurrentValue: 0,
      portfolioProfit: 0,
      portfolioPercent: 0
    };
  }

  const totalInvested = investments.reduce((sum, inv) => {
    return sum + (inv.quantity * inv.purchasePrice);
  }, 0);

  const totalCurrentValue = investments.reduce((sum, inv) => {
    return sum + (inv.quantity * inv.currentPrice);
  }, 0);

  const portfolioProfit = totalCurrentValue - totalInvested;
  const portfolioPercent = totalInvested > 0 ? (portfolioProfit / totalInvested) * 100 : 0;

  return {
    totalInvested,
    totalCurrentValue,
    portfolioProfit,
    portfolioPercent
  };
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

export function formatPercent(percent) {
  return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
}
