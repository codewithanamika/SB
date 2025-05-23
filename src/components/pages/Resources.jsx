import React, { useEffect, useRef, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import { FaFilePdf } from 'react-icons/fa';

const Resources = () => {
  const [blogs, setBlogs] = useState([]);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://signbridgebackend.onrender.com/api/pdfs")
      .then(res => setBlogs(res.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20 pb-8 bg-gradient-to-r from-blue-100 to-blue-300 text-gray-800 overflow-y-auto">
      <section
        ref={sectionRef}
        className="opacity-0 transform transition-all duration-1000 ease-out w-full max-w-6xl px-4"
      >
        <h1 className="text-5xl font-extrabold mb-10 text-center bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
          SignBridge Resources
        </h1>
        <Link to="/blogs/uploads" className="text-white text-lg hover:text-blue-300">Upload</Link>
        

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map(blog => (
        <a
        key={blog._id}
        href={blog.downloadUrl}
        download
        target="_self"
        rel="noopener noreferrer"
        className="block cursor-pointer bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-xl border border-blue-100 transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:rotate-1"
      >
        <div className="flex items-center gap-3 mb-4">
          <FaFilePdf className="text-red-500 text-3xl" />
          <h3 className="text-xl font-bold text-blue-700">{blog.title}</h3>
        </div>
        <p className="text-sm text-gray-600">Language: {blog.language}</p>
      </a>

        ))}
      </div>

      </section>

   
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Resources;
