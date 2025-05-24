import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from 'react-router-dom';
import { showSuccess, showError } from '../../toastUtils';

const Dashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [resources, setResources] = useState([]);
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "admin") {
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Invalid token', error);
    }
  } else {
    navigate('/admin/login');
  }

  const fetchData = async () => {
    try {
      const usersRes = await fetch('https://signbridgebackend.onrender.com/api/users');
      const usersData = await usersRes.json();
      setUsers(usersData);

      const pdfsRes = await fetch('https://signbridgebackend.onrender.com/api/pdfs');
      const pdfsData = await pdfsRes.json();
      setResources(pdfsData);

      const reviewsRes = await fetch('https://signbridgebackend.onrender.com/api/reviews');
      const reviewData = await reviewsRes.json();
      setReviews(reviewData)
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleAdmin = async (userId, currentRole) => {
    try {
      const newRole = currentRole === 'admin' ? 'user' : 'admin';

      const res = await fetch(`https://signbridgebackend.onrender.com/api/users/${userId}/updaterole`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }), // Assuming backend accepts role update via body
      });

      if (res.ok) {
        showSuccess(`User role updated to ${newRole}!`);
        fetchData();
      } else {
        showError('Failed to update user role.');
      }
    } catch (err) {
      console.error('Error updating user role:', err);
      showError('Error updating user role.');
    }
  };

  if (loading) return <div className="text-center mt-10 text-xl">Loading dashboard...</div>;

  return (
    <div className="p-6 bg-blue-50 min-h-screen mt-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">Admin Dashboard</h1>


      <div className="bg-white shadow-md rounded-lg p-4 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">All Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-blue-200 text-left">
              <tr>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Role</th>
                <th className="py-2 px-4 border">Created At</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx} className="border-t hover:bg-blue-50">
                  <td className="py-2 px-4 border">{user.name}</td>
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border capitalize">{user.role || 'user'}</td>
                  <td className="py-2 px-4 border">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleToggleAdmin(user._id, user.role)}
                      className={`px-3 py-1 rounded text-white font-semibold ${user.role === 'admin'
                        ? 'bg-red-600 hover:bg-red-800'
                        : 'bg-blue-600 hover:bg-blue-800'
                        }`}
                    >
                      {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">All Your Resources</h2>
        <a
          href="/blogs/uploads"
          className="text-blue-700 font-medium hover:underline break-all "
          
        >
          Add more resources
        </a>
        {resources.length === 0 ? (
          <p>No resources found.</p>
        ) : (
          <ul className="space-y-4">
            {resources.map((pdf, idx) => (
              <li
                key={pdf._id}
                className="flex flex-col sm:flex-row w-1/3 sm:items-center justify-between gap-2 p-3 border rounded-md bg-blue-50"
              >
                <div className="flex-1">
                  <a
                    href={pdf.url || '#'}
                    className="text-blue-700 font-medium hover:underline break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {pdf.title || `PDF ${idx + 1}`}
                  </a>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/updateresource/${pdf._id}`)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        const res = await fetch(`https://signbridgebackend.onrender.com/api/pdfs/${pdf._id}`, {
                          method: 'DELETE',
                        });
                        if (res.ok) {
                          showSuccess("Resource deleted!");
                          fetchData(); // refresh list
                        } else {
                          showError("Failed to delete resource.");
                        }
                      } catch (err) {
                        console.error("Error deleting resource:", err);
                        showError("Error deleting resource.");
                      }
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>


      <div className="bg-white shadow-md rounded-lg p-4 mt-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Reviews on chatbot</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-blue-200 text-left">
              <tr>
                <th className="py-2 px-4 border">Label</th>
                <th className="py-2 px-4 border">SignType</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Created At</th>
                <th className="py-2 px-4 border">PostedBy</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, idx) => (
                <tr key={idx} className="border-t hover:bg-blue-50">
                  <td className="py-2 px-4 border">{review.label}</td>
                  <td className="py-2 px-4 border">{review.signtype}</td>
                  <td className="py-2 px-4 border capitalize">{review.status}</td>
                  <td className="py-2 px-4 border">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">
                    {review.postedBy.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
