// Frameworks & Libraries
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Screens & Components
import Navbar from "./components/navigation/navBar";
import Footer from "./components/generic/footer";
import SignIn from "./components/uam/login";
import SignUp from "./components/uam/signup";
import BlogArticle from "./components/blog/blog";
import ShowCASEArticle from "./components/blog/showCase";

import Home from "./screens/home";
import Blogs from "./screens/blogs";
import ShowCASE from "./screens/showCase";
import Merch from "./screens/merch";
import Checkout from "./screens/checkOut";
import Profile from "./screens/profile";
import UserAccess from "./screens/uam";

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
            {/* Home Page  */}
            <Route path="/" element={<Home />} />

            {/* Blogs + showCASE */}
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog" element={<BlogArticle />} />
            <Route path="/showcases" element={<ShowCASE />} />
            <Route path="/showcase" element={<ShowCASEArticle />} />

            {/* Merch */}
            <Route path="/shop" element={<Merch />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* Acess Management */}
            <Route path="/uam" element={<UserAccess />} />
            <Route path="/auth" element={<UserAccess />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />

            {/* Profile */}
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
