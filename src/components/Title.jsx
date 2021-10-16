import React from "react";
import PropTypes from "prop-types";

const Title = ({ children, mode }) => {
  function titleColor() {
    return mode
      ? { color: "#000", borderColor: "#000!important" }
      : { color: "#fff", borderColor: "#fff!important" };
  }
  return (
    <h1
      className="text-center mb-5 border-bottom pb-4"
      data-aos="fade-up"
      data-aos-once="true"
      style={titleColor()}
    >
      {children}
    </h1>
  );
};
Title.propTypes = {
  children: PropTypes.string,
  mode: PropTypes.bool
};
export default Title;
