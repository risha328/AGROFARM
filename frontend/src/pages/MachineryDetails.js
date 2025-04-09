import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";

export default function MachineryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [machinery, setMachinery] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMachinery = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/machineries/${id}`);
        setMachinery(res.data);
      } catch (err) {
        console.error("Error fetching machinery details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMachinery();
  }, [id]);

  if (loading) {
    return <div className="text-center text-green-600 mt-10 text-lg font-medium">Loading machinery details...</div>;
  }

  if (!machinery) {
    return <div className="text-center text-red-600 mt-10 text-lg font-semibold">⚠️ Machinery not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={machinery.imageBase64}
          alt={machinery.name}
          className="w-full md:w-1/2 h-80 object-cover rounded-xl shadow-sm"
        />
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-bold text-green-700">{machinery.name}</h2>
          <p className="text-gray-700 text-base">{machinery.description}</p>

          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
            <p>📍 <span className="font-medium">Location:</span> {machinery.location}</p>
            <p>💰 <span className="font-medium">Rent/Day:</span> ₹{machinery.rentPerDay}</p>
            <p>👨‍🌾 <span className="font-medium">Owner:</span> {machinery.ownerName}</p>
            <p>📧 <span className="font-medium">Email:</span> {machinery.contactEmail}</p>
            <p>📞 <span className="font-medium">Phone:</span> {machinery.phone}</p>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition duration-200"
              onClick={() => navigate(`/edit-machinery/${machinery._id}`)}
            >
              <Pencil size={18} /> Edit
            </button>
            <button
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
              onClick={async () => {
                if (window.confirm("Are you sure you want to delete this machinery?")) {
                  try {
                    await axios.delete(`http://localhost:8080/api/machineries/${machinery._id}`);
                    navigate("/machineries");
                  } catch (err) {
                    alert("Failed to delete machinery.");
                    console.error(err);
                  }
                }
              }}
            >
              <Trash2 size={18} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

