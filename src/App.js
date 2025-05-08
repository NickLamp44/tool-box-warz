import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/generic/header";
import Footer from "./components/generic/footer";
import Blogs from "./screens/blogs";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <main className="py-4">
          <Routes>
            <Route path="/" element={<h1>Welcome to Tool Box Warz</h1>} />
            <Route path="/blogs" element={<Blogs />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
