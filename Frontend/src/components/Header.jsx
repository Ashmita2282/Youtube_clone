import React, { useEffect, useState } from "react";
import { FaSearch, FaUserCircle, FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, getUserData } from "../redux/slices/authSlice"; // Ensure getUserData action is imported
import logo from "../assets/logo.png";
import CreateChannelModal from "../components/CreateChannelModal";

import { useOutletContext } from "react-router-dom";


const Header = ({ onSearch, toggleSidebar, isOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  console.log("User ", user);
  console.log("User DAta id", user?.data?.id);

  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [showModal, setShowModal] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const toggleModal = () => setShowModal(!showModal);

  // Handle user logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search on button click or Enter key press
  const handleSearch = () => {
    onSearch(searchTerm); // Pass search term to parent component
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Trigger search when Enter key is pressed
    }
  };

  useEffect(() => {
    // Fetch user data if token exists
    if (token) {
      dispatch(getUserData());
    }
  }, [dispatch, token]);

  // Check if the user has a channel

  const hasChannel = user?.data?.channel?._id;
  const channelData = {
    channelId: user?.data?.channel?._id,
    channelName: user?.data?.channel?.channelName,
    channelBanner: user?.data?.channel?.channelBanner,
    description: user?.data?.channel?.description,
  };

  return (
    <header className="flex items-center justify-between h-20 bg-white p-4 ml-0 z-50 fixed w-full">
      {/* Hamburger Menu Icon AND LOGO */}
      <div className="flex flex-row items-cente ml-1">
        <button onClick={toggleSidebar} className="pr-5">
          <FaBars size={24} className="text-gray-600 " />
        </button>

        {/* Logo */}
        <img src={logo} alt="Logo" className="h-16 w-36" />
      </div>

      {/* Search Bar */}
      <div className="flex items-center rounded-full w-1/2 p-2 border">
        <input
          type="text"
          className="hidden lg:block w-full p-2 bg-transparent outline-none text-sm"
          placeholder="Search"
          value={searchTerm} // Bind the input to searchTerm state
          onChange={handleSearchChange} // Update searchTerm when input changes
          onKeyPress={handleKeyPress} // Trigger search on Enter key press
        />
        <button className="rounded-r-lg" onClick={handleSearch}>
          <FaSearch className="text-gray-500 text-lg cursor-pointer" />
        </button>
      </div>

      {/* User Profile Section */}
      {token ? (
        <div className="relative">
          <div
            onClick={toggleDropdown}
            className="flex items-center space-x-4 cursor-pointer"
          >
            <img
              src={
                user?.data?.profilePic || (
                  <FaUserCircle className="text-red-600 text-2xl" />
                )
              }
              className="h-12 w-12 object-cover rounded-full"
              alt="Profile"
            />
            <p>{user?.data?.name || "Profile"}</p>
          </div>
          {showDropdown && (
            <div
              className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-50"
              style={{ zIndex: 9999 }}
            >
              <div className="p-4 border-b">
                <p className="font-semibold">{user?.data?.name || "User"}</p>
                <p className="text-sm text-gray-600">{user?.data?.email}</p>
              </div>
              <ul className="py-2">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("#")}
                >
                  Profile
                </li>
                {/* Conditionally render 'Create Channel' or 'Open Channel' */}
                {hasChannel ? (
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      navigate(`/channel/${channelData.channelId}`, {
                        state: {
                          channelName: channelData.channelName,
                          channelBanner: channelData.channelBanner,
                          description: channelData.description,
                        },
                      })
                    }
                  >
                    Open Channel
                  </li>
                ) : (
                  <button
                    onClick={toggleModal}
                    className="text-blue-600 hover:underline"
                  >
                    Create a channel
                  </button>
                )}
                <CreateChannelModal
                  showModal={showModal}
                  toggleModal={toggleModal}
                />
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("#")}
                >
                  Settings
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Sign out
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/signin"
          className="text-red-600 hover:underline flex items-center space-x-4"
        >
          <FaUserCircle className="text-red-600 text-2xl" />
          <p>Sign In</p>
        </Link>
      )}
    </header>
  );
};

export default Header;

// import React, { useState } from "react";
// import { FaSearch, FaUserCircle } from "react-icons/fa";
// import logo from "../assets/logo.png";
// import { Link } from "react-router-dom";

// const Header = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulating login state
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   const toggleDropdown = () => setShowDropdown(!showDropdown);
//   const toggleModal = () => setShowModal(!showModal);

//   return (
//     <>
//       <header className="flex items-center z-10 justify-between bg-white p-4 shadow-md fixed w-full lg:w-[95%]">
//         {/* Left side: YouTube Logo */}
//         <div className="flex items-center lg:space-x-4">
//           <img src={logo} alt="Logo" className="h-16 w-36" />
//         </div>

//         {/* Center: Search Bar */}
//         <div className="flex items-center rounded-full w-1/2 p-2 border ">
//           <input
//             type="text"
//             className="hidden lg:block w-full p-2 bg-transparent outline-none text-sm"
//             placeholder="Search"
//           />
//           <button className="rounded-r-lg">
//             <FaSearch className="text-gray-500 text-lg cursor-pointer" />
//           </button>
//         </div>

//         {/* Right side: User Avatar */}
//         {isLoggedIn ? (
//           <div className="relative">
//             <div
//               onClick={toggleDropdown}
//               className="hidden lg:flex items-center space-x-4 ml-10 border rounded-xl p-2 m-2 cursor-pointer"
//             >
//               <FaUserCircle className="text-red-600 text-2xl" />
//               <p>Profile</p>
//             </div>
//             {showDropdown && (
//               <div
//                 className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-50 overflow-y-auto max-h-80"
//                 style={{ zIndex: 1000 }}
//               >
//                 <div className="p-4 border-b">
//                   <p className="font-semibold">Avatar XYZ</p>
//                   <p className="text-sm text-gray-600">xyz@gmail.com</p>
//                   <button
//                     onClick={() => {
//                       toggleModal();
//                       setShowDropdown(false); // Close dropdown when opening modal
//                     }}
//                     className="text-blue-600 hover:underline"
//                   >
//                     Create a channel
//                   </button>
//                 </div>
//                 {/* Dropdown items */}
//                 <ul className="py-2">
//                   <li className="px-4 py-2 hover:bg-gray-100">
//                     Google Account
//                   </li>
//                   <li className="px-4 py-2 hover:bg-gray-100">
//                     Switch account
//                   </li>
//                   <li className="px-4 py-2 hover:bg-gray-100">Sign out</li>
//                   {/* Additional dropdown options */}
//                 </ul>
//               </div>
//             )}
//           </div>
//         ) : (
//           <Link to="/signin" className="text-red-600 hover:underline">
//             <div className="hidden lg:flex items-center space-x-4 ml-10 border rounded-xl p-2 m-2">
//               <FaUserCircle className="text-red-600 text-2xl cursor-pointer" />
//               <p>Sign In</p>
//             </div>
//           </Link>
//         )}
//       </header>

//     </>
//   );
// };

// export default Header;
