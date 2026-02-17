import { useState, useEffect } from 'react';

export default function EditInvestmentModal({ isOpen, onClose, onUpdate, investment }) {
  const [formData, setFormData] = useState({
    stockSymbol: '',
    stockName: '',
    type: 'Stock',
    purchaseDate: '',
    quantity: '',
    purchasePrice: '',
    currentPrice: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (investment) {
      setFormData({
        stockSymbol: investment.stockSymbol || '',
        stockName: investment.stockName || '',
        type: investment.type || 'Stock',
        purchaseDate: investment.purchaseDate ? new Date(investment.purchaseDate).toISOString().split('T')[0] : '',
        quantity: investment.quantity || '',
        purchasePrice: investment.purchasePrice || '',
        currentPrice: investment.currentPrice || '',
        notes: investment.notes || ''
      });
    }
  }, [investment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.stockSymbol.trim()) {
      newErrors.stockSymbol = 'Stock symbol is required';
    } else if (formData.stockSymbol.length > 10) {
      newErrors.stockSymbol = 'Stock symbol must be 10 characters or less';
    }

    if (!formData.purchaseDate) {
      newErrors.purchaseDate = 'Purchase date is required';
    } else if (new Date(formData.purchaseDate) > new Date()) {
      newErrors.purchaseDate = 'Purchase date cannot be in the future';
    }

    if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }

    if (!formData.purchasePrice || parseFloat(formData.purchasePrice) <= 0) {
      newErrors.purchasePrice = 'Purchase price must be greater than 0';
    }

    if (!formData.currentPrice || parseFloat(formData.currentPrice) <= 0) {
      newErrors.currentPrice = 'Current price must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await onUpdate(investment._id, {
        ...formData,
        quantity: parseFloat(formData.quantity),
        purchasePrice: parseFloat(formData.purchasePrice),
        currentPrice: parseFloat(formData.currentPrice)
      });

      setErrors({});
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Investment</h2>
          <button onClick={onClose} className="modal-close">×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="stockSymbol">Stock Symbol *</label>
            <input
              type="text"
              id="stockSymbol"
              name="stockSymbol"
              value={formData.stockSymbol}
              onChange={handleChange}
              className={errors.stockSymbol ? 'error' : ''}
              placeholder="e.g., AAPL"
            />
            {errors.stockSymbol && <span className="error-message">{errors.stockSymbol}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="stockName">Stock Name</label>
            <input
              type="text"
              id="stockName"
              name="stockName"
              value={formData.stockName}
              onChange={handleChange}
              placeholder="e.g., Apple Inc."
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Investment Type *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="Stock">Stock</option>
              <option value="IPO">IPO</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="purchaseDate">Purchase Date *</label>
            <input
              type="date"
              id="purchaseDate"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              className={errors.purchaseDate ? 'error' : ''}
            />
            {errors.purchaseDate && <span className="error-message">{errors.purchaseDate}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity (Shares) *</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className={errors.quantity ? 'error' : ''}
              placeholder="e.g., 100"
              step="0.01"
              min="0"
            />
            {errors.quantity && <span className="error-message">{errors.quantity}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="purchasePrice">Purchase Price per Share *</label>
            <input
              type="number"
              id="purchasePrice"
              name="purchasePrice"
              value={formData.purchasePrice}
              onChange={handleChange}
              className={errors.purchasePrice ? 'error' : ''}
              placeholder="e.g., 150.00"
              step="0.01"
              min="0"
            />
            {errors.purchasePrice && <span className="error-message">{errors.purchasePrice}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="currentPrice">Current Price per Share *</label>
            <input
              type="number"
              id="currentPrice"
              name="currentPrice"
              value={formData.currentPrice}
              onChange={handleChange}
              className={errors.currentPrice ? 'error' : ''}
              placeholder="e.g., 180.00"
              step="0.01"
              min="0"
            />
            {errors.currentPrice && <span className="error-message">{errors.currentPrice}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              placeholder="Optional notes..."
            />
          </div>

          {errors.submit && (
            <div className="error-message global-error">{errors.submit}</div>
          )}

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
