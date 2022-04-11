import React, { Component } from "react";
import {Link} from 'react-router-dom';



let loadingGif = require("./mercuryLogo.gif")
class AppLogo extends Component {
  render() {
    return (
      <div className="bg-dark text-center py-3">
        <Link to="/" style={{ textDecoration: 'none', color: "white", fontSize: "32px" }}>LUDOS</Link>
          <img style={{width: "6%"}} src={loadingGif} alt="wait until the page loads" />
      </div>
    );
  }
}

export default AppLogo;
