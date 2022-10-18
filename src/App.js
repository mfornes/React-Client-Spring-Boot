import './App.css';
import { Link, Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/gateway"} className="navbar-brand">
          Musala
        </Link>
        <div className="navbar-nav mr-auto">
        <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add Gateway
            </Link>
          </li> 
          <li className="nav-item">
            <Link to={"/gateway"} className="nav-link">
              Gateways
            </Link>
          </li>                
        </div>
      </nav>

      <div className="container mt-3">
        <Outlet />
      </div>
    </div>
  );
}



export default App;
