import React, { Component } from "react";
import {Link} from 'react-router-dom';

const loadingGif = require("./mercuryLogo.gif")

class AppLogo extends Component {
  render() {
    return (
      <div className="bg-dark text-center py-3" style={{height: "80px"}}>
        <Link to="/" style={{ textDecoration: 'none', color: "white", fontSize: "40px" }}>LUDOS</Link>
          <img style={{width: "80px", height: "80px"}} src={loadingGif} alt="could not load the image" />
      </div>
    );
  }
}

export default AppLogo;
