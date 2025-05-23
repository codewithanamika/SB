import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";
import { showSuccess,showError } from '../../toastUtils';

const Uploads = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    language: '',
    basis: '',
    pdf: null,
  });
  const [status, setStatus] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.role !== "admin") {
          navigate('/admin/login');
        }
      } catch (error) {
        console.error('Invalid token', error);
        navigate('/admin/login');
      }
    } else {
      navigate('/admin/login');
    }
  }, [navigate]); 

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'pdf') {
      setFormData({ ...formData, pdf: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('language', formData.language);
    data.append('basis', formData.basis);
    data.append('pdf', formData.pdf);

    try {
      const res = await axios.post(
        'https://signbridgebackend.onrender.com/api/pdfs/upload',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (res.status === 200 || res.status === 201) {
        showSuccess("Upload successful! Redirecting to resources page...");
        navigate('/resources');
      } else {
        showError("Upload failed. Please try again.");
      }
    } catch (err) {
      setStatus('Error uploading PDF.');
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-6"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center text-blue-700">Upload a PDF</h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="text"
          name="language"
          placeholder="Language"
          value={formData.language}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="text"
          name="basis"
          placeholder="Basis (e.g., Awareness, Education)"
          value={formData.basis}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="file"
          name="pdf"
          accept="application/pdf"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Upload PDF
        </button>

        {status && <p className="text-center text-sm text-green-600">{status}</p>}
      </form>
    </div>
  );
};

export default Uploads;
