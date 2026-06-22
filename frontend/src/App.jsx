import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home            from "./pages/Home.jsx";
import Opportunities   from "./pages/Opportunities.jsx";
import Profile         from "./pages/Profile.jsx";
import Recommendations from "./pages/Recommendations.jsx";
import Signup          from "./pages/Signup.jsx";
import AddScholarship  from "./pages/AddScholarship.jsx";
import Dashboard       from "./pages/Dashboard.jsx";
import Login           from "./pages/Login.jsx";
import Games           from "./pages/Games.jsx";

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