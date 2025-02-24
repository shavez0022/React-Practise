import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="container mx-auto text-center">
        <h3 className="text-xl font-semibold">Hyper Ambulance</h3>
        <p className="text-gray-400 mt-2">Your safety, our priority. Available 24/7 for emergencies.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
        </div>
        <div className="mt-4">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Hyper Ambulance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;