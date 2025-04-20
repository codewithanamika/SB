import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import { Home, Services, Contact, About, Login, Signup, Translate, Resources, Uploads, Chatbot,Test } from "./components/pages";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/translate" element={<Translate />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/blogs/uploads" element={<Uploads />} />
        <Route path="/chat" element={<Chatbot />} />
        <Route path="/test" element={<Test />} />




      </Routes>
    </div>
  );
};

export default App;
