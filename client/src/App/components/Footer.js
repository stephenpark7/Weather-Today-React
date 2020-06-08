import React from "react";
import GitHubLogo from "../other-images/logo.png";

function Footer() {
  return (
    <div className="container footer-container">
      <span className="visit-name">Made by Stephen Park</span><br /><br />
      <span>This web application was created using a combination of HTML, CSS, Javascript, and the React framework.</span><br />
      <span>Third-party API's used: OpenWeatherMap, LocationIQ, and IP Stack.</span><br /><br />
      <span className="visit-text">My GitHub Profile</span>
      <a href="https://github.com/spark0843"><img src={GitHubLogo} alt="Github Logo" /></a>
    </div>
  )
}

export default Footer;