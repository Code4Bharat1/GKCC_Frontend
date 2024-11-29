"use client";
import Navbar from "@/components/layouts/navbar/Navbar";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const [gkccId, setGkccId] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("member"); // State to track user type
  const [error, setError] = useState(""); // State to hold any error messages
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/${userType}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ GKCCId: gkccId, password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Store both the token and GKCCId in localStorage
        localStorage.setItem("token", data.message.token);
        localStorage.setItem("GKCCId", gkccId); // Store the GKCCId

        // Redirect to the appropriate profile page based on user type
        if (userType === "member") {
          localStorage.setItem("user", "member");
          router.push("/member-profile"); // Redirect to member profile
        } else if (userType === "vendor") {
          localStorage.setItem("user", "vendor");
          router.push("/v-profile"); // Redirect to vendor profile
        }
      } else {
        // Set error message if login fails
        setError(data.data || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-blue-500 rounded-2xl p-4 md:p-12 flex items-center justify-center min-h-screen mt-2 md:ml-28 w-full h-full md:w-[95vw] md:h-[95vh] lg:w-[90vw] lg:h-[90vh] xl:w-[85vw] xl:h-[85vh] shadow-lg mt-20 mb-4">
        <div className="bg-white mt-8 rounded-3xl flex flex-col sm:flex-row w-full h-full overflow-hidden max-w-full md:max-w-4xl lg:max-w-3xl xl:max-w-4xl shadow-lg">
          {/* Left Section */}
          <div className="flex-1 bg-white rounded-t-3xl sm:rounded-l-3xl sm:rounded-t-none h-48 sm:h-full flex flex-col items-center justify-center p-4 md:p-8">
            <div className="h-32 w-32 sm:h-40 sm:w-40 md:h-72 md:w-72 mb-4 bg-white rounded-full flex items-center justify-center">
              <img
                src="/images/gkcc.png"
                alt="Loading Image"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <p className="text-center text-blue-500 text-3xl md:text-4xl font-bold mt-4">
              We Serve Better Together
            </p>
          </div>

          {/* Right Section */}
          <div className="flex-1 p-4 md:p-10 flex flex-col items-center justify-center">
            <h2 className="text-2xl sm:text-4xl md:text-4xl lg:text-5xl text-blue-500 font-semibold mb-4 ">
              Welcome
            </h2>
            <h5 className="text-base sm:text-lg md:text-xl text-black font-semibold mb-4">
              Login With GKCC-ID
            </h5>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleLogin} className="w-full sm:w-4/5">
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md shadow-lg focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-300"
              >
                <option value="member">Member</option>
                <option value="vendor">Vendor</option>
              </select>
              <input
                type="text"
                placeholder="GKCC ID"
                value={gkccId}
                onChange={(e) => setGkccId(e.target.value)}
                className="w-full p-2 mb-4 placeholder-gray-500 border border-gray-300 rounded-md shadow-lg focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-300 focus:text-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-4 placeholder-gray-500 border border-gray-300 rounded-md shadow-lg focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-300 focus:text-blue-500"
              />
              <button className="w-full py-3 mt-4 bg-blue-500 text-white rounded-md shadow-lg">
                Log In
              </button>
            </form>
            <h5 className="mt-4 text-sm sm:text-md text-gray-500">
              Don&apos;t have an account?
            </h5>
            <Link href="/membership-form">
              <button className="text-sm sm:text-md text-blue-500 mb-3">
                Register here
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
