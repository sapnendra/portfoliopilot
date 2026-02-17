'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { Plus } from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import MetricCard from './MetricCard';
import InvestmentCard from './InvestmentCard';
import EmptyState from './EmptyState';
import AddInvestmentModal from './AddInvestmentModal';
import EditInvestmentModal from './EditInvestmentModal';
import DeleteConfirmModal from './DeleteConfirmModal';
import FilterSortBar from './FilterSortBar';
import { calculatePortfolioMetrics, formatCurrency, formatPercent } from '@/lib/calculations';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const { data, error, isLoading, mutate } = useSWR('/api/investments', fetcher);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState(null);
  
  // Filter and Sort States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const allInvestments = data?.data || [];
  
  // Filter, Sort, and Search Logic
  const processedInvestments = useMemo(() => {
    let filtered = [...allInvestments];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(inv => 
        inv.stockSymbol?.toLowerCase().includes(term) ||
        inv.stockName?.toLowerCase().includes(term)
      );
    }
    
    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(inv => inv.type === filterType);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      const aPL = (a.quantity * a.currentPrice) - (a.quantity * a.purchasePrice);
      const bPL = (b.quantity * b.currentPrice) - (b.quantity * b.purchasePrice);
      const aInvested = a.quantity * a.purchasePrice;
      const bInvested = b.quantity * b.purchasePrice;
      
      switch (sortBy) {
        case 'name':
          return (a.stockSymbol || '').localeCompare(b.stockSymbol || '');
        case 'name-desc':
          return (b.stockSymbol || '').localeCompare(a.stockSymbol || '');
        case 'profit-desc':
          return bPL - aPL;
        case 'profit-asc':
          return aPL - bPL;
        case 'invested-desc':
          return bInvested - aInvested;
        case 'invested-asc':
          return aInvested - bInvested;
        case 'date-desc':
          return new Date(b.purchaseDate) - new Date(a.purchaseDate);
        case 'date-asc':
          return new Date(a.purchaseDate) - new Date(b.purchaseDate);
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [allInvestments, searchTerm, filterType, sortBy]);
  
  const investments = processedInvestments;
  const portfolioMetrics = calculatePortfolioMetrics(allInvestments);

  const handleAdd = async (investmentData) => {
    try {
      const response = await fetch('/api/investments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(investmentData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to add investment');
      }

      mutate();
      setIsAddModalOpen(false);
      showToast('Investment added successfully!');
    } catch (error) {
      showToast(error.message, 'error');
      throw error;
    }
  };

  const handleEdit = (investment) => {
    setSelectedInvestment(investment);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (id, investmentData) => {
    try {
      const response = await fetch(`/api/investments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(investmentData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update investment');
      }

      mutate();
      setIsEditModalOpen(false);
      setSelectedInvestment(null);
      showToast('Investment updated successfully!');
    } catch (error) {
      showToast(error.message, 'error');
      throw error;
    }
  };

  const handleDelete = (investment) => {
    setSelectedInvestment(investment);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedInvestment) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/investments/${selectedInvestment._id}`, {
        method: 'DELETE'
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete investment');
      }

      mutate();
      setIsDeleteModalOpen(false);
      setSelectedInvestment(null);
      showToast('Investment deleted successfully!');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setIsDeleting(false);
    }
  };
  
  const handleExportCSV = () => {
    if (allInvestments.length === 0) {
      showToast('No investments to export', 'error');
      return;
    }
    
    // CSV Headers
    const headers = [
      'Stock Symbol',
      'Stock Name',
      'Type',
      'Purchase Date',
      'Quantity',
      'Purchase Price',
      'Current Price',
      'Invested Amount',
      'Current Value',
      'Profit/Loss',
      'P/L %',
      'Notes'
    ];
    
    // CSV Rows
    const rows = allInvestments.map(inv => {
      const invested = inv.quantity * inv.purchasePrice;
      const current = inv.quantity * inv.currentPrice;
      const pl = current - invested;
      const plPercent = (pl / invested) * 100;
      
      return [
        inv.stockSymbol || '',
        inv.stockName || '',
        inv.type || '',
        new Date(inv.purchaseDate).toLocaleDateString('en-IN'),
        inv.quantity,
        inv.purchasePrice,
        inv.currentPrice,
        invested.toFixed(2),
        current.toFixed(2),
        pl.toFixed(2),
        plPercent.toFixed(2),
        inv.notes || ''
      ].map(field => `"${field}"`).join(',');
    });
    
    // Combine headers and rows
    const csv = [headers.join(','), ...rows].join('\n');
    
    // Create and download file
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showToast('Portfolio exported successfully!');
  };

  if (error) {
    return (
      <div className="dashboard">
        <nav className="dashboard-nav">
          <div className="container nav-container">
            <Link href="/" className="nav-brand">
              <Logo size={36} />
              <span className="brand-name">PortfolioPilot</span>
            </Link>
            <div className="nav-actions">
              <ThemeToggle />
            </div>
          </div>
        </nav>
        
        <div className="dashboard-container">
          <div className="error-container">
            <p>Failed to load investments. Please check your MongoDB connection.</p>
            <p className="error-detail">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="container nav-container">
          <Link href="/" className="nav-brand">
            <Logo size={36} />
            <span className="brand-name">PortfolioPilot</span>
          </Link>
          <div className="nav-actions">
            <ThemeToggle />
            <button 
              onClick={() => setIsAddModalOpen(true)} 
              className="btn-nav-action"
            >
              <Plus size={20} />
              <span>Add Investment</span>
            </button>
          </div>
        </div>
      </nav>
      
      <div className="dashboard-container">

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading investments...</p>
          </div>
        ) : allInvestments.length === 0 ? (
          <EmptyState onAddClick={() => setIsAddModalOpen(true)} />
        ) : (
          <>
            <section className="metrics-section">
              <MetricCard 
                label="Total Invested" 
                value={formatCurrency(portfolioMetrics.totalInvested)} 
              />
              <MetricCard 
                label="Current Value" 
                value={formatCurrency(portfolioMetrics.totalCurrentValue)} 
              />
              <MetricCard 
                label="Total P/L" 
                value={formatCurrency(portfolioMetrics.portfolioProfit)}
                isPositive={portfolioMetrics.portfolioProfit >= 0}
              />
              <MetricCard 
                label="Return %" 
                value={formatPercent(portfolioMetrics.portfolioPercent)}
                isPositive={portfolioMetrics.portfolioPercent >= 0}
                isPercentage
              />
            </section>
            
            <FilterSortBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              filterType={filterType}
              onFilterChange={setFilterType}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onExportCSV={handleExportCSV}
            />

            <section className="investments-section">
              <h2 className="section-title">
                Your Investments 
                {investments.length !== allInvestments.length && (
                  <span className="filter-count"> ({investments.length} of {allInvestments.length})</span>
                )}
              </h2>
              {investments.length === 0 ? (
                <div className="no-results">
                  <p>No investments match your filters.</p>
                </div>
              ) : (
                <div className="investments-grid">
                  {investments.map((investment) => (
                    <InvestmentCard
                      key={investment._id}
                      investment={investment}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>

      <AddInvestmentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAdd}
      />

      <EditInvestmentModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedInvestment(null);
        }}
        onUpdate={handleUpdate}
        investment={selectedInvestment}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedInvestment(null);
        }}
        onConfirm={handleConfirmDelete}
        investment={selectedInvestment}
        isDeleting={isDeleting}
      />

      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
