import { TrendingUp, Plus } from 'lucide-react';

export default function EmptyState({ onAddClick }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <TrendingUp size={64} strokeWidth={1.5} />
      </div>
      <h2>No Investments Yet</h2>
      <p>Start tracking your portfolio by adding your first investment</p>
      <button onClick={onAddClick} className="btn-primary">
        <Plus size={20} />
        Add Your First Investment
      </button>
    </div>
  );
}
