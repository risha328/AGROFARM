import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { HardHat, MapPin, DollarSign, User, Mail, Loader2 } from "lucide-react";

export default function MachineryList() {
  const [machineries, setMachineries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    const fetchMachineries = async () => {
      try {
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
    return matchesSearch && matchesLocation;
  });

  const locations = [...new Set(machineries.map(m => m.location))];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-green-600 h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <HardHat className="h-10 w-10 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-800">Available Machinery Rentals</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse our collection of high-quality agricultural machinery available for rent in your area
        </p>
      </div>

      {/* Filters Section */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search Machinery</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Location</label>
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

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm("");
                setLocationFilter("");
              }}
              className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Machinery Grid */}
      {filteredMachineries.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
          <HardHat className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No machinery found</h3>
          <p className="mt-2 text-gray-500">
            {machineries.length === 0 
              ? "No machineries have been added yet." 
              : "No machineries match your search criteria."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMachineries.map((item) => (
            <Link 
              to={`/machinery/${item._id}`} 
              key={item._id}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                <div className="relative pt-[70%] overflow-hidden">
                  <img 
                    src={item.imageBase64} 
                    alt={item.name} 
                    className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    ₹{item.rentPerDay}/day
                  </div>
                </div>
                
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                  
                  <div className="mt-auto space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="h-4 w-4 text-green-600" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <User className="h-4 w-4 text-green-600" />
                      <span>{item.ownerName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Mail className="h-4 w-4 text-green-600" />
                      <span className="truncate">{item.contactEmail}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}