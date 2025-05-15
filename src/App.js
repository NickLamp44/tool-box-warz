// Frameworks & Libraries
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Screens & Components
import Navbar from "./components/navigation/navBar";
import Footer from "./components/generic/footer";

import UserAccess from "./screens/uam";
import Blogs from "./screens/blogs";
import ShowCASE from "./screens/showCase";
import Merch from "./screens/merch";
import Checkout from "./screens/checkOut";
import Profile from "./screens/profile";

// Stlying
import "./App.css";

// Render Function
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <main className="py-4">
          <Routes>
            <Route path="/" element={<h1>Welcome to Tool Box Warz</h1>} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/auth" element={<UserAccess />} />
            <Route path="/showCASE" element={<ShowCASE />} />
            <Route path="/shop" element={<Merch />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
