import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './category.css';
import Footer from '../components/Footer/Footer';

function Category() {
  const [role, setRole] = useState("");
  const [visible, setVisible] = useState(true);  // To toggle role selection
  const navigate = useNavigate();

  const handleClick = (temprole) => {
    setRole(temprole);
    setVisible(false);  // Hide role selection buttons after a role is chosen
  };

  const handleNavigate = () => {
    if (role) {
      navigate(`/register?role=${role}`); // Pass the role in the query params
    }
  };

  return (
    <>
      <div className="category-container">
        <div className="category">
          <div className="cat-head">
            <center>
              <h2>Create an account</h2>
            </center>
            <div className="cat-sub-text">
              <p>Choose which type of account you'd like to create:</p>
            </div>
          </div>

          {visible && (
            <div className="box-cat">
              {[
                { role: "admin", subtext: "Admins⚙️" },
                { role: "user", subtext: "I want to create a regular account 🚗" }
              ].map(({ role, subtext }) => (
                <button
                  className="category-box"
                  key={role}
                  onClick={() => handleClick(role)}
                >
                  <p className="PHeader">{role}</p>
                  <p className="Psubtext">{subtext}</p>
                </button>
              ))}
            </div>
          )}

          <div className="sub-btn-reg">
            {!visible && role && (
              <button onClick={handleNavigate}>Sign Up as a {role}</button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Category;
