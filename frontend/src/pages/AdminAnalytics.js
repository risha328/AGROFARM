import React, { useState } from 'react';
import {
  FiUsers, FiShoppingCart, FiDollarSign, FiActivity,
  FiTrendingUp, FiCalendar, FiRefreshCw, FiDownload,
  FiTruck, FiPackage, FiDroplet, FiSun, FiChevronDown
} from 'react-icons/fi';
import { BarChart, PieChart, LineChart } from '../components/Charts';
import { CSVLink } from 'react-csv';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AgriEcommerceAnalytics = () => {
  // State for calendar and export
  const [seasonDate, setSeasonDate] = useState(new Date());
  const [showSeasonDropdown, setShowSeasonDropdown] = useState(false);
  const [exportData, setExportData] = useState([]);
  const [isExporting, setIsExporting] = useState(false);

  // Crop seasons data
  const cropSeasons = [
    { id: 1, name: 'Kharif (Jun - Oct)', start: new Date(2023, 5, 1), end: new Date(2023, 9, 31) },
    { id: 2, name: 'Rabi (Nov - Apr)', start: new Date(2023, 10, 1), end: new Date(2024, 3, 30) },
    { id: 3, name: 'Zaid (May - Jun)', start: new Date(2023, 4, 1), end: new Date(2023, 5, 30) },
    { id: 4, name: 'Current Month', start: new Date(), end: new Date() }
  ];

  // Agriculture-focused data
  const salesData = {
    labels: ['Seeds', 'Fertilizers', 'Tools', 'Produce', 'Livestock', 'Organic'],
    datasets: [
      {
        label: 'Sales (₹)',
        data: [125000, 180000, 75000, 220000, 95000, 150000],
        backgroundColor: '#4CAF50',
        borderRadius: 6,
      }
    ]
  };

  const customerGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Farmers Registered',
        data: [85, 120, 150, 180, 210, 250],
        borderColor: '#388E3C',
        backgroundColor: 'rgba(56, 142, 60, 0.1)',
        borderWidth: 2,
        tension: 0.3,
        fill: true
      }
    ]
  };

  const productCategoryData = {
    labels: ['Seeds', 'Fertilizers', 'Equipment', 'Produce', 'Livestock'],
    datasets: [
      {
        data: [35, 25, 15, 15, 10],
        backgroundColor: [
          '#4CAF50', 
          '#8BC34A', 
          '#CDDC39', 
          '#FFC107', 
          '#FF9800'
        ],
        borderWidth: 0,
      }
    ]
  };

  const seasonalTrendsData = {
    labels: ['Kharif', 'Rabi', 'Zaid'],
    datasets: [
      {
        label: 'Sales (₹ lakhs)',
        data: [18, 22, 8],
        backgroundColor: '#4CAF50',
      }
    ]
  };

  // Prepare export data
  const prepareExportData = () => {
    setIsExporting(true);
    // Simulate data preparation
    setTimeout(() => {
      const data = [
        ['Metric', 'Value', 'Change', 'Description'],
        ['Total Revenue', '₹8,45,000', '+18.5%', 'Current season'],
        ['Farmers Served', '1,248', '+22.3%', 'Active this month'],
        ['Orders Fulfilled', '856', '+14.7%', 'Last 30 days'],
        ['Delivery Rate', '94.6%', '+2.1%', 'On-time deliveries'],
        ['Product Category', 'Sales (₹)'],
        ...salesData.labels.map((label, index) => [label, salesData.datasets[0].data[index]]),
        ['', ''],
        ['Season', 'Sales (₹ lakhs)'],
        ...seasonalTrendsData.labels.map((label, index) => [label, seasonalTrendsData.datasets[0].data[index]])
      ];
      setExportData(data);
      setIsExporting(false);
    }, 1000);
  };

  // Get current season name
  const getCurrentSeason = () => {
    const date = seasonDate;
    const season = cropSeasons.find(s => 
      date >= s.start && date <= s.end
    );
    return season ? season.name : 'Select Season';
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">AgriCommerce Dashboard</h1>
          <p className="text-gray-600">Farm-to-Market Analytics & Insights</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {/* Season Selector Dropdown */}
          <div className="relative">
            <button 
              className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setShowSeasonDropdown(!showSeasonDropdown)}
            >
              <FiCalendar className="mr-2" />
              {getCurrentSeason()}
              <FiChevronDown className="ml-2" />
            </button>
            {showSeasonDropdown && (
              <div className="absolute z-10 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200">
                <div className="p-2">
                  <DatePicker
                    selected={seasonDate}
                    onChange={(date) => {
                      setSeasonDate(date);
                      setShowSeasonDropdown(false);
                    }}
                    inline
                    calendarClassName="border-0"
                  />
                </div>
                <div className="border-t border-gray-200 p-2">
                  <p className="text-xs font-medium text-gray-500 mb-1">PREDEFINED SEASONS</p>
                  {cropSeasons.map(season => (
                    <button
                      key={season.id}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      onClick={() => {
                        setSeasonDate(season.start);
                        setShowSeasonDropdown(false);
                      }}
                    >
                      {season.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button 
            className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => {
              // Refresh data logic here
              alert('Data refreshed for ' + getCurrentSeason());
            }}
          >
            <FiRefreshCw className="mr-2" />
            Refresh
          </button>

          <CSVLink 
            data={exportData}
            filename={`agri-commerce-report-${new Date().toISOString().slice(0,10)}.csv`}
            className="flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:bg-green-700 transition-colors"
            onClick={prepareExportData}
            asyncOnClick={true}
          >
            <FiDownload className="mr-2" />
            {isExporting ? 'Preparing...' : 'Export Report'}
          </CSVLink>
        </div>
      </div>

      {/* Key Agriculture Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard
          title="Total Revenue"
          value="₹8,45,000"
          change="+18.5%"
          icon={<FiDollarSign className="text-green-600" size={20} />}
          trend="up"
          description={`${getCurrentSeason()} performance`}
        />
        <MetricCard
          title="Farmers Served"
          value="1,248"
          change="+22.3%"
          icon={<FiUsers className="text-blue-500" size={20} />}
          trend="up"
          description="Active this season"
        />
        <MetricCard
          title="Orders Fulfilled"
          value="856"
          change="+14.7%"
          icon={<FiShoppingCart className="text-orange-500" size={20} />}
          trend="up"
          description={`Last ${getCurrentSeason().includes('Month') ? '30 days' : 'season'}`}
        />
        <MetricCard
          title="Delivery Rate"
          value="94.6%"
          change="+2.1%"
          icon={<FiTruck className="text-purple-500" size={20} />}
          trend="up"
          description="On-time deliveries"
        />
      </div>

      {/* Main Agriculture Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <h2 className="text-lg font-semibold text-gray-800">Product Category Sales</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs bg-green-50 text-green-600 rounded-md">
                {getCurrentSeason()}
              </button>
              <button className="px-3 py-1 text-xs bg-gray-50 text-gray-600 rounded-md">
                Annual
              </button>
            </div>
          </div>
          <div className="h-80">
            <BarChart data={salesData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue by Product Type</h2>
          <div className="h-80">
            <PieChart data={productCategoryData} />
          </div>
        </div>
      </div>

      {/* Secondary Agriculture Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Farmer Growth</h2>
          <div className="h-80">
            <LineChart data={customerGrowthData} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Seasonal Trends</h2>
          <div className="h-80">
            <BarChart data={seasonalTrendsData} />
          </div>
        </div>
      </div>

      {/* Agriculture Insights */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Farm Operations Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InsightCard
            icon={<FiDroplet className="text-blue-500" size={20} />}
            title="Irrigation Products"
            value="+28%"
            description="Increased demand this season"
            trend="up"
          />
          <InsightCard
            icon={<FiSun className="text-yellow-500" size={20} />}
            title="Organic Products"
            value="+42%"
            description="Growing popularity"
            trend="up"
          />
          <InsightCard
            icon={<FiPackage className="text-green-500" size={20} />}
            title="Bulk Orders"
            value="15"
            description="From farmer cooperatives"
            trend="steady"
          />
        </div>
      </div>
    </div>
  );
};

// Enhanced Metric Card Component
const MetricCard = ({ title, value, change, icon, trend, description }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
          <p className="text-xs text-gray-400 mt-1">{description}</p>
        </div>
        <div className="p-2 rounded-lg" style={{ 
          backgroundColor: trend === 'up' ? 'rgba(76, 175, 80, 0.1)' : 
                          trend === 'down' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(156, 163, 175, 0.1)'
        }}>
          {icon}
        </div>
      </div>
      <div className={`mt-3 flex items-center text-sm ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
        {trend === 'up' ? (
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12 7a1 1 0 01-1-1V5.414l-4.293 4.293a1 1 0 01-1.414-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L13 5.414V6a1 1 0 01-1 1z" clipRule="evenodd" />
          </svg>
        ) : trend === 'down' ? (
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12 13a1 1 0 100-2H5.414l4.293-4.293a1 1 0 00-1.414-1.414l-6 6a1 1 0 000 1.414l6 6a1 1 0 001.414-1.414L5.414 13H12z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        )}
        <span>{change}</span>
      </div>
    </div>
  );
};

const InsightCard = ({ icon, title, value, description, trend }) => {
  return (
    <div className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-center mb-3">
        <div className="p-2 rounded-lg mr-3" style={{ 
          backgroundColor: trend === 'up' ? 'rgba(76, 175, 80, 0.1)' : 
                          trend === 'down' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(156, 163, 175, 0.1)'
        }}>
          {icon}
        </div>
        <h3 className="font-medium text-gray-800">{title}</h3>
      </div>
      <p className="text-2xl font-bold mb-2" style={{
        color: trend === 'up' ? '#4CAF50' : 
              trend === 'down' ? '#EF4444' : '#6B7280'
      }}>{value}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default AgriEcommerceAnalytics;