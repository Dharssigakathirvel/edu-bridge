import axios from "axios";
import initialOpportunities from "./data/opportunities.js";

const BASE_URL = "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Helper to get/set mock data in localStorage
const getMockUsers = () => JSON.parse(localStorage.getItem("mock_users") || "[]");
const saveMockUsers = (users) => localStorage.setItem("mock_users", JSON.stringify(users));

const getMockOpportunities = () => {
  let opps = localStorage.getItem("mock_opportunities");
  if (!opps) {
    localStorage.setItem("mock_opportunities", JSON.stringify(initialOpportunities));
    return initialOpportunities;
  }
  return JSON.parse(opps);
};
const saveMockOpportunities = (opps) => localStorage.setItem("mock_opportunities", JSON.stringify(opps));

// Mock router handler
const handleMockRequest = async (method, url, data) => {
  console.log(`[Mock API] Intercepted ${method.toUpperCase()} ${url}`, data);
  
  // Normalize URL to remove baseURL
  const path = url.replace(/^\/?api/, "").replace(/^\//, "");
  
  // 1. Auth Signup
  if (path === "auth/signup" && method === "post") {
    const users = getMockUsers();
    if (users.some(u => u.email === data.email)) {
      throw { response: { data: { message: "User already exists with this email ❌" } } };
    }
    const newUser = {
      id: "u_" + Date.now(),
      name: data.name,
      email: data.email,
      class: data.class,
      obtainedMarks: Number(data.obtainedMarks),
      totalMarks: Number(data.totalMarks),
      interest: data.interest || "",
      state: data.state || "",
      role: data.email.includes("admin") ? "admin" : "student", // Simple rule to make admin
    };
    users.push(newUser);
    saveMockUsers(users);
    
    return {
      data: {
        token: "mock-jwt-token-for-" + newUser.id,
        user: newUser
      }
    };
  }
  
  // 2. Auth Login
  if (path === "auth/login" && method === "post") {
    const users = getMockUsers();
    const user = users.find(u => u.email === data.email);
    // Simple password check (accept anything for mock demo)
    if (!user) {
      // Create a default admin or student if not found just to make testing extremely easy!
      const isDefaultAdmin = data.email.includes("admin");
      const defaultUser = {
        id: "u_default",
        name: isDefaultAdmin ? "Default Admin" : "Default Student",
        email: data.email,
        class: "10",
        obtainedMarks: 90,
        totalMarks: 100,
        interest: "Coding",
        state: "Delhi",
        role: isDefaultAdmin ? "admin" : "student"
      };
      users.push(defaultUser);
      saveMockUsers(users);
      return {
        data: {
          token: "mock-jwt-token-for-default",
          user: defaultUser
        }
      };
    }
    return {
      data: {
        token: "mock-jwt-token-for-" + user.id,
        user
      }
    };
  }
  
  // 3. Get Opportunities
  if (path === "scholarships" && method === "get") {
    const opps = getMockOpportunities();
    return { data: opps };
  }
  
  // 4. Add Opportunity
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
  
  // 5. Delete Opportunity
  if (path.startsWith("scholarships/") && method === "delete") {
    const id = parseInt(path.split("/")[1]);
    let opps = getMockOpportunities();
    opps = opps.filter(o => o.id !== id);
    saveMockOpportunities(opps);
    return { data: { success: true } };
  }
  
  // 6. Recommend Opportunities
  if (path === "scholarships/recommend" && method === "post") {
    const opps = getMockOpportunities();
    const student = data; // User data sent for recommendations
    
    // Filter logic
    const matched = opps.filter(item => {
      // Check class range eligibility
      const studentClass = parseInt(student.class);
      const isClassEligible = item.classRange ? item.classRange.includes(studentClass) : true;
      
      // Check marks eligibility
      const isMarksEligible = student.obtainedMarks && student.totalMarks
        ? (student.obtainedMarks / student.totalMarks * 100) >= item.minMarks
        : true;
        
      // Check interest matching
      const isInterestEligible = item.interest === "All" || 
        (student.interest && student.interest.toLowerCase() === item.interest.toLowerCase());
        
      return isClassEligible && isMarksEligible && isInterestEligible;
    });
    
    return { data: matched };
  }
  
  throw { response: { data: { message: `Mock route ${method} /${path} not found` } } };
};

// Export custom API object that mirrors axios
const API = {
  get: async (url, config) => {
    try {
      return await axiosInstance.get(url, config);
    } catch (err) {
      if (err.code === "ERR_NETWORK" || err.message === "Network Error" || !err.response) {
        return await handleMockRequest("get", url);
      }
      throw err;
    }
  },
  post: async (url, data, config) => {
    try {
      return await axiosInstance.post(url, data, config);
    } catch (err) {
      if (err.code === "ERR_NETWORK" || err.message === "Network Error" || !err.response) {
        return await handleMockRequest("post", url, data);
      }
      throw err;
    }
  },
  delete: async (url, config) => {
    try {
      return await axiosInstance.delete(url, config);
    } catch (err) {
      if (err.code === "ERR_NETWORK" || err.message === "Network Error" || !err.response) {
        return await handleMockRequest("delete", url);
      }
      throw err;
    }
  },
  put: async (url, data, config) => {
    try {
      return await axiosInstance.put(url, data, config);
    } catch (err) {
      if (err.code === "ERR_NETWORK" || err.message === "Network Error" || !err.response) {
        return await handleMockRequest("put", url, data);
      }
      throw err;
    }
  }
};

export default API;