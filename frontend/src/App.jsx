import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home            from "./pages/Home.js";
import Opportunities   from "./pages/Opportunities.js";
import Profile         from "./pages/Profile.js";
import Recommendations from "./pages/Recommendations.js";
import Signup          from "./pages/Signup.js";
import AddScholarship  from "./pages/AddScholarship.js";
import Dashboard       from "./pages/Dashboard.js";
import Login           from "./pages/Login.js";
import Games           from "./pages/Games.js";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                element={<Home />} />
        <Route path="/opportunities"   element={<Opportunities />} />
        <Route path="/profile"         element={<Profile />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/signup"          element={<Signup />} />
        <Route path="/add-scholarship" element={<AddScholarship />} />
        <Route path="/dashboard"       element={<Dashboard />} />
        <Route path="/login"           element={<Login />} />
        <Route path="/games"           element={<Games />} />
      </Routes>
    </BrowserRouter>
  );
}