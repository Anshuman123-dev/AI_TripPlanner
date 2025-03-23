// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
// import CreateTrip from './create-trip/index.jsx'
// import Header from './components/custom/Header.jsx'
// import { Toaster } from './components/ui/sonner'
// import { GoogleOAuthProvider } from '@react-oauth/google'
// import TripDetails from './TripDetails'
// import MyTrips from './my-trips'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />
//   },
//   {
//     path:'/create-trip',
//     element: <CreateTrip />
//   },
//   {
//     path:"/trip/:id",
//     element: <TripDetails/>
//   },
//   {
//     path:"my-trips",
//     element:<MyTrips/>
//   }
// ])

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID} >
//       <Header/>
//       <Toaster/>
//       <RouterProvider router={router} />
//     </GoogleOAuthProvider>
//   </StrictMode>,
// )



// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
// import CreateTrip from './create-trip/index.jsx'
// import Header from './components/custom/Header'
// import { Toaster } from './components/ui/sonner'
// import { GoogleOAuthProvider } from '@react-oauth/google'
// import TripDetails from './TripDetails'
// import MyTrips from './my-trips'

// // Layout component with Header
// const Layout = () => (
//   <>
//     <Header />
//     <Outlet /> {/* This renders the child routes */}
//   </>
// );

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       { index: true, element: <App /> },
//       { path: 'create-trip', element: <CreateTrip /> },
//       { path: 'trip/:id', element: <TripDetails /> },
//       { path: 'my-trips', element: <MyTrips /> }
//     ]
//   }
// ]);

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
//       <RouterProvider router={router} />
//       <Toaster position="top-right" />
//     </GoogleOAuthProvider>
//   </StrictMode>
// );



import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import TripDetails from './TripDetails'
import MyTrips from './my-trips'
import Hero from './components/custom/Hero'
import Explore from './components/custom/Explore'

// HomePage component with only Hero
const HomePage = () => (
  <>
    <Hero />
  </>
);

// Layout component with Header
const Layout = () => (
  <>
    <Header />
    <Outlet /> {/* This renders the child routes */}
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'create-trip', element: <CreateTrip /> },
      { path: 'trip/:id', element: <TripDetails /> },
      { path: 'my-trips', element: <MyTrips /> },
      { path: 'explore', element: <Explore /> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </GoogleOAuthProvider>
  </StrictMode>
);