import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        alert("Logged In!");
      } else {
        alert("Verify your email before logging in!");
        await auth.signOut();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md space-y-5">
        {/* Title */}
        <h2 className="text-3xl font-primary text-center mb-4 text-gray-800 dark:text-white">
          Login to <Link to="/" className="text-5xl bg-gradient-to-r from-green-400 to-rose-400 font-heading bg-clip-text text-transparent">AnemoScan</Link>
        </h2>

        {/* Email Input */}
        <div className="space-y-2">
          <label className="text-gray-800 dark:text-gray-200 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-4 py-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label className="text-gray-800 dark:text-gray-200 font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-4 py-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          <span className="mx-3 text-gray-500 dark:text-gray-400 text-sm">Or login with</span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        {/* Google & Facebook Buttons */}
        <div className="flex space-x-4">
          <button
            className="flex-1 flex items-center justify-center space-x-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 shadow-sm hover:shadow-md transition"
          >
            <FcGoogle className="text-xl" />
            <span className="text-gray-700 dark:text-white font-medium">Google</span>
          </button>

          <button
            className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 shadow-sm hover:shadow-md transition"
          >
            <FaFacebook className="text-xl" />
            <span className="font-medium">Facebook</span>
          </button>
        </div>

        {/* Link to Signup */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-rose-500 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
