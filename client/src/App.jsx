// Import necessary components and styles
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Layout from "./Layout";

// Create routes using createBrowserRouter and createRoutesFromElements
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
    
      {/* Wrap all routes inside Layout */}
      <Route path="/Login/Home" element={<Home />} /> {/* Route for Home component */}
      <Route path="Register" element={<Register />} />
      {/* Route for Register component */}
      <Route path="/Login" element={<Login />} />
      {/* Route for Login component */}
    </Route>
  )
);

// Define App component
function App() {
  return <RouterProvider router={router} />; // Render RouterProvider with defined router
}

export default App; // Export App component
