import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../src/pages/Auth";
import Register from "../src/pages/Register";
import Home from "../src/pages/Home";
import LoanApplication from "./pages/LoanApplication";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Auth></Auth>} />
        <Route exact path="/register" element={<Register></Register>} />
        <Route exact path="/home" element={<Home></Home>} />
        <Route
          exact
          path="/loan-application"
          element={<LoanApplication></LoanApplication>}
        />
      </Routes>
    </Router>
  );
}

export default App;
