// import React, { useState } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";
// import FilterButtons from "../components/FilterButtons"; // Assuming this handles category filtering

// const Home = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleSearch = (term) => {
//     setSearchTerm(term);
//   };

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//   };

//   const location = useLocation();
//   const hideComponentsRoutes = ["/signin", "/register"]; // Routes where certain components are hidden

//   // Determine if the current route is for login/register
//   const isAuthPage = hideComponentsRoutes.includes(location.pathname);

//   return (
//     <div
//       className={`flex h-screen bg-gray-100 ${
//         isAuthPage ? "justify-center items-center" : ""
//       }`}
//     >
//       {/* Conditionally Render Sidebar and Header for Non-Auth Pages */}
//       {!isAuthPage && (
//         <>
//           <Sidebar isOpen={isSidebarOpen} />
//           <div className="flex-1">
//             <Header onSearch={handleSearch} toggleSidebar={toggleSidebar} />
//             <FilterButtons onCategorySelect={handleCategorySelect} />
//           </div>
//         </>
//       )}

//       {/* Main Content */}
//       <div className={`flex-1 ${isAuthPage ? "max-w-sm" : ""}`}>
//         <main className={`lg:mt-36 ${isSidebarOpen ? "lg:ml-44" : "lg:ml-16"}`}>
//           {/* Render the child components (pages) like Login/Register */}
//           <Outlet context={{ searchTerm, selectedCategory }} />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux"; // Assuming you're using Redux for user state management
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import FilterButtons from "../components/FilterButtons"; // Assuming this handles category filtering

const Home = () => {
  const { user } = useSelector((state) => state.auth); // Pull user state from Redux
  console.log("hoem", user?.data);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const location = useLocation();
  const hideComponentsRoutes = ["/signin", "/register"]; // Routes where certain components are hidden
  // Determine if the current route is for login/register
  const isAuthPage = hideComponentsRoutes.includes(location.pathname);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="">
        {/* Header */}

        {/* Conditionally Render FilterButtons */}
        {!isAuthPage && (
          <>
            <Sidebar isOpen={isSidebarOpen} />
            <Header onSearch={handleSearch} toggleSidebar={toggleSidebar} />
            <FilterButtons onCategorySelect={handleCategorySelect} />
          </>
        )}

        {/* Render Child Routes */}
        <main
          className={`${
            isAuthPage
              ? "auth-page flex justify-center text-center items-center" // Special class for login/register pages
              : `main-content lg:mt-36 ${
                  isSidebarOpen ? "lg:ml-44" : "lg:ml-16"
                }`
          }`}
        >
          <Outlet
            context={{ user: user?.data, searchTerm, selectedCategory }}
          />{" "}
          {/* Passing userId (user?.data?.id) to child routes */}
        </main>
      </div>
    </div>
  );
};

export default Home;

// import React, { useState } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar";
// import FilterButtons from "../components/FilterButtons"; // Assuming this handles category filtering

// const Home = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const handleSearch = (term) => {
//     setSearchTerm(term);
//   };

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//   };

//   const location = useLocation();
//   const hideComponentsRoutes = ["/signin", "/register"]; // Routes where certain components are hidden
//   // Determine if the current route is for login/register
//   const isAuthPage = hideComponentsRoutes.includes(location.pathname);

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}

//       {/* Main Content */}
//       <div className="">
//         {/* Header */}

//         {/* Conditionally Render FilterButtons */}
//         {!isAuthPage && (
//           <>
//             <Sidebar isOpen={isSidebarOpen} />
//             <Header onSearch={handleSearch} toggleSidebar={toggleSidebar} />
//             <FilterButtons onCategorySelect={handleCategorySelect} />
//           </>
//         )}

//         {/* Render Child Routes */}
//         <main
//           className={`${
//             isAuthPage
//               ? "auth-page flex justify-center text-center items-center" // Special class for login/register pages
//               : `main-content lg:mt-36 ${
//                   isSidebarOpen ? "lg:ml-44" : "lg:ml-16"
//                 }`
//           }`}
//         >
//           <Outlet context={{ searchTerm, selectedCategory }} />{" "}
//           {/* Passing state to Outlet */}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Home;
