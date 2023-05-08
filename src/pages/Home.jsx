import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/index";
import { useNavigate } from "react-router";

const Home = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        console.log(user);
        setCurrentUser(user);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        <h2 style={{ color: "#fff" }}>
          {currentUser && "Hi " + currentUser.email}
        </h2>
        <button
          class="btn btn-primary"
          onClick={() => navigate("/loan-application")}
        >
          Apply for a loan
        </button>
      </div>
    </div>
  );
};

export default Home;
