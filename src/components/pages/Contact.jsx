import React from "react";

// Sample team member data
const teamMembers = [
  {
    name: "Bivek Nepal",
    role: "Developer",
    imageUrl: "https://i.imgur.com/9ndviTH.jpeg",
  },
  {
    name: "Anamika Regmi",
    role: "Developer",
    imageUrl: "https://i.imgur.com/JtsxmwM.jpeg",
  },
];

const Contact = () => {
  return (
    <div className="bg-gradient-to-br from-blue-100 via-blue-300 to-blue-600 min-h-screen flex flex-col items-center text-gray-800">
      {/* Contact Form */}
      <section className="bg-white bg-opacity-90 rounded-xl shadow-xl p-8 w-11/12 md:w-3/5 lg:w-2/5 mt-10">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">Contact Us</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 text-lg font-medium">Name</label>
            <input type="text" id="name" placeholder="Your Name"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-lg font-medium">Email</label>
            <input type="email" id="email" placeholder="Your Email"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-1 text-lg font-medium">Message</label>
            <textarea id="message" rows="4" placeholder="Your Message"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" required></textarea>
          </div>
          <button type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition">
            Send Message
          </button>
        </form>
      </section>

      {/* Contact Info */}
      <section className="bg-white bg-opacity-90 rounded-xl shadow-xl p-8 w-11/12 md:w-3/5 lg:w-2/5 mt-8">
        <h3 className="text-3xl font-bold text-center text-blue-700 mb-4">Contact Information</h3>
        <p className="text-lg"><strong>Email:</strong> anamikaregmi1@gmail.com</p>
        <p className="text-lg"><strong>Phone:</strong> 9815077326</p>
        <p className="text-lg"><strong>Address:</strong> birtamode, jhapa, Nepal</p>
      </section>

      {/* FAQs */}
      <section className="bg-white bg-opacity-90 rounded-xl shadow-xl p-8 w-11/12 md:w-3/5 lg:w-2/5 mt-8">
        <h3 className="text-3xl font-bold text-center text-blue-700 mb-4">FAQs</h3>
        <div className="space-y-4">
          <div>
            <p className="font-semibold">Q: What services do you offer?</p>
            <p>A: Sign language translation and resources for the hearing-impaired.</p>
          </div>
          <div>
            <p className="font-semibold">Q: How can I contact support?</p>
            <p>A: Use the contact form above or email us directly.</p>
          </div>
          <div>
            <p className="font-semibold">Q: Do you offer group sessions?</p>
            <p>A: Yes, for schools, colleges, and institutions.</p>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="bg-white bg-opacity-90 rounded-xl shadow-xl p-8 w-11/12 md:w-3/5 lg:w-2/5 mt-8 text-center">
  <h3 className="text-3xl font-bold text-blue-700 mb-4">Follow Us</h3>
  <div className="flex justify-center space-x-6">
    {/* Facebook */}
    <a href="https://www.facebook.com/anamika.regmi.94" target="_blank" rel="noopener noreferrer">
      <img src="https://img.icons8.com/ios-filled/50/000000/facebook-new.png" alt="Facebook" className="w-8 h-8" />
    </a>
    {/* Twitter */}
    <a href="https://x.com/bivekkkkk51" target="_blank" rel="noopener noreferrer">
      <img src="https://img.icons8.com/ios-filled/50/000000/twitter.png" alt="Twitter" className="w-8 h-8" />
    </a>
    {/* YouTube */}
    <a href="https://youtube.com/yourchannel" target="_blank" rel="noopener noreferrer">
      <img src="https://img.icons8.com/ios-filled/50/000000/youtube-play.png" alt="YouTube" className="w-8 h-8" />
    </a>
    {/* LinkedIn */}
    <a href="https://np.linkedin.com/in/bivek-nepal-080899263" target="_blank" rel="noopener noreferrer">
      <img src="https://img.icons8.com/ios-filled/50/000000/linkedin.png" alt="LinkedIn" className="w-8 h-8" />
    </a>
  </div>
</section>


      {/* Team Section */}
      <section className="mt-10 w-11/12 md:w-3/5 lg:w-2/5">
        <h3 className="text-3xl font-bold text-center text-blue-700 mb-6">Meet Our Team</h3>
        <div className="flex flex-col md:flex-row justify-around items-center gap-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <img src={member.imageUrl} alt=""
                className="rounded-full w-32 h-32 mb-2 shadow-md hover:scale-110 transition-transform" />
              <h4 className="text-lg font-semibold">{member.name}</h4>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white w-full mt-10 py-6 shadow-inner">
        <div className="text-center">
          <p className="text-gray-700">&copy; 2025 SignBridge. All rights reserved.</p>
          <div className="mt-2 space-x-4 text-gray-600 text-sm">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
