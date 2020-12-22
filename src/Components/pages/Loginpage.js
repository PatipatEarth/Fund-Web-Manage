import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../service/firebase";
import Swal from "sweetalert2";
import authen from "../service/authen";

export default class Loginpage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      currentUser: null,
      message: "",
    };
  }

  componentDidMount() {
    authen.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          currentUser: user,
        });
      }
    });
  }

  onChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    authen
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        this.setState({
          currentUser: response.user,
        });
        this.props.history.push("/Homepage");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.message,
          text: "Something went wrong!",
        });
      });
  };

  render() {
    return (
      <section className="section container">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="logo-app">
              <h3>Welcome to FUN-D</h3>
              <img
                src="dist/img/App-icon.jpg"
                alt="App-icon"
                className="brand-image img-circle elevation-3 mt-2 mb-2"
                style={{ width: 150, height: 150, textAlign: "center" }}
              />
            </div>
            <form onSubmit={this.onSubmit}>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    onChange={this.onChange}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="password"
                    onChange={this.onChange}
                  />
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-link" type="submit">
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
