'use client';

import { useState } from 'react';
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

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const investments = data?.data || [];
  const portfolioMetrics = calculatePortfolioMetrics(investments);

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
        ) : investments.length === 0 ? (
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

            <section className="investments-section">
              <h2 className="section-title">Your Investments</h2>
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
