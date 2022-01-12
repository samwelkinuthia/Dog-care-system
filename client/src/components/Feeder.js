import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Modal, Container, Row} from 'react-boostrap';
import {
  Button,
  Card,
  CardImg,
  Col,
  Container,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
  Row
} from 'react-bootstrap';
import ModalHeader from "react-bootstrap/ModalHeader";
import DateTimePicker from "react-datetime-picker";
import gs from "../imgs/gs.jpg";
export default class Feeder extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.handleShowFeed = this.handleShowFeed.bind(this);
    this.handleCloseFeed = this.handleCloseFeed.bind(this);
    this.handleShowSchedule = this.handleShowSchedule.bind(this);
    this.handleCloseSchedule = this.handleCloseSchedule.bind(this);
    this.handleShowRecurrent = this.handleShowRecurrent.bind(this);
    this.handleCloseRecurrent = this.handleCloseRecurrent.bind(this);

    // this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      feedback: "",
      time: "",
      isShowingFeed: false,
      isShowingSchedule: false,
      isShowingRecurrent: false,
      date: new Date(),
      min: ""
    };
  }

  handleShowFeed = () => {
    let date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    console.log(strTime)
    axios.get('http://<Raspberry pi IP>:5000/feed').then(response => this.setState({
      feedback: response.data,
      isShowingFeed: true,
      time: strTime
    }));
  }

  handleCloseFeed = () => {
    this.setState({
      isShowingFeed: false
    })
  }
  handleShowSchedule = () => {
    this.setState({
      isShowingSchedule: true
    })
  }
  handleCloseSchedule = () => {
    this.setState({
      isShowingSchedule: false
    })
  }
  handleShowRecurrent = () => {
    this.setState({
      isShowingRecurrent: true
    })
  }
  handleCloseRecurrent = () => {
    this.setState({
      isShowingRecurrent: false
    })
  }

  changeDate = date => {
    this.setState({
      date
    })
  }

  setSchedule = () => {
    axios.post('http://<Raspberry pi IP>:5000/schedule', {time: this.state.date}).then (
      response => {
        this.handleCloseSchedule();
        this.setState({
          feedback: response.data,
          isShowingFeed:true
        })
      }
    )
  }
  setRecurrent = () => {
    axios.post('http://<Raspberry pi IP>:5000/recurrent', {minutes: this.state.min}).then (
        response => {
          this.handleCloseRecurrent();
          this.setState({
            feedback: "Recurrent feeding initialized",
            isShowingRecurrent: true
          })
          setTimeout(this.handleCloseRecurrent, 1000);
        }
    )
  }
  render() {
    return (
      <div>
        <Container>
          <Row style={{border:'0.5px solid #e6ffe6', alignItems:"center", textAlign:"center"}}>
            <Col>
              <Card style={{ width: '18rem', textAlign:'center', margin:"auto" }}>
                <CardImg src={gs}>
                </CardImg>
              </Card>
            </Col>
          </Row>
          <div className="mb-2" style={{margin:"auto", textAlign:"center"}}>
            <Button onClick={this.handleShowFeed} style={{margin:"1em"}} variant="primary" size="sm">
              Feed Now
            </Button>{' '} {' '}
            <Button onClick={this.handleShowSchedule} style={{margin:"1em"}} variant="warning" size="sm">
              Schedule
            </Button>{' '} {' '}
            <Button onClick={this.handleShowRecurrent} style={{margin:"1em"}} variant="danger" size="sm">
              Recurrent
            </Button>
          </div>
        </Container>
        <div>
          <Modal show={this.state.isShowingFeed} onHide={this.handleCloseFeed}>
            <ModalHeader closeButton>
              <ModalTitle>
                Congratulations
              </ModalTitle>
            </ModalHeader>
            <ModalBody>
              {this.state.feedback + " at " + this.state.time}
            </ModalBody>
            <ModalFooter>
              <Button variant={"secondary"} onClick={this.handleCloseFeed}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
          <Modal show={this.state.isShowingSchedule} onHide={this.handleCloseSchedule}>
          <ModalHeader closeButton>
            <ModalTitle>Schedule feeding time</ModalTitle>
          </ModalHeader>
            <ModalBody>
              <DateTimePicker onChange={this.changeDate} value={this.state.date}>
              </DateTimePicker>
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.handleCloseSchedule}>Close</Button>
              <Button onClick={this.setSchedule}>Save</Button>
            </ModalFooter>
          </Modal>
          <Modal show={this.state.isShowingRecurrent} onHide={this.handleCloseRecurrent}>
            <ModalHeader closeButton>
              <ModalTitle>Recurrent feeding time</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <Form.Group as={Col}>
                <Form.Label>Repeat every ___ minutes</Form.Label>
                <Form.Control
                    required
                    type="number"
                    value={this.state.minutes}
                    onChange={e => this.setState({ minutes: e.target.value })}
                />
              </Form.Group>
            </ModalBody>
            <ModalFooter>
              <Button onClick={this.handleCloseRecurrent}>Close</Button>
              <Button onClick={this.setRecurrent}>Save</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}
