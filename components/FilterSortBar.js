'use client';

import { Search, Filter, ArrowUpDown, Download } from 'lucide-react';

export default function FilterSortBar({ 
  searchTerm, 
  onSearchChange, 
  filterType, 
  onFilterChange, 
  sortBy, 
  onSortChange,
  onExportCSV 
}) {
  return (
    <div className="filter-sort-bar">
      {/* Search Input */}
      <div className="search-box">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search investments..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Filter by Type */}
      <div className="filter-group">
        <Filter size={18} className="filter-icon" />
        <select
          value={filterType}
          onChange={(e) => onFilterChange(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Types</option>
          <option value="Stock">Stocks</option>
          <option value="IPO">IPOs</option>
        </select>
      </div>

      {/* Sort Options */}
      <div className="filter-group">
        <ArrowUpDown size={18} className="filter-icon" />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="filter-select"
        >
          <option value="name">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="profit-desc">Profit/Loss (High to Low)</option>
          <option value="profit-asc">Profit/Loss (Low to High)</option>
          <option value="invested-desc">Invested (High to Low)</option>
          <option value="invested-asc">Invested (Low to High)</option>
          <option value="date-desc">Date (Newest)</option>
          <option value="date-asc">Date (Oldest)</option>
        </select>
      </div>

      {/* Export Button */}
      <button
        onClick={onExportCSV}
        className="export-btn"
        title="Export to CSV"
      >
        <Download size={18} />
        <span className="export-text">Export CSV</span>
      </button>
    </div>
  );
}
