import { X, AlertTriangle } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, investment, isDeleting }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-confirm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Confirm Delete</h2>
          <button onClick={onClose} className="modal-close">
            <X size={24} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-alert">
            <AlertTriangle size={48} />
          </div>
          <p>
            Are you sure you want to delete <strong>{investment?.stockSymbol}</strong>?
          </p>
          <p className="warning-text">This action cannot be undone.</p>
        </div>

        <div className="modal-actions">
          <button 
            type="button" 
            onClick={onClose} 
            className="btn-secondary"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button 
            type="button" 
            onClick={onConfirm} 
            className="btn-danger"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
