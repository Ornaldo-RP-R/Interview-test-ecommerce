import React from "react";
import "./Sort.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp } from "@fortawesome/free-solid-svg-icons";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
//Helper component to manage every sort option in filter dropdown
const Sort = ({ title, sortVisibility, onClickOfSort }) => {
  return (
    <div className="Sort-Component" onClick={onClickOfSort}>
      {" "}
      {title}
      {sortVisibility === true ? (
        <div className="sortdown">
          <FontAwesomeIcon
            icon={faSortDown}
            className="icon"
            color="black"
          ></FontAwesomeIcon>
        </div>
      ) : (
        <div className="sortup">
          <FontAwesomeIcon
            icon={faSortUp}
            className="icon"
            color="black"
          ></FontAwesomeIcon>
        </div>
      )}{" "}
    </div>
  );
};
export default Sort;
