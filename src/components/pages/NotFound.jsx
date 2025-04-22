import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import notFoundImage from "/src/assets/404-illustration-removebg-preview.png"; // You can use any SVG/PNG here

const NotFound = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-blue-50 text-center p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <img
        src={notFoundImage}
        alt="404 not found"
        className=" mb-40 drop-shadow-lg"
      />
      <h1 className="text-5xl font-bold text-blue-700 mb-4">404</h1>
      <p className="text-lg text-blue-600 mb-6">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </motion.div>
  );
};

export default NotFound;
