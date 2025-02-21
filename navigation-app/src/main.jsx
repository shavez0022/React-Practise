import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Login} from "./login/login";
import { Home } from "./home";
import {AboutUs} from "./about/about";
import { Services } from "./services/services";
import { Contact } from "./contact/contact";
import { Trips } from "./trips/trips";

createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/trip" element={<Trips />} />
    </Routes>
  </Router>
);
