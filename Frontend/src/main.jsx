import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./redux/store.js";
import "./index.css"; // Import Tailwind CSS
import Home from "./pages/Home"; // Home page component
import SignIn from "./pages/Login.jsx"; // SignIn page component
import Register from "./pages/Register.jsx"; // Register page component
import NotFound from "./pages/NotFound.jsx"; // Not Found page
import Channel from "./pages/Channel.jsx";
import VideoPlayer from "./components/VideoPlayer.jsx";
import VideoList from "./components/VideoList.jsx";

// Define routes
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />, // Home is now the main component
      children: [
        { path: "/", element: <VideoList /> },
        { path: "signin", element: <SignIn /> },
        { path: "register", element: <Register /> },
        { path: "channel/:id", element: <Channel /> },
        { path: "videoPlayer/:id", element: <VideoPlayer /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// import React, { Suspense } from "react";
// import { createRoot } from "react-dom/client";
// import { Provider } from "react-redux";
// import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import store from "./redux/store.js";
// import "./index.css"; // Import Tailwind CSS
// import App from "./App.jsx";
// import Home from "./pages/Home"; // Home page component
// import SignIn from "./pages/Login.jsx"; // Sign In component
// import Register from "./pages/Register.jsx"; // Register component
// import NotFound from "./pages/NotFound.jsx"; // Not Found page for 404 error
// import Channel from "./pages/Channel.jsx";
// import VideoPlayerPage from "./pages/VideoPlayerPage.jsx";
// // Suppress React Router v7 Future Flag Warnings
// if (process.env.NODE_ENV === "development") {
//   const consoleWarn = console.warn;
//   console.warn = (message, ...optionalParams) => {
//     if (
//       typeof message === "string" &&
//       message.includes("React Router Future Flag Warning")
//     ) {
//       return;
//     }
//     consoleWarn(message, ...optionalParams);
//   };
// }

// // Lazy load other components for performance
// // const About = lazy(() => import("./components/About"));
// // const Contact = lazy(() => import("./components/Contact"));

// // Updated Router with Future Flags (optional)
// const router = createBrowserRouter(
//   [
//     {
//       path: "/",
//       element: <App />, // This will render the Header component
//       children: [
//         {
//           path: "/",
//           element: <Home />, // This will be your Home page
//         },
//         {
//           path: "signin",
//           element: <SignIn />, // SignIn page route
//         },
//         {
//           path: "register",
//           element: <Register />, // Register page route
//         },
//         {
//           path: "channel",
//           element: <Channel />,
//         },
//         {
//           path: "videoPlayer",
//           element: <VideoPlayerPage />,
//         },
//         // {
//         //   path: "about",
//         //   element: (
//         //     <Suspense fallback={<div>Loading...</div>}>
//         //       <About />
//         //     </Suspense>
//         //   ),
//         // },
//         // {
//         //   path: "contact",
//         //   element: (
//         //     <Suspense fallback={<div>Loading...</div>}>
//         //       <Contact />
//         //     </Suspense>
//         //   ),
//         // },
//         {
//           path: "*",
//           element: (
//             <Suspense fallback={<div>Loading...</div>}>
//               <NotFound />
//             </Suspense>
//           ),
//         },
//       ],
//     },
//   ],
//   {
//     future: {
//       v7_startTransition: true,
//       v7_relativeSplatPath: true,
//       v7_fetcherPersist: true,
//       v7_normalizeFormMethod: true,
//       v7_partialHydration: true,
//       v7_skipActionErrorRevalidation: true,
//     },
//   }
// );

// createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <RouterProvider router={router} />
//     </Provider>
//   </React.StrictMode>
// );

// import React, { Suspense } from "react";
// import { createRoot } from "react-dom/client";
// import { Provider } from "react-redux";
// import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import store from "./redux/store.js";
// import "./index.css"; // Import Tailwind CSS
// import App from "./App.jsx";
// import Home from "./pages/Home"; // Home page component
// import SignIn from "./pages/Login.jsx"; // Sign In component
// import Register from "./pages/Register.jsx"; // Register component
// import NotFound from "./pages/NotFound.jsx"; // Not Found page for 404 error
// import Channel from "./pages/Channel.jsx";
// import VideoPlayerPage from "./pages/VideoPlayerPage.jsx";

// // Lazy load other components for performance
// // const About = lazy(() => import("./components/About"));
// // const Contact = lazy(() => import("./components/Contact"));

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />, // This will render the Header component
//     children: [
//       {
//         path: "/",
//         element: <Home />, // This will be your Home page
//       },
//       {
//         path: "signin",
//         element: <SignIn />, // SignIn page route
//       },
//       {
//         path: "register",
//         element: <Register />, // Register page route
//       },
//       {
//         path: "channel",
//         element: <Channel />,
//       },
//       {
//         path: "videoPlayer",
//         element: <VideoPlayerPage />,
//       },

//       // {
//       //   path: "about",
//       //   element: (
//       //     <Suspense fallback={<div>Loading...</div>}>
//       //       <About />
//       //     </Suspense>
//       //   ),
//       // },
//       // {
//       //   path: "contact",
//       //   element: (
//       //     <Suspense fallback={<div>Loading...</div>}>
//       //       <Contact />
//       //     </Suspense>
//       //   ),
//       // },
//       {
//         path: "*",
//         element: (
//           <Suspense fallback={<div>Loading...</div>}>
//             <NotFound />
//           </Suspense>
//         ),
//       },
//     ],
//   },
// ]);

// createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <RouterProvider router={router} />
//     </Provider>
//   </React.StrictMode>
// );
