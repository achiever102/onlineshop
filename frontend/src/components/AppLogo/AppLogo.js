import React, { Component } from "react";
import {Link} from 'react-router-dom';

class AppLogo extends Component {
  render() {
    const loadingGif = require("./mercuryLogo.gif")
    return (
      <div className="bg-dark text-center" style={{height: "60px", fontSize: "40px", lineHeight: "60px" }}>
        <Link to="/" style={{ textDecoration: 'none', color: "white" }}>
          <img style={{width: "60px", height: "60px"}} src={loadingGif} alt="load issue"/>LUDOS</Link>
      </div>
    );
  }
}

export default AppLogo;
