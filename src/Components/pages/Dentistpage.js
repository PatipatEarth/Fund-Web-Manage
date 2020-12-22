import React, { Component } from "react";
import Header from "../fragments/Header";
import Menu from "../fragments/Menu";
import firebase from "../service/firebase";

import Moment from "moment";
import Container from "@material-ui/core/Container";

export default class Dentistpage extends Component {
  state = {
    dentist: null,
  };

  componentDidMount() {
    const db = firebase.firestore();
    db.collection("FunD")
      .doc("funD")
      .collection("Clinic")
      .doc("clinic")
      .collection("Clinic 5")
      .doc("Clinic 5")
      .collection("Dentists")
      .get()
      .then((snapshot) => {
        const dentist = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          dentist.push(data);
        });
        this.setState({ dentist: dentist });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <Header />
        <Menu />
        <div className="content-wrapper">
          <Container>
            <h1>AllUsers Dentists Clinic 5</h1>
            <ul class="list-group">
              {this.state.dentist &&
                this.state.dentist.map((dentist) => {
                  return (
                    <li class="list-group-item">
                      <h5>Name: {dentist.fullName}</h5>
                      <h6>
                        Permission: {dentist.permission} | ID: {dentist.uid}
                      </h6>
                      Tel:{dentist.tel}
                    </li>
                  );
                })}
            </ul>
          </Container>
        </div>
      </div>
    );
  }
}
