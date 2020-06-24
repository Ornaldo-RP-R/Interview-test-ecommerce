import React from "react";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import "./UserLoggedDropdown.styles.css";
//This component would be if user was logged in since i had no duty to make a sign in or sign up  i made
// a user dropdown just for looking good (this would be supposed ex:if user is logged in)
const UserLoggedDropdown = () => {
  return (
    <div className="dropdownSigned">
      <button className="SignedDropdownButtons normal">
        <FontAwesomeIcon icon={faUserShield} color="#2785ad"></FontAwesomeIcon>{" "}
        &nbsp; Personal Information
      </button>

      <button className="SignedDropdownButtons Logout">
        Log out &nbsp;
        <FontAwesomeIcon icon={faSignOutAlt} color="#2785ad"></FontAwesomeIcon>
      </button>
      <div style={{ fontSize: "1.3vw" }}>
        {" "}
        <br />
        Not Functionality since no login function to do on this project
      </div>
      <button className="SignedDropdownButtons Help">
        Contact for Help
        <FontAwesomeIcon icon={faQuestion} color="#bb2639"></FontAwesomeIcon>
      </button>
    </div>
  );
};

export default UserLoggedDropdown;
