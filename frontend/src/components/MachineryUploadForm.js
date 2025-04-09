import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

export default function MachineryUploadForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rentPerDay: "",
    location: "",
    ownerName: "",
    contactEmail: "",
    imageBase64: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      const options = { maxSizeMB: 1, maxWidthOrHeight: 800, useWebWorker: true };
      const compressed = await imageCompression(file, options);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageBase64: reader.result });
      };
      reader.readAsDataURL(compressed);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/machineries", formData);
      alert("Machinery uploaded successfully!");
      navigate("/machine");
      setFormData({
        name: "",
        description: "",
        rentPerDay: "",
        location: "",
        ownerName: "",
        contactEmail: "",
        imageBase64: ""
      });
    } catch (err) {
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-green-700">Upload Machinery for Rent</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Machinery Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="w-full p-2 border rounded"></textarea>
        <input type="number" name="rentPerDay" placeholder="Rent Per Day (₹)" value={formData.rentPerDay} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="text" name="ownerName" placeholder="Owner Name" value={formData.ownerName} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="email" name="contactEmail" placeholder="Contact Email" value={formData.contactEmail} onChange={handleChange} required className="w-full p-2 border rounded" />
        <input type="file" name="image" accept="image/*" onChange={handleChange} required className="w-full" />

        {formData.imageBase64 && (
          <img src={formData.imageBase64} alt="Preview" className="h-48 object-cover rounded border" />
        )}

        <button type="submit" disabled={loading} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
          {loading ? "Uploading..." : "Submit Machinery"}
        </button>
      </form>
    </div>
  );
}
