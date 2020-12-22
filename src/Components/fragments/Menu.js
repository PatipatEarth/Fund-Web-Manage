import React from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a className="brand-link">
        <img
          src="dist/img/App-icon.jpg"
          alt="App-icon"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">FunD Clinic</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          {/* <div className="image">
            <img
              src="dist/img/patient.png" 
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div> */}
          <div className="info">
            <a className="d-block">Admin Clinic 5</a>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
            <li className="nav-item has-treeview menu-open">
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a className="nav-link ">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>Dashboard </p>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item has-treeview">
              <a className="nav-link">
                <i className="fas fa-user" />
                &nbsp;&nbsp;
                <p>
                  User Management
                  <i className="fas fa-angle-left right" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <a className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <Link to="/Dentistpage">
                      <p>Dentist</p>
                    </Link>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="pages/layout/fixed-sidebar.html"
                    className="nav-link"
                  >
                    <i className="far fa-circle nav-icon" />
                    <Link to="/Patientpage">
                      <p>Patient</p>
                    </Link>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item has-treeview">
              <a className="nav-link">
                <i class="fas fa-calendar-check"></i>&nbsp;&nbsp;
                <Link to="/Schedulepage">
                  <p>
                    Appointment
                    {/* <i className="fas fa-angle-left right" /> */}
                  </p>
                </Link>
              </a>
            </li>
            <li className="nav-item has-treeview">
              {/* <button 
                
                // onClick={(e) => {
                //   e.preventDefault();
                //   auth.signOut().then((response) => {
                //     this.setState({
                //       currentUser: null,
                //     });
                //     this.props.history.push("/");
                //   });
                // }}
                className="nav-link"
              > */}

              <a className="nav-link">
                <i className="fas fa-sign-out-alt" />
                &nbsp;&nbsp;
                <Link to="/">
                  <p>Logout</p>
                </Link>
              </a>

              {/* </button> */}
              <ul className="nav nav-treeview"></ul>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}
