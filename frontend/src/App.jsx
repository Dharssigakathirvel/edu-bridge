import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home            from "./tempPages/Home.jsx";
import Opportunities   from "./tempPages/Opportunities.js";
import Profile         from "./tempPages/Profile.js";
import Recommendations from "./tempPages/Recommendations.js";
import Signup          from "./tempPages/Signup.jsx";
import AddScholarship  from "./tempPages/AddScholarship.js";
import Dashboard       from "./tempPages/Dashboard.js";
import Login           from "./tempPages/Login.js";
import Games           from "./tempPages/Games.jsx";

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