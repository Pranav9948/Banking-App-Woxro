import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./Pages/Register";
import { Toaster } from "react-hot-toast";
import Login from "./Pages/Login";
import HomePage from "./Pages/HomePage";
import PublicRoutes from "./components/PublicRoutes";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Deposit from "./Pages/Deposit";
import Statement from "./Pages/Statement";
import WithDrawal from "./Pages/WithDrawal";
import Transfer from "./Pages/Transfer";

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
    
     

      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <HomePage/>  
          </ProtectedRoutes>
        }
      />

<Route
        path="/deposit"
        element={
          <ProtectedRoutes>
            <Deposit/>  
          </ProtectedRoutes>
        }
      />

<Route
        path="/statement"
        element={
          <ProtectedRoutes>
            <Statement/>  
          </ProtectedRoutes>
        }
      />




      <Route
        path="/login"
        element={
          <PublicRoutes>
            <Login/>
          </PublicRoutes>
        }
      />





      <Route
        path="/register"
        element={
          <PublicRoutes>
            <Register/>
          </PublicRoutes>
        }
      />

<Route
        path="/withdrawmoney"
        element={
          <ProtectedRoutes>
            <WithDrawal/>
          </ProtectedRoutes>
        }
      />


<Route
        path="/transfermoney"
        element={
          <ProtectedRoutes>
            <Transfer/>
          </ProtectedRoutes>
        }
      />


</Routes>




    </div>
  );
}

export default App;
