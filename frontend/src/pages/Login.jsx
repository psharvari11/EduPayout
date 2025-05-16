// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Link } from "react-router-dom";


// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     if (!email || !password) {
//       setError("Email and password are required.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.post(
//         "/login",
//         { email, password },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       // console.log("Response:", res.data);

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Error:", err.response?.data);
//       setError(err.response?.data?.msg || "Login failed. Please check your credentials.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-800">
//       <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8 border border-gray-200">
//         <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Login</h2>

//         {error && (
//           <p className="bg-red-100 text-red-700 p-3 rounded text-sm text-center mb-4 border border-red-300">
//             {error}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full p-3 bg-gray-50 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full p-3 bg-gray-50 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           <div className="text-center mt-3">
//             <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
//               Forgot Password?
//             </Link>
//           </div>
//         </form>

//         <div className="text-center mt-6 text-gray-600 text-sm">
//           Don't have an account?{" "}
//           <Link to="/signup" className="text-blue-500 font-medium hover:underline">
//             Sign up
//           </Link>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default Login;





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("mentor"); // 'mentor' or 'admin'
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        `/${userType}/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", userType);

      navigate(`/${userType}/dashboard`);
    } catch (err) {
      console.error("Error:", err.response?.data);
      setError(err.response?.data?.msg || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
        {/* Login Type Toggle */}
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-4 font-medium text-center transition-colors ${
              userType === "mentor"
                ? "bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:bg-gray-50"
            }`}
            onClick={() => setUserType("mentor")}
          >
            Mentor Login
          </button>
          <button
            className={`flex-1 py-4 font-medium text-center transition-colors ${
              userType === "admin"
                ? "bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:bg-gray-50"
            }`}
            onClick={() => setUserType("admin")}
          >
            Admin Login
          </button>
        </div>

        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {userType === "mentor" ? "Mentor Portal" : "Admin Dashboard"}
            </h2>
            <p className="text-gray-500 mt-1">
              {userType === "mentor"
                ? "Access your mentoring sessions and payments"
                : "Manage mentor payouts and sessions"}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder={`${userType}@example.com`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 px-4 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ${
                loading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                `Sign in as ${userType}`
              )}
            </button>
          </form>

         
          
        </div>
      </div>
    </div>
  );
};

export default Login;