import React, { Component } from "react";
import Header from "../fragments/Header";
import Menu from "../fragments/Menu";
import firebase from "../service/firebase";

class SendData extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      fullname: "",
      
    };
  }

  updateInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addUser = (e) => {
    e.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshot: true,
    });
    const userRef = db
      .collection("FunD")
      .doc("funD")
      .collection("AllUsers")
      .doc("HelloTest")
      .set({
        fullname: this.state.fullname,
        email: this.state.email,
      });
    this.setState({
      fullname: "",
      email: "",
    });
  };

  render() {
    return (
      <div>
        <Header />
        <Menu />
        <div className="content-wrapper">
          <form onSubmit={this.addUser}>
            <input
              type="text"
              name="fullname"
              placeholder="title"
              onChange={this.updateInput}
              value={this.state.fullname}
            />
            <input
              type="email"
              name="email"
              placeholder="Description"
              onChange={this.updateInput}
              value={this.state.email}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
export default SendData;
