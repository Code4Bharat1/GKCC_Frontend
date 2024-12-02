// src/app/member-profile/page.jsx
"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For navigation and reload in mobile menu
import { IoMenu, IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isManagementDropdownOpen, setIsManagementDropdownOpen] =
    useState(false);
    const [isAboutDropdownOpen, setIsAboutDropdownOpen] =
    useState(false);
  const [profileRoute, setProfileRoute] = useState("/profile"); // State for profile route
  const router = useRouter(); // Initialize router

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    setIsDropdownOpen(false);
    setIsManagementDropdownOpen(false);
    setIsAboutDropdownOpen(false);
  };
  

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
    setActiveTab(""); // Ensure the active ball is hidden when opening the dropdown
    if (!isDropdownOpen) {
      setIsManagementDropdownOpen(false);
      setIsAboutDropdownOpen(false);
    }
  };

  const toggleManagementDropdown = () => {
    setIsManagementDropdownOpen((prev) => !prev);
    setActiveTab(""); // Ensure the active ball is hidden when opening the dropdown
    if (!isManagementDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  const toggleAboutDropdown = () => {
    setIsAboutDropdownOpen((prev) => !prev);
    setActiveTab(""); // Ensure the active ball is hidden when opening the dropdown
    if (!isAboutDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };
  const handleTabClick = (tabName) => {
    const tabsWithActiveBall = [
      "Home",
      "aboutus",
      "Vendors",
      "Member Association",
      "News Letter",
      "Media",
    ];
    if (tabsWithActiveBall.includes(tabName)) {
      setActiveTab(tabName);
      localStorage.setItem("activeTab", tabName);
    } else {
      setActiveTab("");
      localStorage.removeItem("activeTab");
    }

    setIsManagementDropdownOpen(false);
    setIsAboutDropdownOpen(false);
    setIsDropdownOpen(false);
  };

  const handleMobileLinkClick = (path, tabName) => {
    handleTabClick(tabName);
    router.push(path);
    setIsOpen(false); // Close the mobile menu after navigation
  };

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    const tabsWithActiveBall = [
      "Home",
      "About-GKCC",
      "Vendors",
      "Member Association",
      "Newsletter",
      "Media",
    ];
    if (savedTab && tabsWithActiveBall.includes(savedTab)) {
      setActiveTab(savedTab);
    }
    const loggedInStatus = localStorage.getItem("token");
    if (loggedInStatus) {
      setIsLoggedIn(true);
    }

    // Determine profile route based on user type
    const userType = localStorage.getItem("user");
    if (userType === "member") {
      setProfileRoute("/member-profile");
    } else if (userType === "vendor") {
      setProfileRoute("/vendor-profile");
    } else {
      setProfileRoute("/profile");
    }

    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".nav-item") &&
        !event.target.closest(".nav-button")
      ) {
        setIsDropdownOpen(false);
        setIsManagementDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    handleTabClick("Logout");
  };

  return (
    <>
      <div className="w-full px-5 py-4 lg:px-5 lg:h-[12vh] flex justify-between items-center shadow-md fixed top-0 z-50 bg-white">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Link href="/" onClick={() => handleTabClick("Home")}>
            <Image
              src="/images/gkcclogo.png"
              alt="Logo"
              width={80}
              height={80}
              className="nav-logo"
            />
          </Link>
          <Link href="/" onClick={() => handleTabClick("Home")}>
            <span className="text-xs lg:text-[1vw] font-bold cursor-pointer">
              Global Kokani Committees&apos; Council
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center ">
          <button onClick={toggleMenu} className="text-3xl">
            {isOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-row gap-8 items-center">
          <Link
            href="/"
            onClick={() => handleTabClick("Home")}
            className="nav-item flex flex-col items-center relative cursor-pointer p-2 lg:p-0"
          >
            <h3
              className={`font-medium text-base lg:text-[1vw] ${
                activeTab === "Home" ? "text-[#1A8FE3]" : ""
              }`}
            >
              Home
            </h3>
            {activeTab === "Home" && (
              <div className="w-2 h-2 lg:w-[.5vw] lg:h-[.5vw] bg-[#1A8FE3] rounded-full absolute top-10 lg:top-8"></div>
            )}
          </Link>
          
          {/* <Link
            href="/aboutus"
            onClick={() => handleTabClick("aboutus")}
            className="nav-item flex flex-col items-center relative cursor-pointer p-2 lg:p-0"
          >
            <h3
              className={`font-medium text-base lg:text-[1vw] ${
                activeTab === "aboutus" ? "text-[#1A8FE3]" : ""
              }`}
            >
              About GKCC
            </h3>
            {activeTab === "aboutus" && (
              <div className="w-2 h-2 lg:w-[.5vw] lg:h-[.5vw] bg-[#1A8FE3] rounded-full absolute top-10 lg:top-8"></div>
            )}
          </Link> */}
          <div className="relative">
            <div
              onClick={toggleAboutDropdown}
              className="nav-item flex flex-col items-center relative cursor-pointer p-2 lg:p-0"
            >
              <h3 className="font-medium text-base lg:text-[1vw]">
                  About Gkcc <IoIosArrowDown className="inline ml-1" />
              </h3>
            </div>
            {isAboutDropdownOpen && (
              <div className="absolute top-[150%] left-0 mt-2 w-64 bg-white border border-black rounded-lg shadow-lg z-50 overflow-hidden">
                <Link
                  href="/aboutus/vission"
                  className="block px-4 py-2 text-black hover:bg-black hover:text-white"
                  onClick={() => handleTabClick("aboutGKCC")}
                >
                  vission Mission
                </Link>
                <Link
                  href="/aboutus/vission"
                  className="block px-4 py-2 text-black hover:bg-black hover:text-white"
                  onClick={() => handleTabClick("Management")}
                >
                 core value
                </Link>
                <Link
                  href="/aboutus/vission"
                  className="block px-4 py-2 text-black hover:bg-black hover:text-white"
                  onClick={() => handleTabClick("Management")}
                >
                  what we do 
                </Link>
                
              </div>
            )}
          </div>

          
          <Link
            href="/vendors"
            onClick={() => handleTabClick("Vendors")}
            className="nav-item flex flex-col items-center relative cursor-pointer p-2 lg:p-0"
          >
            <h3
              className={`font-medium text-base lg:text-[1vw] ${
                activeTab === "Vendors" ? "text-[#1A8FE3]" : ""
              }`}
            >
              Our Vendors
            </h3>
            {activeTab === "Vendors" && (
              <div className="w-2 h-2 lg:w-[.5vw] lg:h-[.5vw] bg-[#1A8FE3] rounded-full absolute top-10 lg:top-8"></div>
            )}
          </Link>

          <Link
            href="/member-association"
            onClick={() => handleTabClick("Member Association")}
            className="nav-item flex flex-col items-center relative cursor-pointer p-2 lg:p-0"
          >
            <h3
              className={`font-medium text-base lg:text-[1vw] ${
                activeTab === "Member Association" ? "text-[#1A8FE3]" : ""
              }`}
            >
              Member Association
            </h3>
            {activeTab === "Member Association" && (
              <div className="w-2 h-2 lg:w-[.5vw] lg:h-[.5vw] bg-[#1A8FE3] rounded-full absolute top-10 lg:top-8"></div>
            )}
          </Link>

          <Link
            href="/newsletter"
            onClick={() => handleTabClick("News Letter")}
            className="nav-item flex flex-col items-center relative cursor-pointer p-2 lg:p-0"
          >
            <h3
              className={`font-medium text-base lg:text-[1vw] ${
                activeTab === "News Letter" ? "text-[#1A8FE3]" : ""
              }`}
            >
              News Letter
            </h3>
            {activeTab === "News Letter" && (
              <div className="w-2 h-2 lg:w-[.5vw] lg:h-[.5vw] bg-[#1A8FE3] rounded-full absolute top-10 lg:top-8"></div>
            )}
          </Link>

          <Link
            href="/media"
            onClick={() => handleTabClick("Media")}
            className="nav-item flex flex-col items-center relative cursor-pointer p-2 lg:p-0"
          >
            <h3
              className={`font-medium text-base lg:text-[1vw] ${
                activeTab === "Media" ? "text-[#1A8FE3]" : ""
              }`}
            >
              Media
            </h3>
            {activeTab === "Media" && (
              <div className="w-2 h-2 lg:w-[.5vw] lg:h-[.5vw] bg-[#1A8FE3] rounded-full absolute top-10 lg:top-8"></div>
            )}
          </Link>

          {/* Management Dropdown */}
          <div className="relative">
            <div
              onClick={toggleManagementDropdown}
              className="nav-item flex flex-col items-center relative cursor-pointer p-2 lg:p-0"
            >
              <h3 className="font-medium text-base lg:text-[1vw]">
                Management <IoIosArrowDown className="inline ml-1" />
              </h3>
            </div>
            {isManagementDropdownOpen && (
              <div className="absolute top-[150%] left-0 mt-2 w-64 bg-white border border-black rounded-lg shadow-lg z-50 overflow-hidden">
                <Link
                  href="/managements/office-bearers"
                  className="block px-4 py-2 text-black hover:bg-black hover:text-white"
                  onClick={() => handleTabClick("Management")}
                >
                  Office Bearers
                </Link>
                <Link
                  href="/managements/executive-managers"
                  className="block px-4 py-2 text-black hover:bg-black hover:text-white"
                  onClick={() => handleTabClick("Management")}
                >
                  Executive Managers
                </Link>
                <Link
                  href="/managements/coordination-committees"
                  className="block px-4 py-2 text-black hover:bg-black hover:text-white"
                  onClick={() => handleTabClick("Management")}
                >
                  Coordination Committees
                </Link>
                <Link
                  href="/managements/advisors"
                  className="block px-4 py-2 text-black hover:bg-black hover:text-white"
                  onClick={() => handleTabClick("Management")}
                >
                  Advisors
                </Link>
              </div>
            )}
          </div>

          {/* Auth Section */}
          <div className="flex gap-2 relative">
            {isLoggedIn ? (
              <>
                <Link
                  href={profileRoute}
                  className="px-5 py-1 lg:px-10 lg:py-2 border-2 border-[#1A8FE3] text-[#1a8fe3] rounded-full hover:bg-[#1A8FE3] hover:text-white text-base lg:text-[1vw] nav-button"
                  onClick={() => handleTabClick("Profile")}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-5 py-1 lg:px-10 lg:py-2 border-2 border-[#1A8FE3] text-[#1a8fe3] rounded-full hover:bg-[#1A8FE3] hover:text-white text-base lg:text-[1vw] nav-button"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <div
                  className="px-5 py-1 lg:px-10 lg:py-2 border-2 border-[#1A8FE3] text-[#1a8fe3] rounded-full hover:bg-[#1A8FE3] hover:text-white text-base lg:text-[1vw] nav-button cursor-pointer relative"
                  onClick={toggleDropdown}
                >
                  Register <IoIosArrowDown className="inline ml-1" />
                  {isDropdownOpen && (
                    <div className="absolute top-[110%] left-0 mt-2 w-64 bg-white border border-[#1A8FE3] rounded-lg shadow-lg z-50 overflow-hidden">
                      <Link
                        href="/association-form"
                        className="block px-4 py-2 text-[#1a8fe3] hover:bg-[#1A8FE3] hover:text-white"
                        onClick={() => handleTabClick("Register")}
                      >
                        Association Membership
                      </Link>
                      <Link
                        href="/membership-form"
                        className="block px-4 py-2 text-[#1a8fe3] hover:bg-[#1A8FE3] hover:text-white"
                        onClick={() => handleTabClick("Register")}
                      >
                        Individual Membership
                      </Link>
                      <Link
                        href="/vendor-form"
                        className="block px-4 py-2 text-[#1a8fe3] hover:bg-[#1A8FE3] hover:text-white"
                        onClick={() => handleTabClick("Register")}
                      >
                        Vendors Membership
                      </Link>
                    </div>
                  )}
                </div>
                <Link
                  href="/login-form"
                  className="px-5 py-1 lg:px-10 lg:py-2 border-2 border-[#1A8FE3] text-[#1a8fe3] rounded-full hover:bg-[#1A8FE3] hover:text-white text-base lg:text-[1vw] nav-button"
                  onClick={() => handleTabClick("Login")}
                >
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden flex flex-col items-start bg-white gap-5 top-0 left-0 px-10 fixed inset-0 z-50 overflow-y-auto">
            {/* Menu Text and Close Button */}
            <div className="flex justify-between items-center w-full py-4">
              {/* Menu Text */}
              <div className="text-lg font-bold">Menu</div>

              {/* Close Button */}
              <button onClick={toggleMenu} className="text-3xl">
                <IoClose />
              </button>
            </div>

            {/* Mobile Menu Links */}
            <Link
              href="/"
              onClick={() => handleMobileLinkClick("/", "Home")}
              className="nav-item"
            >
              <h3 className="font-medium text-lg">Home</h3>
            </Link>
            <Link
              href="/aboutus"
              onClick={() => handleMobileLinkClick("/aboutus")}
              className="nav-item"
            >
              <h3 className="font-medium text-lg">About-GKCC</h3>
            </Link>
            <Link
              href="/vendors"
              onClick={() => handleMobileLinkClick("/vendors", "Vendors")}
              className="nav-item"
            >
              <h3 className="font-medium text-lg">Our Vendors</h3>
            </Link>
            <Link
              href="/member-association"
              onClick={() =>
                handleMobileLinkClick(
                  "/member-association",
                  "Member Association"
                )
              }
              className="nav-item"
            >
              <h3 className="font-medium text-lg">Member Association</h3>
            </Link>

            {/* Management Dropdown in Mobile */}
            <div className="relative w-full">
              <div
                onClick={toggleManagementDropdown}
                className="nav-item flex flex-col relative cursor-pointer"
              >
                <h3 className="font-medium text-lg">
                  Management <IoIosArrowDown className="inline ml-1" />
                </h3>
              </div>
              {isManagementDropdownOpen && (
                <div className="absolute top-[50%] left-0 mt-2 w-full bg-white border border-black rounded-lg shadow-lg z-50 overflow-hidden">
                  <Link
                    href="/managements/office-bearers"
                    className="block px-4 py-2 text-black hover:bg-black hover:text-white"
                    onClick={() =>
                      handleMobileLinkClick(
                        "/managements/office-bearers",
                        "Management"
                      )
                    }
                  >
                    Office Bearers
                  </Link>
                  <Link
                    href="/managements/executive-managers"
                    className="block px-4 py-2 text-black hover:bg-black hover:text-white"
                    onClick={() =>
                      handleMobileLinkClick(
                        "/managements/executive-managers",
                        "Management"
                      )
                    }
                  >
                    Executive Managers
                  </Link>
                  <Link
                    href="/managements/coordination-committees"
                    className="block px-4 py-2 text-black hover:bg-black hover:text-white"
                    onClick={() =>
                      handleMobileLinkClick(
                        "/managements/coordination-committees",
                        "Management"
                      )
                    }
                  >
                    Coordination Committees
                  </Link>
                  <Link
                    href="/managements/advisors"
                    className="block px-4 py-2 text-black hover:bg-black hover:text-white"
                    onClick={() =>
                      handleMobileLinkClick(
                        "/managements/advisors",
                        "Management"
                      )
                    }
                  >
                    Advisors
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Auth Section */}
            <div className="flex flex-col gap-5 w-full">
              {isLoggedIn ? (
                <>
                  <Link
                    href={profileRoute}
                    className="block w-full text-center px-4 py-2 border-2 border-[#1A8FE3] text-[#1a8fe3] rounded-lg hover:bg-[#1A8FE3] hover:text-white text-base"
                    onClick={() =>
                      handleMobileLinkClick(profileRoute, "Profile")
                    }
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-center px-4 py-2 border-2 border-[#1A8FE3] text-[#1a8fe3] rounded-lg hover:bg-[#1A8FE3] hover:text-white text-base"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/association-form"
                    className="block w-full text-center px-4 py-2 border-2 border-[#1A8FE3] text-[#1a8fe3] rounded-lg hover:bg-[#1A8FE3] hover:text-white text-base"
                    onClick={() =>
                      handleMobileLinkClick("/association-form", "Register")
                    }
                  >
                    Association Membership
                  </Link>
                  <Link
                    href="/membership-form"
                    className="block w-full text-center px-4 py-2 border-2 border-[#1A8FE3] text-[#1a8fe3] rounded-lg hover:bg-[#1A8FE3] hover:text-white text-base"
                    onClick={() =>
                      handleMobileLinkClick("/membership-form", "Register")
                    }
                  >
                    Individual Membership
                  </Link>
                  <Link
                    href="/vendor-form"
                    className="block w-full text-center px-4 py-2 border-2 border-[#1A8FE3] text-[#1a8fe3] rounded-lg hover:bg-[#1A8FE3] hover:text-white text-base"
                    onClick={() =>
                      handleMobileLinkClick("/vendor-form", "Register")
                    }
                  >
                    Vendors Membership
                  </Link>
                  <Link
                    href="/login-form"
                    className="block w-full text-center px-4 py-2 border-2 border-[#1A8FE3] text-[#1a8fe3] rounded-lg hover:bg-[#1A8FE3] hover:text-white text-base"
                    onClick={() =>
                      handleMobileLinkClick("/login-form", "Login")
                    }
                  >
                    Log in
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
