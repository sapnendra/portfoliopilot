export default function MetricCard({ label, value, isPositive, isPercentage }) {
  const getColorClass = () => {
    if (isPositive === undefined) return '';
    return isPositive ? 'metric-positive' : 'metric-negative';
  };

  return (
    <div className="metric-card">
      <div className={`metric-value ${getColorClass()}`}>
        {value}
      </div>
      <div className="metric-label">{label}</div>
    </div>
  );
}
