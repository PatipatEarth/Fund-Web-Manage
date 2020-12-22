import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css"
import Loginpage from "./Components/pages/Loginpage";
import Homepage from "./Components/pages/Homepage";
import Dentistpage from "./Components/pages/Dentistpage";
import sendData from "./Components/service/sendData"
import PatientPage from "./Components/pages/Patientpage";
import Schedulepage from "./Components/pages/Schedulepage";






export default function App() {
  return (
    <div>
               
      <Router>
        <Route exact path="/" component={Loginpage} />
        <Route path="/Homepage" component={Homepage} />
        <Route path="/Dentistpage" component={Dentistpage} />
        <Route path="/Patientpage" component={PatientPage}/>               
        <Route path="/sendData" component={sendData} />
        <Route path="/Schedulepage" component={Schedulepage}/>                       
      </Router>
    </div>
  );
}
