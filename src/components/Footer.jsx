import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="bg-blue-800 text-white p-6 text-center ">
        <p>© 2025 SignBridge. All Rights Reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms of Service</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
      </footer>
    </div>
  )
}

export default Footer
