export default function EmptyState({ onAddClick }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">📊</div>
      <h2>No Investments Yet</h2>
      <p>Start tracking your portfolio by adding your first investment</p>
      <button onClick={onAddClick} className="btn-primary">
        + Add Your First Investment
      </button>
    </div>
  );
}
