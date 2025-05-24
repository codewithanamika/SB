import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '../../toastUtils';
import { jwtDecode } from 'jwt-decode';
const UpdateResource = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [existingUrl, setExistingUrl] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const token=localStorage.getItem("token")
  if(token){
    const decode=jwtDecode(token)
    if(decode.role!="admin")
        navigate("/admin/login")
        
  }
  else{
    navigate("/admin/login")
  }
  // Fetch current PDF data
  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const res = await fetch(`https://signbridgebackend.onrender.com/api/pdfs/${id}`);
        const data = await res.json();
        setTitle(data.title || '');
        setExistingUrl(data.url || '');
      } catch (err) {
        showError('Failed to load resource.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPDF();
  }, [id]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    if (file) formData.append('pdf', file);

    try {
      const res = await fetch(`https://signbridgebackend.onrender.com/api/pdfs/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (res.ok) {
        showSuccess('Resource updated successfully!');
        navigate('/admin/dashboard'); 
      } else {
        showError('Failed to update resource.');
      }
    } catch (err) {
      console.error(err);
      showError('An error occurred while updating.');
    }
  };

  if (loading) return <div className="text-center mt-10 text-xl">Loading resource...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-blue-700 text-center">Update Resource</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Current PDF</label>
          {existingUrl ? (
            <a
              href={existingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View current PDF
            </a>
          ) : (
            <p className="text-gray-500">No file uploaded</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Upload New PDF (optional)</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-800"
          >
            Update Resource
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateResource;
