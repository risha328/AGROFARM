import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { HardHat, MapPin, DollarSign, User, Mail, Loader2, Search, Filter, X } from "lucide-react";

export default function MachineryList() {
  const [machineries, setMachineries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMachineries = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:8080/api/machineries");
        setMachineries(res.data);
      } catch (err) {
        console.error("Error fetching machineries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMachineries();
  }, []);

  const filteredMachineries = machineries.filter(machinery => {
    const matchesSearch = machinery.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         machinery.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter ? machinery.location.toLowerCase() === locationFilter.toLowerCase() : true;
    const matchesCategory = categoryFilter ? machinery.category?.toLowerCase() === categoryFilter.toLowerCase() : true;
    const matchesPrice = machinery.rentPerDay >= priceRange[0] && machinery.rentPerDay <= priceRange[1];
    
    return matchesSearch && matchesLocation && matchesCategory && matchesPrice;
  });

  const locations = [...new Set(machineries.map(m => m.location))].filter(Boolean);
  const categories = [...new Set(machineries.map(m => m.category))].filter(Boolean);
  const maxPrice = Math.max(...machineries.map(m => m.rentPerDay), 10000);

  const resetFilters = () => {
    setSearchTerm("");
    setLocationFilter("");
    setCategoryFilter("");
    setPriceRange([0, maxPrice]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <Loader2 className="animate-spin text-green-600 h-12 w-12 mx-auto" />
          <p className="mt-4 text-gray-600">Loading machinery inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <HardHat className="h-10 w-10 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-800">Agricultural Machinery Rentals</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find the perfect equipment for your farming needs from our verified network of owners
        </p>
      </div>

      {/* Search and Filters Section */}
      <div className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <label htmlFor="search" className="sr-only">Search Machinery</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="search"
              type="text"
              placeholder="Search by name, description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
            {(locationFilter || categoryFilter || priceRange[1] < maxPrice) && (
              <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                {[locationFilter, categoryFilter, priceRange[1] < maxPrice].filter(Boolean).length}
              </span>
            )}
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </label>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={resetFilters}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                <X className="h-4 w-4" />
                Reset all filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium">{filteredMachineries.length}</span> of <span className="font-medium">{machineries.length}</span> available machines
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select className="text-sm border-0 focus:ring-2 focus:ring-green-500 rounded-md">
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Most Popular</option>
            <option>Newest</option>
          </select>
        </div>
      </div>

      {/* Machinery Grid */}
      {filteredMachineries.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <HardHat className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-xl font-semibold text-gray-900">
            {machineries.length === 0 ? 'No machinery available' : 'No matching results'}
          </h3>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            {machineries.length === 0 
              ? "Our inventory is currently empty. Please check back later." 
              : "Try adjusting your search or filters to find what you're looking for."}
          </p>
          {machineries.length > 0 && (
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMachineries.map((item) => (
            <div 
              key={item._id} 
              className="group bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 h-full flex flex-col"
            >
              <div className="relative pt-[70%] overflow-hidden">
                <img 
                  src={item.imageBase64 || '/placeholder-machinery.jpg'} 
                  alt={item.name} 
                  className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = '/placeholder-machinery.jpg';
                  }}
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                    {item.category || 'Equipment'}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  ₹{item.rentPerDay}/day
                </div>
              </div>
              
              <div className="p-5 flex-grow flex flex-col">
                <div className="mb-3">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                    <MapPin className="h-3 w-3" />
                    <span>{item.location}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">{item.description || 'No description available'}</p>
                
                <div className="mt-auto space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <User className="h-4 w-4 text-green-600" />
                      <span className="truncate">{item.ownerName || 'Owner'}</span>
                    </div>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`h-4 w-4 ${star <= (item.ownerRating || 4) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/checkout/${item._id}`, { state: { item } })}
                    className="mt-3 w-full px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
                  >
                    <DollarSign className="h-4 w-4" />
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}