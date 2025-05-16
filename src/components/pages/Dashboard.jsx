import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const usersRes = await fetch('https://signbridgebackend.onrender.com/api/users');
      const usersData = await usersRes.json();
      setUsers(usersData);

      const pdfsRes = await fetch('https://signbridgebackend.onrender.com/api/pdfs');
      const pdfsData = await pdfsRes.json();
      setResources(pdfsData);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMakeAdmin = async (userId) => {
    try {
      const res = await fetch(`https://signbridgebackend.onrender.com/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: 'admin' }),
      });

      if (res.ok) {
        alert('User updated to admin!');
        fetchData(); // Refresh users
      } else {
        alert('Failed to update user.');
      }
    } catch (err) {
      alert('Error updating user.');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center mt-10 text-xl">Loading dashboard...</div>;

  return (
    <div className="p-6 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-800 text-center">Admin Dashboard</h1>

      {/* All Users Table */}
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
                      onClick={() => handleMakeAdmin(user._id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-800"
                    >
                      Make Admin
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resources Section */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">All Your Resources</h2>
        {resources.length === 0 ? (
          <p>No resources found.</p>
        ) : (
          <ul className="list-disc pl-6 space-y-2">
            {resources.map((pdf, idx) => (
              <li key={idx}>
                <a
                  href={pdf.url || '#'}
                  className="text-blue-700 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {pdf.title || `PDF ${idx + 1}`}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
