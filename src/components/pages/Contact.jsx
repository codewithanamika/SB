import React from 'react';

// Sample team member data
const teamMembers = [
  {
    name: "Khem Regmi",
    role: "Developer",
    imageUrl: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    name: "Anamika Regmi",
    role: "Designer",
    imageUrl: "https://via.placeholder.com/150", // Replace with actual image URL
  },
];

const Contact = () => {
  return (
    <div className="bg-gradient-to-r from-lightblue-300 to-lightblue-500 min-h-screen flex flex-col items-center">
      <nav className="bg-white shadow-lg w-full py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold">SignBridge</h1>
          <ul className="flex space-x-6 text-lg">
            <li><a href="/" className="hover:text-blue-600 transition">Home</a></li>
            <li><a href="/about" className="hover:text-blue-600 transition">About</a></li>
            <li><a href="/services" className="hover:text-blue-600 transition">Services</a></li>
            <li><a href="/contact" className="font-semibold text-blue-600">Contact</a></li>
          </ul>
        </div>
      </nav>

      <div className="bg-white rounded-lg shadow-lg p-8 w-3/4 md:w-1/2 mt-8 transition-transform transform hover:scale-105">
        <h2 className="text-4xl font-bold text-center mb-6">Contact Us</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg" htmlFor="name">Name</label>
            <input type="text" id="name" className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Name" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg" htmlFor="email">Email</label>
            <input type="email" id="email" className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Email" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg" htmlFor="message">Message</label>
            <textarea id="message" className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4" placeholder="Your Message" required></textarea>
          </div>
          <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 w-full">Send Message</button>
        </form>
      </div>

      {/* Contact Information Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 w-3/4 md:w-1/2 mt-8">
        <h3 className="text-3xl font-bold text-center mb-6">Contact Information</h3>
        <p className="text-lg text-gray-700"><strong>Email:</strong> info@signbridge.com</p>
        <p className="text-lg text-gray-700"><strong>Phone:</strong> +123 456 7890</p>
        <p className="text-lg text-gray-700"><strong>Address:</strong> 123 Sign Language St., City, Country</p>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 w-3/4 md:w-1/2 mt-8">
        <h3 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h3>
        <div className="mb-4">
          <p className="font-semibold">Q: What services do you offer?</p>
          <p>A: We provide sign language translation services and resources for the hearing-impaired community.</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Q: How can I contact support?</p>
          <p>A: You can reach us through the contact form above or email us directly.</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Q: Do you offer group sessions?</p>
          <p>A: Yes, we offer group sessions for organizations and educational institutions.</p>
        </div>
      </div>

      {/* Social Media Links Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 w-3/4 md:w-1/2 mt-8 text-center">
        <h3 className="text-3xl font-bold mb-4">Follow Us</h3>
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="text-blue-600 hover:text-blue-800 transition">
            <img src="https://via.placeholder.com/30?text=FB" alt="Facebook" />
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-600 transition">
            <img src="https://via.placeholder.com/30?text=TW" alt="Twitter" />
          </a>
          <a href="#" className="text-red-600 hover:text-red-800 transition">
            <img src="https://via.placeholder.com/30?text=YT" alt="YouTube" />
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-800 transition">
            <img src="https://via.placeholder.com/30?text=LI" alt="LinkedIn" />
          </a>
        </div>
      </div>

      {/* Meet Our Team Section */}
      <div className="mt-10 w-3/4 md:w-1/2">
        <h3 className="text-3xl font-bold text-center mb-6">Meet Our Team</h3>
        <div className="flex flex-col md:flex-row justify-around">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center mb-6 md:mb-0">
              <img src={member.imageUrl} alt={member.name} className="rounded-full w-32 h-32 mb-2 shadow-lg transition-transform transform hover:scale-110" />
              <h4 className="text-lg font-semibold">{member.name}</h4>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-white w-full py-6 mt-8">
        <div className="container mx-auto text-center">
          <p className="text-lg text-gray-700">© 2025 SignBridge. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
