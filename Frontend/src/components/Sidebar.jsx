import React from "react";
import {
  FaBars,
  FaHome,
  FaFire,
  FaVideo,
  FaHeart,
  FaHistory,
  FaPlay,
  FaClock,
  FaMusic,
  FaGamepad,
  FaShoppingCart,
  FaTshirt,
  FaPodcast,
  FaNewspaper,
  FaFilm,
  FaMedal,
  FaYoutube,
  FaCog,
  FaFlag,
  FaQuestionCircle,
  FaCommentDots,
  FaUserCircle,
} from "react-icons/fa";

const Sidebar = ({ isOpen }) => {
  return (
    <>
      <div
        className={`hidden lg:block fixed mt-16 left-0 h-full z-20 bg-white shadow-md transition-all duration-300 overflow-y-auto ${
          isOpen ? "w-44" : "w-16"
        }`}
      >
        

        {/* Main Sections */}
        <ul className="mt-4 space-y-2 gap-2 justify-between lg:flex lg:flex-col">
          {/* Primary */}
          <li
            className={`flex items-center p-3 hover:bg-gray-200 ${
              isOpen ? "flex-row" : "flex-col"
            }`}
          >
            <FaHome className="text-xl" />
            {isOpen ? (
              <span className="ml-3">Home</span>
            ) : (
              <span className="mt-1 text-center text-sm">Home</span>
            )}
          </li>
          <li
            className={`flex items-center p-3 hover:bg-gray-200 ${
              isOpen ? "flex-row" : "flex-col"
            }`}
          >
            <FaFire className="text-xl" />
            {isOpen ? (
              <span className="ml-3">Shorts</span>
            ) : (
              <span className="mt-1 text-center text-sm">Shorts</span>
            )}
          </li>
          <li
            className={`flex items-center p-3 hover:bg-gray-200 ${
              isOpen ? "flex-row" : "flex-col"
            }`}
          >
            <FaVideo className="text-xl" />
            {isOpen ? (
              <span className="ml-3">Subscription</span>
            ) : (
              <span className="mt-1 text-center text-sm p-3">Subscription</span>
            )}
          </li>

          <li
            className={`flex items-center p-3 hover:bg-gray-200 ${
              isOpen ? "flex-row" : "flex-col"
            }`}
          >
            <FaUserCircle className="text-xl" />
            {isOpen ? (
              <span className="ml-3">You</span>
            ) : (
              <span className="mt-1 text-center text-sm p-3">You</span>
            )}
          </li>

          {/* 'You' Section */}
          {isOpen && (
            <>
              <ul className="ml-8 space-y-2">
                <li className="flex items-center p-3 hover:bg-gray-200">
                  <FaHistory className="text-xl" />
                  <span className="ml-3">History</span>
                </li>
                <li className="flex items-center p-3 hover:bg-gray-200">
                  <FaPlay className="text-xl" />
                  <span className="ml-3">Playlists</span>
                </li>
                <li className="flex items-center p-3 hover:bg-gray-200">
                  <FaClock className="text-xl" />
                  <span className="ml-3">Watch Later</span>
                </li>
                <li className="flex items-center p-3 hover:bg-gray-200">
                  <FaHeart className="text-xl" />
                  <span className="ml-3">Liked Videos</span>
                </li>
              </ul>
              {/* Explore Section */}

              <li className="flex items-center p-3 hover:bg-gray-200">
                <FaFire className="text-xl" />
                {isOpen && <span className="ml-3">Explore</span>}
              </li>

              <ul className="ml-8 space-y-2">
                <li className="flex items-center p-3 hover:bg-gray-200">
                  <FaFire className="text-xl" />
                  <span className="ml-3">Trending</span>
                </li>
                <li className="flex items-center p-3 hover:bg-gray-200">
                  <FaShoppingCart className="text-xl" />
                  <span className="ml-3">Shopping</span>
                </li>
                <li className="flex items-center p-3 hover:bg-gray-200">
                  <FaMusic className="text-xl" />
                  <span className="ml-3">Music</span>
                </li>
                <li className="flex items-center p-3 hover:bg-gray-200">
                  <FaFilm className="text-xl" />
                  <span className="ml-3">Film</span>
                </li>
                <li className="flex items-center p-3 hover:bg-gray-200">
                  <FaGamepad className="text-xl" />
                  <span className="ml-3">Gaming</span>
                </li>
                <li className="flex items-center p-3 hover:bg-gray-200">
                  <FaNewspaper className="text-xl" />
                  <span className="ml-3">News</span>
                </li>
                <li className="flex items-center p-3 hover:bg-gray-200">
                  <FaMedal className="text-xl" />
                  <span className="ml-3">Sports</span>
                </li>
                <li className="flex items-center p-3 hover:bg-gray-200">
                  <FaTshirt className="text-xl" />
                  <span className="ml-3">Fashion & Beauty</span>
                </li>
                <li className="flex items-center p-3 hover:bg-gray-200">
                  <FaPodcast className="text-xl" />
                  <span className="ml-3">Podcasts</span>
                </li>
              </ul>

              {/* More from YouTube */}

              <li className="flex items-center p-3 hover:bg-gray-200">
                <FaYoutube className="text-xl" />
                {isOpen && <span className="ml-3">More from YouTube</span>}
              </li>

              <ul className="ml-8 space-y-2">
                <li className="flex items-center p-3 hover:bg-gray-200">
                  <FaYoutube className="text-xl" />
                  <span className="ml-3">YouTube Premium</span>
                </li>
                <li className="flex items-center p-3 hover:bg-gray-200">
                  <FaYoutube className="text-xl" />
                  <span className="ml-3">YouTube Music</span>
                </li>
                <li className="flex items-center p-3 hover:bg-gray-200">
                  <FaYoutube className="text-xl" />
                  <span className="ml-3">YouTube Kids</span>
                </li>
              </ul>

              {/* Settings and Help */}
              <li className="flex items-center p-3 hover:bg-gray-200">
                <FaCog className="text-xl" />
                <span className="ml-3">Settings</span>
              </li>
              <li className="flex items-center p-3 hover:bg-gray-200">
                <FaFlag className="text-xl" />
                <span className="ml-3">Report History</span>
              </li>
              <li className="flex items-center p-3 hover:bg-gray-200">
                <FaQuestionCircle className="text-xl" />
                <span className="ml-3">Help</span>
              </li>
              <li className="flex items-center p-3 hover:bg-gray-200">
                <FaCommentDots className="text-xl" />
                <span className="ml-3">Send Feedback</span>
              </li>
            </>
          )}
        </ul>

        {/* Footer */}
        {isOpen && (
          <div className="p-3 bottom-4 left-4 right-4 text-xs text-gray-500">
            <p>
              About | Press | Copyright | Contact us | Creators | Developers
            </p>
            <p>Terms | Privacy | Policy & Safety | How YouTube works</p>
            <p>Test new features</p>
            <p className="mt-2">&copy; 2024 Google LLC</p>
          </div>
        )}
      </div>
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 w-full bg-white shadow-md flex justify-around py-2">
        <button className="flex flex-col items-center text-gray-600">
          <FaHome className="text-xl" />
          <span className="text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center text-gray-600">
          <FaFire className="text-xl" />
          <span className="text-xs">Shorts</span>
        </button>
        <button className="flex flex-col items-center text-gray-600">
          <FaVideo className="text-xl" />
          <span className="text-xs">Subscription</span>
        </button>
        <button className="flex flex-col items-center text-gray-600">
          <FaUserCircle className="text-xl" />
          <span className="text-xs">You</span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
