import React, { useEffect, useState, useRef } from "react";
import { FaSearch, FaUserCircle, FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, getUserData } from "../redux/slices/authSlice";
import logo from "../assets/logo.png";
import CreateChannelModal from "../components/CreateChannelModal";
import create from "../assets/create.png";
import UploadPopup from "./UploadPopup";

const Header = ({ onSearch, toggleSidebar, isOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  const [showPopup, setShowPopup] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (token) {
      dispatch(getUserData());
    }
  }, [dispatch, token]);

  const toggleModal = () => setShowModal(!showModal);

  const hasChannel = user?.data?.channel?._id;
  const channelData = {
    channelId: user?.data?.channel?._id,
    channelName: user?.data?.channel?.channelName,
    channelBanner: user?.data?.channel?.channelBanner,
    description: user?.data?.channel?.description,
  };

  const handleClick = () => {
    if (hasChannel) {
      setShowPopup(true);
    } else {
      toggleModal();
    }
  };

  const handlePopupSubmit = () => {
    setShowPopup(false);
    navigate(`/channel/${channelData.channelId}`, {
      state: channelData,
    });
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showDropdown]);

  return (
    <header className="flex z-50 items-center justify-between h-20 bg-white p-4 fixed w-full shadow-md">
      {/* Sidebar and Logo */}
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="pr-5">
          <FaBars size={24} className="text-gray-600" />
        </button>
        <img src={logo} alt="Logo" className="h-12 w-36" />
      </div>

      {/* Search Bar */}
      <div className="flex items-center rounded-full w-1/2 p-2 border bg-gray-100">
        <input
          type="text"
          className="hidden lg:block w-full p-2 bg-transparent outline-none text-sm"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="rounded-r-lg" onClick={handleSearch}>
          <FaSearch className="text-gray-500 text-lg cursor-pointer" />
        </button>
      </div>

      {/* User Profile Section */}
      {token ? (
        <div className="relative flex items-center space-x-4">
          {hasChannel && (
            <button onClick={handleClick}>
              <img src={create} alt="Create" className="h-8 w-8 mr-3" />
            </button>
          )}
          {showPopup && (
            <UploadPopup
              onClose={() => setShowPopup(false)}
              onSubmit={handlePopupSubmit}
            />
          )}
          <div
            onClick={() => setShowDropdown((prev) => !prev)}
            className="cursor-pointer"
          >
            <img
              src={user?.data?.profilePic || <FaUserCircle />}
              alt="Profile"
              className="h-8 w-8 object-cover rounded-full"
            />
          </div>
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-50"
            >
              <div className="p-4 border-b">
                <p className="font-semibold">{user?.data?.name || "User"}</p>
                <p className="text-sm text-gray-600">{user?.data?.email}</p>
              </div>
              <ul className="py-2">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  {user?.data?.name || "User"}
                </li>
                {hasChannel ? (
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      navigate(`/channel/${channelData.channelId}`, {
                        state: channelData,
                      })
                    }
                  >
                    Open Channel
                  </li>
                ) : (
                  <button
                    onClick={toggleModal}
                    className="text-red-600 hover:underline"
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

// import React, { useEffect, useState } from "react";
// import { FaSearch, FaUserCircle, FaBars } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { logout, getUserData } from "../redux/slices/authSlice";
// import logo from "../assets/logo.png";
// import CreateChannelModal from "../components/CreateChannelModal";
// import create from "../assets/create.png";
// import UploadPopup from "./UploadPopup";

// const Header = ({ onSearch, toggleSidebar, isOpen }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, token } = useSelector((state) => state.auth);

//   const [showPopup, setShowPopup] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     if (token) {
//       dispatch(getUserData());
//     }
//   }, [dispatch, token]);

//   const toggleModal = () => setShowModal(!showModal);

//   const hasChannel = user?.data?.channel?._id;
//   const channelData = {
//     channelId: user?.data?.channel?._id,
//     channelName: user?.data?.channel?.channelName,
//     channelBanner: user?.data?.channel?.channelBanner,
//     description: user?.data?.channel?.description,
//   };

//   // Manage sequence and ensure proper navigation and popup handling
//   const handleClick = () => {
//     if (hasChannel) {
//       setShowPopup(true);
//     } else {
//       toggleModal(); // Open modal to create a channel if none exists
//     }
//   };

//   const handlePopupSubmit = () => {
//     setShowPopup(false);
//     navigate(`/channel/${channelData.channelId}`, {
//       state: channelData,
//     });
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//   };

//   const handleSearch = () => {
//     onSearch(searchTerm);
//   };

//   return (
//     <header className="flex z-50 items-center justify-between h-20 bg-white p-4 fixed w-full shadow-md">
//       {/* Sidebar and Logo */}
//       <div className="flex items-center">
//         <button onClick={toggleSidebar} className="pr-5">
//           <FaBars size={24} className="text-gray-600" />
//         </button>
//         <img src={logo} alt="Logo" className="h-12 w-36" />
//       </div>

//       {/* Search Bar */}
//       <div className="flex items-center rounded-full w-1/2 p-2 border bg-gray-100">
//         <input
//           type="text"
//           className="hidden lg:block w-full p-2 bg-transparent outline-none text-sm"
//           placeholder="Search"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyPress={(e) => e.key === "Enter" && handleSearch()}
//         />
//         <button className="rounded-r-lg" onClick={handleSearch}>
//           <FaSearch className="text-gray-500 text-lg cursor-pointer" />
//         </button>
//       </div>

//       {/* User Profile Section */}
//       {token ? (
//         <div className="relative flex items-center space-x-4">
//           {/* Show 'Create Video' button if channel exists */}
//           {hasChannel && (
//             <button onClick={handleClick}>
//               <img src={create} alt="Create" className="h-8 w-8 mr-3" />
//             </button>
//           )}
//           {/* Upload Popup */}
//           {showPopup && (
//             <UploadPopup
//               onClose={() => setShowPopup(false)}
//               onSubmit={handlePopupSubmit} // Handle after popup submission
//             />
//           )}
//           {/* Profile and Dropdown */}
//           <div
//             onClick={() => setShowDropdown((prev) => !prev)}
//             className="cursor-pointer"
//           >
//             <img
//               src={user?.data?.profilePic || <FaUserCircle />}
//               alt="Profile"
//               className="h-8 w-8 object-cover rounded-full"
//             />
//           </div>
//           {showDropdown && (
//             <div className="absolute right-0 mt-2 w-64 bg-white border rounded-md shadow-lg z-50">
//               <div className="p-4 border-b">
//                 <p className="font-semibold">{user?.data?.name || "User"}</p>
//                 <p className="text-sm text-gray-600">{user?.data?.email}</p>
//               </div>
//               <ul className="py-2">
//                 <li
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                   onClick={() => navigate("/")}
//                 >
//                   Profile
//                 </li>
//                 {hasChannel ? (
//                   <li
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() =>
//                       navigate(`/channel/${channelData.channelId}`, {
//                         state: channelData,
//                       })
//                     }
//                   >
//                     Open Channel
//                   </li>
//                 ) : (
//                   <button
//                     onClick={toggleModal}
//                     className="text-blue-600 hover:underline"
//                   >
//                     Create a channel
//                   </button>
//                 )}
//                 <CreateChannelModal
//                   showModal={showModal}
//                   toggleModal={toggleModal}
//                 />
//                 <li
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                   onClick={() => navigate("#")}
//                 >
//                   Settings
//                 </li>
//                 <li
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                   onClick={handleLogout}
//                 >
//                   Sign out
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>
//       ) : (
//         <Link
//           to="/signin"
//           className="text-red-600 hover:underline flex items-center space-x-4"
//         >
//           <FaUserCircle className="text-red-600 text-2xl" />
//           <p>Sign In</p>
//         </Link>
//       )}
//     </header>
//   );
// };

// export default Header;
