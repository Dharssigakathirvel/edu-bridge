import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home            from "./pages/Home";
import Opportunities   from "./pages/Opportunities";
import Profile         from "./pages/Profile";
import Recommendations from "./pages/Recommendations";
import Signup          from "./pages/Signup";
import AddScholarship  from "./pages/AddScholarship";
import Dashboard       from "./pages/Dashboard";
import Login           from "./pages/Login";
import Games           from "./pages/Games";

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