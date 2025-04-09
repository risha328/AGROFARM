import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MachineryList() {
  const [machineries, setMachineries] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="text-center text-lg text-green-600 mt-10">Loading available machineries...</div>;
  }

  if (machineries.length === 0) {
    return <div className="text-center text-gray-500 mt-10">No machineries uploaded yet.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">Available Machineries for Rent</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {machineries.map((item) => (
          <Link to={`/machinery/${item._id}`} key={item._id}>
            <div className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition duration-300 ease-in-out">
              <img src={item.imageBase64} alt={item.name} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold text-green-700">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <p className="mt-2 text-sm">📍 <span className="font-medium">{item.location}</span></p>
                <p className="mt-1 text-sm">💰 Rent/Day: <span className="font-semibold text-green-600">₹{item.rentPerDay}</span></p>
                <p className="mt-1 text-sm">👨‍🌾 Owner: {item.ownerName}</p>
                <p className="mt-1 text-sm">📧 {item.contactEmail}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
