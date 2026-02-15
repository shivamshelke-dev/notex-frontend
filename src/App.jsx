import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Note from "./components/AllNotes";
import ViewNote from "./components/ViewNotes";
import Trash from "./components/Trash";
import About from "./components/About";
import Footer from "./components/Footer";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

import PrivateRoute from "./components/PrivateRoute";



// Layout wrapper for pages WITH navbar
const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },

  {
    path: "/notes",
    element: (
      <PrivateRoute>
        <div>
          <Navbar />
          <Note />
          <Footer />
        </div>
      </PrivateRoute>
    ),
  },

  {
    path: "/notes/:id",
    element: (
      <MainLayout>
        <ViewNote />
      </MainLayout>
    ),
  },

  {
    path: "/trash",
    element: (
      <PrivateRoute>
        <div>
          <Navbar />
          <Trash />
          <Footer />
        </div>
      </PrivateRoute>
    ),
  },

  {
    path: "/about",
    element: (
      <MainLayout>
        <About />
      </MainLayout>
    ),
  },

  // AUTH ROUTES (NO NAVBAR)
  {
    path: "/login",
    element: <SignIn />,
  },

  {
    path: "/signup",
    element: <SignUp />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
