import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Modal, Container, Row} from 'react-boostrap';
import {
    Button,
    Card,
    Col, Container,
    Form,
    FormControl,
    InputGroup,
    Modal,
    ModalBody,
    ModalFooter,
    ModalTitle, Row
} from 'react-bootstrap';

import ModalHeader from "react-bootstrap/ModalHeader";
import DateTimePicker from "react-datetime-picker";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import CardHeader from "react-bootstrap/CardHeader";
import vacc from "../imgs/4act.png";
import deworm from "../imgs/5act.png";
import groom from "../imgs/3act.png";
import moment from "moment";

export default class Tracker extends Component {
    // This is the constructor that stores the data.
    constructor(props) {
        super(props);

        this.handleShowVaccine = this.handleShowVaccine.bind(this);
        this.handleCloseVaccine = this.handleCloseVaccine.bind(this);
        this.handleShowGrooming = this.handleShowGrooming.bind(this);
        this.handleCloseGrooming = this.handleCloseGrooming.bind(this);
        this.handleShowDeworming = this.handleShowDeworming.bind(this);
        this.handleCloseDeworming = this.handleCloseDeworming.bind(this);
        this.onChangeVaccineName =this.onChangeVaccineName.bind(this);
        this.onChangeVaccineTimer =this.onChangeVaccineTimer.bind(this);
        this.formatDate = this.formatDate.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            feedback: "",
            time: "",
            isShowingVaccine: false,
            isShowingGrooming: false,
            isShowingDeworming: false,
            date: new Date(),
            vaccine: "",
            vaccines: [],
            groomys: [],
            dwormys: [],
            vaccine_timer: ""
        };
    }

    handleShowVaccine = () => {
        // let date = new Date();
        // var hours = date.getHours();
        // var minutes = date.getMinutes();
        // var ampm = hours >= 12 ? 'pm' : 'am';
        // hours = hours % 12;
        // hours = hours ? hours : 12; // the hour '0' should be '12'
        // minutes = minutes < 10 ? '0'+minutes : minutes;
        // var strTime = hours + ':' + minutes + ' ' + ampm;
        // console.log(strTime)
        // axios.get('http://localhost:5000/feed').then(response => this.setState({
        //     feedback: response.data,
        //     isShowingVaccine: true,
        // }));
        this.setState({
            isShowingVaccine: true
        })
    }
    formatDate(date) {
        return moment(date).format('MMMM Do');
    }
    handleCloseVaccine = () => {
        this.setState({
            isShowingVaccine: false
        })
    }
    handleShowGrooming = () => {
        this.setState({
            isShowingGrooming: true
        })
    }
    handleCloseGrooming = () => {
        this.setState({
            isShowingGrooming: false
        })
    }
    handleShowDeworming = () => {
        this.setState({
            isShowingDeworming: true
        })
    }
    handleCloseDeworming = () => {
        this.setState({
            isShowingDeworming: false
        })
    }

    changeDate = date => {
        this.setState({
            date
        })
    }
    onChangeVaccineName = (e) => {
        this.setState({
            vaccine_name: e.target.value,
        })
    }
    onChangeVaccineTimer = (e) => {
        this.setState({
            vaccine_timer: e.target.value,
        })
    }

    componentDidMount() {
        axios
            .get("http://localhost:5000/tracker")
            .then((response) => {
                this.setState({ vaccines: response.data });
                console.log(this.state.vaccines);
            })
            .catch(function (error) {
                console.log(error);
            });
        axios
            .get("http://localhost:5000/groomy")
            .then((response) => {
                this.setState({ groomys: response.data });
                console.log(this.state.groomys);
            })
            .catch(function (error) {
                console.log(error);
            });
        axios
            .get("http://localhost:5000/dwormy")
            .then((response) => {
                this.setState({ dwormys: response.data });
                console.log(this.state.dwormys);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    setVaccine = () => {
        axios.post('http://localhost:5000/vaccine', {time: this.state.date, vaccine_name: this.state.vaccine_name, vaccine_timer:this.state.vaccine_timer}).then (
            response => {
                this.handleCloseVaccine();
                this.setState({
                    feedback: response.data,
                    isShowingVaccine:false
                })
            }
        )
        // axios.post('http://localhost:5000/vaccine_db', {vaccine: this.state.vaccine}).then (
        //     response => {
        //         this.handleCloseVaccine();
        //         this.setState({
        //             isShowingVaccine:true
        //         })
        //     }
        // )

        setTimeout(this.handleCloseVaccine, 1000);
    }

    setDeworming = () => {
        axios.post('http://localhost:5000/deworm', {time: this.state.date}).then (
            response => {
                this.handleShowDeworming();
                this.setState({
                    feedback: response.data,
                    isShowingDeworming:true
                })
            }
        )
        setTimeout(this.handleCloseDeworming, 1000);

    }

    setGrooming = () => {
        axios.post('http://localhost:5000/groom', {time: this.state.date}).then (
            response => {
                this.handleShowGrooming();
                this.setState({
                    feedback: response.data,
                    isShowingGrooming:true
                })
            }
        )
        setTimeout(this.handleCloseGrooming, 1000);

    }

    render() {
        return (
                <Container>
                    <Row>
                        <Col md={4}>
                            <Card>
                                <CardHeader>Track vaccine</CardHeader>
                                <Card.Body>
                                    <p><i>Vaccines for canine parvovirus, distemper, canine hepatitis and rabies are considered core vaccines. </i></p>
                                    <ul>
                                        <li>Rabies - every 3 years for adults</li>
                                        <li>Parvovirus - once after 15 weeks</li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <CardHeader>Track Deworming</CardHeader>
                                <Card.Body>
                                    <p><i>Every 3 months</i></p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <CardHeader>Track Spraying</CardHeader>
                                <Card.Body>
                                    <p><i>Repeated every 4 weeks</i></p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <br/>
                    <hr/>
                    <Row>
                        <Col md={4} style={{border:"2px solid white"}}>
                            <div style={{textAlign:"center", alignContent:"center", cursor:"pointer"}} onClick={this.handleShowVaccine}>
                                <img src={vacc} className={"vacc"} height={100} width={100} alt=""/>
                            </div>
                        </Col>
                        <Col md={4} style={{border:"2px solid white"}}>
                            <div style={{textAlign:"center", alignContent:"center", cursor:"pointer"}} onClick={this.handleShowDeworming}>
                                <img src={deworm} className={"vacc"} height={100} width={100} alt=""/>
                            </div>
                        </Col>
                        <Col md={4} style={{border:"2px solid white"}}>
                            <div style={{textAlign:"center", alignContent:"center", cursor:"pointer"}} onClick={this.handleShowGrooming}>
                                <img src={groom} className={"vacc"} height={100} width={100} alt=""/>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <div>
                            <Modal show={this.state.isShowingVaccine} onHide={this.handleCloseVaccine}>
                                <ModalHeader closeButton>
                                    <ModalTitle>Set vaccine reminder</ModalTitle>
                                </ModalHeader>
                                <ModalBody>
                                    <DateTimePicker onChange={this.changeDate} value={this.state.date}>
                                    </DateTimePicker>
                                    {this.state.feedback}
                                    <div className="form-group">
                                        <label>Vaccine Name: </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={this.state.vaccine_name}
                                            onChange={this.onChangeVaccineName}
                                        />
                                        <label>Repeat after: </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={this.state.vaccine_timer}
                                            onChange={this.onChangeVaccineTimer}
                                        />

                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={this.handleCloseVaccine}>Close</Button>
                                    <Button onClick={this.setVaccine}>Save</Button>
                                </ModalFooter>
                            </Modal>
                            <Modal show={this.state.isShowingDeworming} onHide={this.handleCloseDeworming}>
                                <ModalHeader closeButton>
                                    <ModalTitle>Set deworming reminder</ModalTitle>
                                </ModalHeader>
                                <ModalBody>
                                    <DateTimePicker onChange={this.changeDate} value={this.state.date}>
                                    </DateTimePicker>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={this.handleCloseDeworming}>Close</Button>
                                    <Button onClick={this.setDeworming}>Save</Button>
                                </ModalFooter>
                            </Modal>
                            <Modal show={this.state.isShowingGrooming} onHide={this.handleCloseGrooming}>
                                <ModalHeader closeButton>
                                    <ModalTitle>Set grooming reminder</ModalTitle>
                                </ModalHeader>
                                <ModalBody>
                                    <DateTimePicker onChange={this.changeDate} value={this.state.date}>
                                    </DateTimePicker>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={this.handleCloseGrooming}>Close</Button>
                                    <Button onClick={this.setGrooming}>Save</Button>
                                </ModalFooter>
                            </Modal>
                            <br/><br/>
                            <Container>
                                <Row>
                                    <h5>Vaccination history</h5>
                                    <table  className="table table-striped" style={{ marginTop: 20 }}>
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Date</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.vaccines.map(item=>(
                                            <tr key={item.id}>
                                                <td key={1}>{item.vaccine_name}</td>
                                                <td key={2}>{this.formatDate(item.vaccine_timer)}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </Row>
                                <br/><br/>
                                <Row>
                                    <h5>Deworming history</h5>
                                    <table  className="table table-striped" style={{ marginTop: 20 }}>
                                        <thead>
                                        <tr>
                                            <th>Date</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.dwormys.map(item=>(
                                            <tr key={item.id}>
                                                <td key={1}>{this.formatDate(item.deworming_date)}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </Row>
                                <br/><br/>
                                <Row>
                                    <h5>Grooming history</h5>
                                    <table  className="table table-striped" style={{ marginTop: 20 }}>
                                        <thead>
                                        <tr>
                                            <th>Date</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.groomys.map(item=>(
                                            <tr key={item.id}>
                                                <td key={1}>{this.formatDate(item.grooming)}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </Row>
                            </Container>
                        </div>
                    </Row>
            </Container>
        );
    }
}
