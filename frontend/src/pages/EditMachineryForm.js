import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { Trash2, Loader2, ChevronLeft } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditMachineryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rentPerDay: "",
    location: "",
    ownerName: "",
    contactEmail: "",
    imageBase64: ""
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const fetchMachinery = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/machineries/${id}`);
        setFormData(res.data);
        if (res.data.imageBase64) {
          setImagePreview(res.data.imageBase64);
        }
      } catch (err) {
        toast.error("Failed to fetch machinery details");
      } finally {
        setLoading(false);
      }
    };
    fetchMachinery();
  }, [id]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    
    if (name === "image") {
      if (!files || files.length === 0) return;
      
      const file = files[0];
      try {
        const options = { 
          maxSizeMB: 1, 
          maxWidthOrHeight: 800, 
          useWebWorker: true 
        };
        const compressed = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result;
          setFormData(prev => ({ ...prev, imageBase64: base64 }));
          setImagePreview(base64);
        };
        reader.readAsDataURL(compressed);
      } catch (error) {
        toast.error("Failed to process image");
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.put(`http://localhost:8080/api/machineries/${id}`, formData);
      toast.success("Machinery updated successfully!");
      navigate("/machine");
    } catch (err) {
      toast.error("Update failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this machinery?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/machineries/${id}`);
      toast.success("Machinery deleted successfully");
      navigate("/machine");
    } catch (err) {
      toast.error("Failed to delete machinery");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-green-600 h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <button 
          onClick={() => navigate("/machine")} 
          className="flex items-center text-green-600 hover:text-green-800 transition-colors"
        >
          <ChevronLeft className="mr-1" /> Back to Machinery List
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-800 p-6 text-white">
          <h2 className="text-2xl font-bold">Edit Machinery Details</h2>
          <p className="opacity-90">Update the information below</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Machinery Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Rent Per Day (₹) *</label>
              <input
                type="number"
                name="rentPerDay"
                value={formData.rentPerDay}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Owner Name *</label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Contact Email *</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Machinery Image</label>
              <div className="flex items-center space-x-4">
                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg border border-gray-300 transition-colors">
                  <span>Choose File</span>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
                {imagePreview && (
                  <span className="text-sm text-gray-500">Image selected</span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {imagePreview && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Image Preview</label>
              <div className="border rounded-lg p-2 max-w-xs">
                <img 
                  src={imagePreview} 
                  alt="Machinery preview" 
                  className="w-full h-auto rounded-md object-cover"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              <Trash2 size={18} />
              <span>Delete Machinery</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting && <Loader2 className="animate-spin mr-2" />}
              {isSubmitting ? "Updating..." : "Update Machinery"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
