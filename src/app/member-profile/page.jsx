// src/app/member-profile/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaEdit,
  FaBars,
  FaHome,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import Navbar from "@/components/layouts/navbar/Navbar";
import axios from "axios"; // For making requests to the backend
import { ToastContainer, toast } from "react-toastify"; // Import React Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const Profile = () => {
  const [userData, setUserData] = useState(null); // To hold fetched user data
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPopup, setShowPopup] = useState(true); // State for popup
  const [children, setChildren] = useState([]); // To manage children names

  // Define display fields with labels
  const displayFields = [
    { key: "GKCCId", label: "GKCC ID" },
    { key: "firstName", label: "First Name" },
    { key: "middleName", label: "Middle Name" },
    { key: "familyName", label: "Family Name" },
    { key: "gender", label: "Gender" },
    { key: "dob", label: "Date of Birth" },
    { key: "bloodGroup", label: "Blood Group" },
    { key: "maritalStatus", label: "Marital Status" },
    { key: "education", label: "Education" },
    { key: "email", label: "Email" },
    { key: "mobileNumber", label: "Mobile Number" },
    { key: "whatsappNumber", label: "WhatsApp Number" },
    { key: "fatherName", label: "Father Name" },
    { key: "motherName", label: "Mother Name" },
    { key: "spouseName", label: "Spouse Name" },
    { key: "area", label: "Area" },
    { key: "district", label: "District" },
    { key: "nativeBlock", label: "Native Block" },
    { key: "nativeCity", label: "Native City" },
    { key: "nativeFlat", label: "Native Flat" },
    { key: "nativePincode", label: "Native Pincode" },
    { key: "nativeState", label: "Native State" },
    { key: "internationalBlock", label: "International Block" },
    { key: "internationalCity", label: "International City" },
    { key: "internationalFlat", label: "International Flat" },
    { key: "internationalPostalCode", label: "International Postal Code" },
    {
      key: "internationalStateProvince",
      label: "International State/Province",
    },
    {
      key: "internationalStreetAddress",
      label: "International Street Address",
    },
    { key: "status", label: "Status" },
  ];

  // Define which fields are non-editable
  const nonEditableFields = ["GKCCId", "association", "status"];

  // Define options for enum fields
  const genderOptions = ["Male", "Female", "Other"];
  const bloodGroupOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];

  // Fetch user data from backend when component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Retrieve the token and GKCCId from localStorage
        const token = localStorage.getItem("token");
        const GKCCId = localStorage.getItem("GKCCId");

        if (!token || !GKCCId) {
          toast.error("User is not authenticated or GKCCId is missing");
          console.error("User is not authenticated or GKCCId is missing");
          return;
        }

        console.log("Token and GKCCId found. Fetching profile data...");

        // Set token in the Authorization header
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch the member's details using the GKCCId
        const profileResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/member/membership`,
          config
        );

        console.log(profileResponse);
        // If the response doesn't contain the necessary data
        if (!profileResponse.data) {
          toast.error("No data returned from the server.");
          console.error("No data returned from the server.");
          return;
        }

        const { data } = profileResponse.data;

        console.log("Profile data received: ", data);

        // Sanitize spouseName: replace 'N/A' with empty string
        const sanitizedData = {
          ...data,
          spouseName: data.spouseName === "N/A" ? "" : data.spouseName,
          children: data.children || [],
        };

        setUserData(sanitizedData);
        setTempData(sanitizedData); // Initialize tempData for editing
        setChildren(sanitizedData.children.map((child) => child.name));
        calculateCompletion(sanitizedData);
      } catch (error) {
        toast.error("Error fetching profile data. " + error.message);
        console.error("Error fetching profile data", error);
      }
    };

    fetchProfileData();
  }, []);

  // Calculate profile completion percentage
  const calculateCompletion = (data) => {
    const totalFields = displayFields.length; // Total displayable fields
    const filledFields = displayFields.filter((field) => {
      if (field.key === "children") return false; // Exclude 'children' array
      return data[field.key];
    }).length;
    setCompletionPercentage(
      parseFloat(((filledFields / totalFields) * 100).toFixed(0))
    );
  };

  const getCompletionLabel = () => {
    if (completionPercentage >= 100) return "Excellent";
    if (completionPercentage >= 75) return "Good";
    if (completionPercentage >= 50) return "Average";
    return "Needs Improvement";
  };

  const getColor = () => {
    if (completionPercentage >= 100) return "#22c55e"; // Green
    if (completionPercentage >= 75) return "#eab308"; // Yellow
    return "#ef4444"; // Red
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: value });

    if (name === "maritalStatus") {
      if (value === "Single") {
        setTempData({ ...tempData, spouseName: "", children: [] });
        setChildren([]);
      }
    }
  };

  const handleChildrenChange = (index, value) => {
    const updatedChildren = [...children];
    updatedChildren[index] = value;
    setChildren(updatedChildren);
    setTempData({
      ...tempData,
      children: updatedChildren.map((child) => ({ name: child })),
    });
  };

  const addChild = () => {
    setChildren([...children, ""]);
  };

  const removeChild = (index) => {
    const updatedChildren = [...children];
    updatedChildren.splice(index, 1);
    setChildren(updatedChildren);
    setTempData({
      ...tempData,
      children: updatedChildren.map((child) => ({ name: child })),
    });
  };

  const handleSaveChanges = () => {
    setShowConfirmation(true); // Show confirmation before saving
  };

  // Save the changes by sending updated data to the backend
  const confirmSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/member/updateMember`,
        tempData,
        config
      ); // Update with GKCCId
      setUserData(tempData); // Save the changes
      setChildren(tempData.children.map((child) => child.name));
      calculateCompletion(tempData); // Recalculate completion
      setEditMode(false); // Exit edit mode
      setShowConfirmation(false); // Hide confirmation modal
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating user data", error);
      toast.error("Error updating profile. Please try again later.");
    }
  };

  const cancelSave = () => {
    setShowConfirmation(false); // Hide confirmation modal
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup
  };

  // Handle Loading States
  if (!userData || displayFields.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-800 p-4">
        Loading...
      </div>
    );
  }

  // Helper function to format label from field key
  const formatLabel = (label) => {
    // Convert camelCase or snake_case to Title Case
    const result = label
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
    return result;
  };

  // Helper function to check if a field is a date field
  const isDateField = (label) => {
    const dateFields = ["dob", "createdAt", "updatedAt"];
    return dateFields.includes(label);
  };

  // Get current marital status to conditionally render spouse and children
  const currentMaritalStatus = editMode
    ? tempData.maritalStatus
    : userData.maritalStatus;
  const showSpouseAndChildren = currentMaritalStatus !== "Single";

  return (
    <>
      {/* Toast Container for React Toastify */}
      <ToastContainer />

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/3">
            <h2 className="text-4xl sm:text-5xl text-blue-500 font-bold mb-4">
              Welcome!
            </h2>
            <p className="text-xl sm:text-2xl mb-2 font-bold">
              Name: {userData.firstName} {userData.familyName}
            </p>
            <p className="text-lg sm:text-xl mb-4">
              GKCC ID: {userData.GKCCId}
            </p>
            <p className="text-md sm:text-lg mb-4">
              Profile Completion: {completionPercentage}%
            </p>
            <div className="relative mb-4 w-32 h-32 sm:w-40 sm:h-40 mx-auto">
              {/* Responsive SVG with viewBox */}
              <svg
                viewBox="0 0 160 160"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="text-gray-300"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="60"
                  cx="80"
                  cy="80"
                />
                <circle
                  className="text-indigo-600"
                  strokeWidth="8"
                  strokeLinecap="round"
                  stroke={getColor()}
                  fill="transparent"
                  r="60"
                  cx="80"
                  cy="80"
                  strokeDasharray="376.99"
                  strokeDashoffset={
                    376.99 - (376.99 * completionPercentage) / 100
                  }
                />
              </svg>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    {completionPercentage}%
                  </h3>
                  <p className="text-sm sm:text-md text-gray-600">
                    {getCompletionLabel()}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={closePopup}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="min-h-screen flex flex-col lg:flex-row mt-24">
        <Navbar />

        {/* Sidebar */}
        <div className="w-full lg:w-1/6 bg-blue-500 text-white p-6 mr-6">
          <div className="flex items-center space-x-3">
            <FaUserCircle size={32} />
            <span className="text-2xl font-semibold">My Profile</span>
          </div>
          <ul className="space-y-4 mt-10">
            <li>
              <a
                href="/"
                className="flex items-center space-x-2 hover:text-blue-500 bg-white text-black p-3 rounded-xl transition duration-300"
              >
                <FaHome />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/transactions"
                className="flex items-center space-x-2 hover:text-blue-500 bg-white text-black p-3 rounded-xl transition duration-300"
              >
                <FaBars />
                <span>Transactions</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-100 flex flex-col lg:flex-row p-4">
          {/* Circular Progress Bar */}
          <div className="w-full lg:w-1/5 mb-10 lg:mb-0 lg:pr-6">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
                Profile Completion
              </h2>
              <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                {/* Responsive SVG with viewBox */}
                <svg
                  viewBox="0 0 160 160"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="text-gray-300"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="60"
                    cx="80"
                    cy="80"
                  />
                  <circle
                    className="text-indigo-600"
                    strokeWidth="8"
                    strokeLinecap="round"
                    stroke={getColor()}
                    fill="transparent"
                    r="60"
                    cx="80"
                    cy="80"
                    strokeDasharray="376.99"
                    strokeDashoffset={
                      376.99 - (376.99 * completionPercentage) / 100
                    }
                  />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                      {completionPercentage}%
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {getCompletionLabel()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="w-full lg:w-4/5">
            {!editMode ? (
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-blue-500">
                    Member Details
                  </h2>
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-indigo-700"
                  >
                    <FaEdit />
                    <span>Edit Profile</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {displayFields.map((field) => {
                    // Conditional rendering: hide spouseName if maritalStatus is Single
                    if (
                      field.key === "spouseName" &&
                      userData.maritalStatus === "Single"
                    ) {
                      return null;
                    }

                    // Status field is displayed but not editable
                    if (field.key === "status") {
                      return (
                        <div
                          key={field.key}
                          className="bg-gray-100 p-4 rounded-lg shadow border border-gray-300 flex flex-col justify-center h-24"
                        >
                          <p className="text-gray-600 text-sm uppercase">
                            {field.label}
                          </p>
                          <p className="text-lg font-semibold text-blue-800">
                            {userData[field.key] || "N/A"}
                          </p>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={field.key}
                        className="bg-gray-100 p-4 rounded-lg shadow border border-gray-300 flex flex-col justify-center h-24"
                      >
                        <p className="text-gray-600 text-sm uppercase">
                          {field.label}
                        </p>
                        <p className="text-lg font-semibold text-blue-800">
                          {isDateField(field.key)
                            ? new Date(userData[field.key]).toLocaleDateString()
                            : Array.isArray(userData[field.key])
                            ? userData[field.key].length > 0
                              ? userData[field.key]
                                  .map((child) => child.name)
                                  .join(", ")
                              : "N/A"
                            : userData[field.key] || "N/A"}
                        </p>
                      </div>
                    );
                  })}

                  {/* Conditional rendering for children */}
                  {userData.maritalStatus !== "Single" &&
                    userData.children.length > 0 && (
                      <div className="bg-gray-100 p-4 rounded-lg shadow border border-gray-300 col-span-1 sm:col-span-2">
                        <p className="text-gray-600 text-sm uppercase mb-2">
                          Children
                        </p>
                        <ul className="list-disc list-inside">
                          {userData.children.map((child, index) => (
                            <li key={index}>{child.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
                  Edit User Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {displayFields.map((field) => {
                    // In edit mode, skip rendering spouseName and children via map
                    if (editMode) {
                      if (
                        field.key === "spouseName" ||
                        field.key === "children"
                      ) {
                        return null;
                      }
                    } else {
                      // In view mode, spouseName is conditionally rendered above
                      if (
                        field.key === "spouseName" &&
                        userData.maritalStatus === "Single"
                      ) {
                        return null;
                      }
                      if (
                        field.key === "children" &&
                        userData.maritalStatus === "Single"
                      ) {
                        return null;
                      }
                    }

                    if (field.key === "status") {
                      // Status field cannot be changed
                      return (
                        <div
                          key={field.key}
                          className="bg-gray-100 p-4 rounded-lg shadow border border-gray-300 flex flex-col justify-center h-24"
                        >
                          <p className="text-gray-600 text-sm uppercase">
                            {field.label}
                          </p>
                          <p className="text-lg font-semibold text-blue-800">
                            {userData[field.key] || "N/A"}
                          </p>
                        </div>
                      );
                    }

                    if (nonEditableFields.includes(field.key)) {
                      return (
                        <div key={field.key} className="flex flex-col">
                          <label className="text-gray-600 text-sm uppercase mb-1">
                            {field.label}
                          </label>
                          <input
                            type="text"
                            name={field.key}
                            value={userData[field.key] || ""}
                            disabled
                            className="border bg-gray-200 p-3 rounded-lg focus:outline-none"
                          />
                        </div>
                      );
                    }

                    return (
                      <div key={field.key} className="flex flex-col">
                        <label className="text-gray-600 text-sm uppercase mb-1">
                          {field.label}
                        </label>
                        {field.key === "gender" ? (
                          <select
                            name="gender"
                            value={tempData.gender}
                            onChange={handleEditChange}
                            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="">Select Gender</option>
                            {genderOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : field.key === "bloodGroup" ? (
                          <select
                            name="bloodGroup"
                            value={tempData.bloodGroup}
                            onChange={handleEditChange}
                            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="">Select Blood Group</option>
                            {bloodGroupOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : field.key === "maritalStatus" ? (
                          <select
                            name="maritalStatus"
                            value={tempData.maritalStatus}
                            onChange={handleEditChange}
                            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="">Select Marital Status</option>
                            {maritalStatusOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={
                              field.key.toLowerCase().includes("password")
                                ? "password"
                                : field.key.toLowerCase().includes("dob")
                                ? "date"
                                : "text"
                            }
                            name={field.key}
                            value={tempData[field.key] || ""}
                            onChange={handleEditChange}
                            placeholder={field.label}
                            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        )}
                      </div>
                    );
                  })}

                  {/* Conditional rendering for spouseName */}
                  {showSpouseAndChildren && (
                    <div className="flex flex-col sm:col-span-2">
                      <label className="text-gray-600 text-sm uppercase mb-1">
                        Spouse Name
                      </label>
                      <input
                        type="text"
                        name="spouseName"
                        value={tempData.spouseName || ""}
                        onChange={handleEditChange}
                        placeholder="Spouse Name"
                        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  )}

                  {/* Conditional rendering for children */}
                  {showSpouseAndChildren && (
                    <div className="flex flex-col sm:col-span-2">
                      <label className="text-gray-600 text-sm uppercase mb-1">
                        Children
                      </label>
                      {children.map((child, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            type="text"
                            value={child}
                            onChange={(e) =>
                              handleChildrenChange(index, e.target.value)
                            }
                            placeholder={`Child ${index + 1} Name`}
                            className="flex-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                          <button
                            onClick={() => removeChild(index)}
                            className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            aria-label={`Remove Child ${index + 1}`}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={addChild}
                        className="mt-2 flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                      >
                        <FaPlus />
                        <span>Add Child</span>
                      </button>
                    </div>
                  )}
                </div>
                <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                  <button
                    onClick={handleSaveChanges}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg transition duration-300 hover:bg-green-600"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg transition duration-300 hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Confirmation Modal */}
          {showConfirmation && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3">
                <h2 className="text-xl font-bold mb-4">
                  Are you sure you want to save changes?
                </h2>
                <div className="flex flex-col sm:flex-row justify-between">
                  <button
                    onClick={confirmSave}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4 sm:mb-0"
                  >
                    Yes, Save
                  </button>
                  <button
                    onClick={cancelSave}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
