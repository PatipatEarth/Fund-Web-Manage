import React, { Component } from "react";
import Header from "../fragments/Header";
import Menu from "../fragments/Menu";
import firebase from "../service/firebase";
import Container from "@material-ui/core/Container";
import ListGroup from "react-bootstrap/ListGroup";

export default class PatientPage extends Component {
  state = {
    patients: null,
  };
  componentDidMount() {
    const db = firebase.firestore();
    db.collection("FunD")
      .doc("funD")
      .collection("Clinic")
      .doc("clinic")
      .collection("Clinic 5")
      .doc("Clinic 5")
      .collection("Patients")
      .get()
      .then((snapshot) => {
        const patients = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          patients.push(data);
        });
        this.setState({ patients: patients });
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
            <h1>AllUsers Patients Clinic5</h1>
            {this.state.patients &&
              this.state.patients.map((patients) => {
                return (
                  <li class="list-group-item">
                    <h5>Name: {patients.fullName}</h5>
                    <h6>ID: {patients.uid}</h6>
                    Tel:{patients.tel}
                  </li>
                );
              })}
          </Container>
        </div>
      </div>
    );
  }
}
