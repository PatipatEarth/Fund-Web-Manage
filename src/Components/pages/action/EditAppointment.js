import React, { Component } from 'react'
import Modal from "react-bootstrap/Modal";

export default class EditAppointment extends Component {
    render() {
        return (
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
                <form onSubmit={this.editAppointment}>
                  <div className="field">
                    <label className="label">Title</label>
                    <input
                      className="input"
                      type="text"
                      name="title"
                      placeholder="Add Title"
                      onChange={this.updateInput}
                      value={this.state.title}
                    />
                  </div>
                  <div className="field">
                    <label className="label">Date time</label>
                    <DateTimePicker
                      // amPmAriaLabel={true}
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
        )
    }
}
