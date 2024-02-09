

import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
  {/* <div className="parent" >
        <ul>
          <li>
            <Link to="/Login/Home">Home</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/Register">Register</Link>
          </li>
        </ul>
        </div>   */}

      <Outlet />
    </>
  )
};

export default Layout;