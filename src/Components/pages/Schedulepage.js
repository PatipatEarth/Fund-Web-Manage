import React, { Component, useRef } from "react";
import Button from "react-bootstrap/Button";
import firebase from "../service/firebase";
import DateTimePicker from "react-datetime-picker";
import Modal from "react-bootstrap/Modal";
import Header from "../fragments/Header";
import Menu from "../fragments/Menu";
import Swal from "sweetalert2";

export default class Schedulepage extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      event_date: new DateTimePicker(),
      show: false,
      showEdit: false,
      date: new Date(),
      dentist: null,
      patient: null,
      appointment: null,
      getDentist: "",
      getPatient: "",
      dentistId: "",
      patientId: "",
      getAppointment: "",
      getPatientName: "",
      appointmentID: null,
    };
  }

  componentDidMount() {
    const dentists = firebase.firestore();
    dentists
      .collection("FunD")
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
          const docID = doc.id;
          const dataObj = { ...doc.data(), ["id"]: docID };
          dentist.push(dataObj);
        });
        this.setState({ dentist: dentist });
      })
      .catch((error) => console.log(error));

    const patients = firebase.firestore();
    patients
      .collection("FunD")
      .doc("funD")
      .collection("Clinic")
      .doc("clinic")
      .collection("Clinic 5")
      .doc("Clinic 5")
      .collection("Patients")
      .get()
      .then((snapshot) => {
        const patient = [];
        snapshot.forEach((doc) => {
          const docID = doc.id;
          const dataObj = { ...doc.data(), ["id"]: docID };
          patient.push(dataObj);
        });
        this.setState({ patient: patient });
      })
      .catch((error) => console.log(error));

    const appointments = firebase.firestore();
    appointments
      .collection("FunD")
      .doc("funD")
      .collection("Clinic")
      .doc("clinic")
      .collection("Clinic 5")
      .doc("Clinic 5")
      .collection("Appointments")
      .get()
      .then((snapshot) => {
        const appointment = [];
        snapshot.forEach((doc) => {
          const docID = doc.id;
          const dataObj = { ...doc.data(), ["id"]: docID };
          appointment.push(dataObj);
        });
        this.setState({ appointment: appointment });
      })
      .catch((error) => console.log(error));
  }

  addAppointment = (e) => {
    let x = this.state.getPatient.indexOf(",");
    let y = this.state.getDentist.indexOf(",");
    let dentUid = this.state.getDentist.substring(
      y + 1,
      this.state.getDentist.length
    );
    let patientUid = this.state.getPatient.substring(
      x + 1,
      this.state.getPatient.length
    );
    e.preventDefault();
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshot: true,
    });
    db.collection("FunD")
      .doc("funD")
      .collection("Clinic")
      .doc("clinic")
      .collection("Clinic 5")
      .doc("Clinic 5")
      .collection("Dentists")
      .doc(dentUid)
      .collection("Appointment")
      .doc()
      .set({
        title: this.state.title,
        description: this.state.description,
        id: "",
        event_date: this.state.date,
        patient: this.state.getPatient.substring(0, x),
        patientId: this.state.getPatient.substring(
          x + 1,
          this.state.getPatient.length
        ),
      })
      .then(function () {
        window.location.reload();
      });

    db.collection("FunD")
      .doc("funD")
      .collection("Clinic")
      .doc("clinic")
      .collection("Clinic 5")
      .doc("Clinic 5")
      .collection("Patients")
      .doc(patientUid)
      .collection("Appointment")
      .doc()
      .set({
        title: this.state.title,
        description: this.state.description,
        id: "",
        event_date: this.state.date,
        dentist: this.state.getDentist.substring(0, y),
        dentistId: this.state.getDentist.substring(
          y + 1,
          this.state.getDentist.length
        ),
      });

    db.collection("FunD")
      .doc("funD")
      .collection("Clinic")
      .doc("clinic")
      .collection("Clinic 5")
      .doc("Clinic 5")
      .collection("Appointments")
      .doc()
      .set({
        title: this.state.title,
        description: this.state.description,
        id: "",
        event_date: this.state.date,
        dentist: this.state.getDentist.substring(0, y),
        dentistId: this.state.getDentist.substring(
          y + 1,
          this.state.getDentist.length
        ),
        patient: this.state.getPatient.substring(0, x),
        patientId: this.state.getPatient.substring(
          x + 1,
          this.state.getPatient.length
        ),
      });

    this.setState({
      title: "",
      description: "",
      event_date: new DateTimePicker(),
      getDentist: "",
      getPatient: "",
      dentistId: "",
      patientId: "",
    });
  };

  deleteAppointment(appointment, patient, dentist) {
    let appointmentID = appointment;
    let patientID = patient;
    let dentistID = dentist;
    const db = firebase.firestore();
    db.collection("FunD")
      .doc("funD")
      .collection("Clinic")
      .doc("clinic")
      .collection("Clinic 5")
      .doc("Clinic 5")
      .collection("Appointments")
      .doc(appointmentID)
      .delete()
      .then(function () {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Delete Appointment Complete",
        });
        window.location.reload();
      });

    db.collection("FunD")
      .doc("funD")
      .collection("Clinic")
      .doc("clinic")
      .collection("Clinic 5")
      .doc("Clinic 5")
      .collection("Dentists")
      .doc(dentistID)
      .collection("Appointment")
      .where("patientId", "==", patientID)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs[0].ref.delete();
      });

    db.collection("FunD")
      .doc("funD")
      .collection("Clinic")
      .doc("clinic")
      .collection("Clinic 5")
      .doc("Clinic 5")
      .collection("Patients")
      .doc(patientID)
      .collection("Appointment")
      .where("dentistId", "==", dentistID)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs[0].ref.delete();
      });
  }

  editAppointment = () => {    
    let x = this.state.getPatient.indexOf(",");
    let y = this.state.getDentist.indexOf(",");
    let appointID = this.state.appointmentID;

    const db = firebase.firestore();

    db.settings({
      timestampsInSnapshot: true,
    });   

    db.collection("FunD")
      .doc("funD")
      .collection("Clinic")
      .doc("clinic")
      .collection("Clinic 5")
      .doc("Clinic 5")
      .collection("Appointments")
      .doc(appointID)
      .update({
        title: this.state.title,
        description: this.state.description,
        event_date: this.state.date,
        dentist: this.state.getDentist.substring(0, y),
        dentistId: this.state.getDentist.substring(
          y + 1,
          this.state.getDentist.length
        ),
        patient: this.state.getPatient.substring(0, x),
        patientId: this.state.getPatient.substring(
          x + 1,
          this.state.getPatient.length
        ),
      })
      .then(function () {
        window.location.reload();
      });
  };

  updateInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.date]: e.target.value,
    });
  };

  onChange = (date) => this.setState({ date });

  render() {
    return (
      <div>
        <Header />
        <Menu />
        <div className="content-wrapper bg-white">
          <section className="Container">
            <div className="container-fluid mt-4">
              <Button
                variant="primary"
                style={{ float: "right" }}
                className="float-right"
                onClick={() => {
                  this.setState({ show: true });
                }}
              >
                Add Appointment
              </Button>

              <h3>Appointment</h3>
              <br />
              <ul class="list-group">
                {this.state.appointment &&
                  this.state.appointment.map((appointment) => {
                    return (
                      <div className="eiei">
                        <li className="list-group-item">
                          <div className="row">
                            <div className="col-8">
                              <h4>Title : {appointment.title}</h4>
                              <h6>
                                Dentist : {appointment.dentist} | Patient :{" "}
                                {appointment.patient}
                              </h6>
                              Date:&nbsp;
                              {new Date(
                                appointment.event_date.seconds * 1000
                              ).toLocaleDateString("en-us")}{" "}
                              | Time:&nbsp;
                              {new Date(
                                appointment.event_date.seconds * 1000
                              ).toLocaleTimeString("en-us")}
                            </div>

                            <div className="col-4 mt-3">
                              <button
                                type="button"
                                class="btn btn-danger float-right"
                                onClick={() => {
                                  Swal.fire({
                                    position: "top-end",
                                    title: "Do you want to Delete Appointment?",
                                    showCancelButton: true,
                                    confirmButtonText: `Yes`,
                                  }).then((result) => {
                                    /* Read more about isConfirmed, isDenied below */
                                    if (result.isConfirmed) {
                                      this.deleteAppointment(
                                        appointment.id,
                                        appointment.patientId,
                                        appointment.dentistId
                                      );
                                    }
                                  });
                                }}
                              >
                                Delete
                              </button>
                              <button
                                class="btn btn-primary float-right mr-2"
                                onClick={() => {
                                  this.setState({
                                    showEdit: true,
                                    appointmentID: appointment.id,
                                  });
                                }}
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        </li>
                        <br />
                      </div>
                    );
                  })}
              </ul>

              <Modal
                className="modal-from"
                show={this.state.show}
                onHide={() => {
                  this.setState({ show: false });
                }}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Make an Appointment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={this.addAppointment}>
                    <div className="field">
                      <label className="label">Title</label>
                      <input
                        className="input"
                        type="text"
                        name="title"
                        placeholder="Add Title"
                        onChange={this.updateInput}
                        value={this.state.title}
                        required
                      />
                    </div>
                    <div className="field">
                      <label className="label">Date time</label>
                      <DateTimePicker
                        onChange={this.onChange}
                        value={this.state.date}
                      />
                    </div>

                    <div className="field">
                      <label className="label">Description</label>
                      <input
                        className="input"
                        type="textarea"
                        name="description"
                        onChange={this.updateInput}
                        placeholder="Description"
                        value={this.state.description}
                      />
                    </div>
                    <div className="field">
                      <label className="label">Dentist</label>

                      <select
                        class="form-control"
                        onChange={(e) => {
                          this.setState({ getDentist: e.target.value });
                        }}
                      >
                        <option>Select Dentist</option>
                        {this.state.dentist &&
                          this.state.dentist.map((dentist) => {
                            return (
                              <option
                                value={dentist.fullName + "," + dentist.uid}
                              >
                                {dentist.fullName}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="field">
                      <label className="label">Patient</label>
                      <select
                        class="form-control"
                        onChange={(e) => {
                          this.setState({
                            getPatient: e.target.value,
                          });
                        }}
                      >
                        <option>Select Patient</option>
                        {this.state.patient &&
                          this.state.patient.map((patient) => {
                            return (
                              <option
                                value={patient.fullName + "," + patient.uid}
                              >
                                {patient.fullName}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="field is-grouped">
                      <div className="control">
                        <Button
                          className="button is-link"
                          type="submit"
                          onClick={() => {
                            this.setState({ show: false });
                            // Swal.fire({
                            //   icon: 'success',
                            //   title: 'Success',
                            //   text: 'Add Event Complete',
                            // })
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          variant="danger"
                          className="ml-1"
                          onClick={() => {
                            this.setState({ show: false });
                          }}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
              <Modal
                className="modal-from"
                show={this.state.showEdit}
                onHide={() => {
                  this.setState({ showEdit: false });
                }}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Edit an Appointment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      this.editAppointment;
                    }}
                  >
                    <div className="field">
                      <label className="label">Title</label>
                      <input
                        className="input"
                        type="text"
                        name="title"
                        placeholder="Add Title"
                        onChange={this.updateInput}
                        value={this.state.title}
                        required
                      />
                    </div>
                    <div className="field">
                      <label className="label">Date time</label>
                      <DateTimePicker
                        onChange={this.onChange}
                        value={this.state.date}
                      />
                    </div>

                    <div className="field">
                      <label className="label">Description</label>
                      <input
                        className="input"
                        type="textarea"
                        name="description"
                        onChange={this.updateInput}
                        placeholder="Description"
                        value={this.state.description}
                      />
                    </div>
                    <div className="field">
                      <label className="label">Dentist</label>

                      <select
                        class="form-control"
                        onChange={(e) => {
                          this.setState({ getDentist: e.target.value });
                        }}
                      >
                        <option>Select Dentist</option>
                        {this.state.dentist &&
                          this.state.dentist.map((dentist) => {
                            return (
                              <option
                                value={dentist.fullName + "," + dentist.uid}
                              >
                                {dentist.fullName}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="field">
                      <label className="label">Patient</label>
                      <select
                        class="form-control"
                        onChange={(e) => {
                          this.setState({
                            getPatient: e.target.value,
                          });
                        }}
                      >
                        <option>Select Patient</option>
                        {this.state.patient &&
                          this.state.patient.map((patient) => {
                            return (
                              <option
                                value={patient.fullName + "," + patient.uid}
                              >
                                {patient.fullName}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="field is-grouped">
                      <div className="control">
                        <Button
                          className="button is-link"
                          // type="submit"
                          onClick={() => {
                            this.editAppointment();
                            this.setState({ showEdit: false });
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          variant="danger"
                          className="ml-1"
                          onClick={() => {
                            this.setState({ showEdit: false });
                          }}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
