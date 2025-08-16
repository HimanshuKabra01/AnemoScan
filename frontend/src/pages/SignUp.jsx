import { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { EyeOff, Eye } from 'lucide-react';

export default function SignUp() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({ email: "", confirmPassword: "", general: "" });

  const validateForm = () => {
    let valid = true;
    let newErrors = { email: "", confirmPassword: "", general: "" };

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    // Password match check
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      if (!name.trim() || !age.trim() || !email.trim() || !password.trim()) {
        setErrors((prev) => ({ ...prev, general: "Please fill all the fields." }));
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        age: age,
        email: email,
      });

      await sendEmailVerification(user);
      alert("Verification email sent! Verify your email before logging in.");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setErrors((prev) => ({ ...prev, general: "User already exists with this email. Please log in." }));
      } else {
        setErrors((prev) => ({ ...prev, general: err.message }));
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 flex flex-col space-y-4 rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-md">
        <Link to="/" className="mx-auto mb-4 flex items-center space-x-2">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold bg-gradient-to-r from-green-400 to-rose-400 bg-clip-text text-transparent">
            AnemoScan
          </h1>
        </Link>
        <h2 className="text-lg sm:text-xl font-primary text-center mb-4 text-gray-800 dark:text-white">Join AnemoScan</h2>

        <div className="space-y-3">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-gray-800 dark:text-gray-200 font-medium">Name</label>
            <input
              placeholder="Name"
              className="w-full mt-1 px-3 py-2 rounded-lg border focus:outline-none bg-gray-100 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:border-emerald-500"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Age */}
          <div className="space-y-1">
            <label className="text-gray-800 dark:text-gray-200 font-medium">Age</label>
            <input
              type="number"
              placeholder="Age"
              onChange={(e) => setAge(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg border focus:outline-none bg-gray-100 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:border-emerald-500"
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-gray-800 dark:text-gray-200 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="abc@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg border focus:outline-none bg-gray-100 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:border-emerald-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="relative space-y-1">
            <label className="text-gray-800 dark:text-gray-200 font-medium">Password</label>
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg border focus:outline-none bg-gray-100 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:border-emerald-500 pr-10"
            />
            <div
              className="absolute right-3 top-[60%] -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative space-y-1">
            <label className="text-gray-800 dark:text-gray-200 font-medium">Confirm Password</label>
            <input
              placeholder="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg border focus:outline-none bg-gray-100 dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600 focus:border-emerald-500 pr-10"
            />
            <div
              className="absolute right-3 top-[60%] -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
        </div>

        {/* General Errors */}
        {errors.general && <p className="text-red-500 text-sm text-center">{errors.general}</p>}

        {/* Sign Up Button */}
        <button
          onClick={handleSignUp}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Sign Up
        </button>

        {/* Already have account */}
        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-rose-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
