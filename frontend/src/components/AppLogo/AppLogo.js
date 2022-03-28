import React, { Component } from "react";
import {Link} from 'react-router-dom';

class AppLogo extends Component {
  render() {
    return (
      <div className="bg-dark text-center py-3">
        <Link to="/" style={{ textDecoration: 'none', color: "white", fontSize: "32px" }}>LUDOS</Link>
      </div>
    );
  }
}

export default AppLogo;
