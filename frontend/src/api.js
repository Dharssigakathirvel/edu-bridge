import axios from "axios";
import initialOpportunities from "./data/opportunities.js";

const BASE_URL = "http://localhost:8000/api";

// YOUR email — always gets admin role
const ADMIN_EMAIL = "dharssigakathirvel@gmail.com";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 4000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Mock DB helpers ──────────────────────────────────────────────────
const getMockUsers = () => JSON.parse(localStorage.getItem("mock_users") || "[]");
const saveMockUsers = (users) => localStorage.setItem("mock_users", JSON.stringify(users));

const getMockOpportunities = () => {
  const stored = localStorage.getItem("mock_opportunities");
  if (!stored) {
    localStorage.setItem("mock_opportunities", JSON.stringify(initialOpportunities));
    return initialOpportunities;
  }
  return JSON.parse(stored);
};
const saveMockOpportunities = (opps) =>
  localStorage.setItem("mock_opportunities", JSON.stringify(opps));

// ── Mock route handler (offline fallback) ────────────────────────────
const handleMockRequest = async (method, url, data) => {
  const path = url.replace(/^\/?api/, "").replace(/^\//, "");

  // ── SIGNUP ──
  if (path === "auth/signup" && method === "post") {
    const users = getMockUsers();
    if (users.some((u) => u.email === data.email)) {
      throw { response: { data: { message: "User already exists with this email ❌" } } };
    }
    const isAdmin = data.email === ADMIN_EMAIL;
    const newUser = {
      id: "u_" + Date.now(),
      name: data.name,
      email: data.email,
      class: data.class,
      obtainedMarks: Number(data.obtainedMarks),
      totalMarks: Number(data.totalMarks),
      interest: data.interest || "",
      state: data.state || "",
      role: isAdmin ? "admin" : "student",
    };
    users.push(newUser);
    saveMockUsers(users);
    return { data: { token: "mock-jwt-" + newUser.id, user: newUser } };
  }

  // ── LOGIN ──
  if (path === "auth/login" && method === "post") {
    const users = getMockUsers();
    let user = users.find((u) => u.email === data.email);
    const isAdmin = data.email === ADMIN_EMAIL;
    if (!user) {
      // Auto-create account for easy demo login
      user = {
        id: "u_" + Date.now(),
        name: isAdmin ? "Dharssiga Kathirvel" : "Demo Student",
        email: data.email,
        class: "10",
        obtainedMarks: 90,
        totalMarks: 100,
        interest: "Coding",
        state: "Tamil Nadu",
        role: isAdmin ? "admin" : "student",
      };
      users.push(user);
      saveMockUsers(users);
    }
    // Always give admin role to ADMIN_EMAIL even if previously stored as student
    if (user.email === ADMIN_EMAIL) user.role = "admin";
    return { data: { token: "mock-jwt-" + user.id, user } };
  }

  // ── GET SCHOLARSHIPS ──
  if (path === "scholarships" && method === "get") {
    return { data: getMockOpportunities() };
  }

  // ── ADD SCHOLARSHIP ──
  if (path === "scholarships/add" && method === "post") {
    const opps = getMockOpportunities();
    const newOpp = {
      id: opps.length + 1,
      title: data.title,
      type: data.type,
      emoji: data.emoji || "🎓",
      description: data.description,
      class: data.class,
      classRange: data.classRange || [8, 9, 10, 11, 12],
      minMarks: Number(data.minMarks),
      interest: data.interest,
      deadline: data.deadline,
    };
    opps.push(newOpp);
    saveMockOpportunities(opps);
    return { data: newOpp };
  }

  // ── DELETE SCHOLARSHIP ──
  if (path.startsWith("scholarships/") && method === "delete") {
    const id = parseInt(path.split("/")[1]);
    saveMockOpportunities(getMockOpportunities().filter((o) => o.id !== id));
    return { data: { success: true } };
  }

  // ── RECOMMEND ──
  if (path === "scholarships/recommend" && method === "post") {
    const opps = getMockOpportunities();
    const student = data;
    const matched = opps.filter((item) => {
      const cls = parseInt(student.class);
      const pct = student.obtainedMarks && student.totalMarks
        ? (student.obtainedMarks / student.totalMarks) * 100
        : student.percentage || 0;
      const classOk = item.classRange ? item.classRange.includes(cls) : true;
      const marksOk = pct >= item.minMarks;
      const intOk =
        item.interest === "All" ||
        (student.interest || "").toLowerCase().includes(item.interest.toLowerCase());
      return classOk && marksOk && intOk;
    });
    return { data: matched };
  }

  throw { response: { data: { message: `Mock: route not found — ${method} /${path}` } } };
};

// ── Decide: real backend or mock ─────────────────────────────────────
const isNetworkError = (err) =>
  !err.response || err.code === "ERR_NETWORK" || err.message === "Network Error";

const API = {
  get: async (url, config) => {
    try { return await axiosInstance.get(url, config); }
    catch (err) { if (isNetworkError(err)) return handleMockRequest("get", url); throw err; }
  },
  post: async (url, data, config) => {
    try { return await axiosInstance.post(url, data, config); }
    catch (err) { if (isNetworkError(err)) return handleMockRequest("post", url, data); throw err; }
  },
  delete: async (url, config) => {
    try { return await axiosInstance.delete(url, config); }
    catch (err) { if (isNetworkError(err)) return handleMockRequest("delete", url); throw err; }
  },
  put: async (url, data, config) => {
    try { return await axiosInstance.put(url, data, config); }
    catch (err) { if (isNetworkError(err)) return handleMockRequest("put", url, data); throw err; }
  },
};

export default API;