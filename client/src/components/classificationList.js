import React, {Component} from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
// This will require to npm install axios
import axios from 'axios';
import moment from 'moment';

// console.log(Vocalization);

export default class ClassificationList extends Component {
    // This is the constructor that shall store our data retrieved from the database
    constructor(props) {
        super(props);
        // this.deleteRecord = this.deleteRecord.bind(this);
        this.state = {
            vocalizations: [],
            occurrence: [],
        };
        this.findOcc = this.findOcc.bind(this);
        this.formatTime = this.formatTime.bind(this);
    }

    // This method will get the data from the database.
    componentDidMount() {
        axios
            .get("http://localhost:5000/vocalization/")
            .then((response) => {
                this.setState({ vocalizations: response.data, occurrence: this.findOcc(response.data, "sound") });
                console.log(this.state.occurrence);
            })
            .catch(function (error) {
                console.log(error);
            });
        // console.log(this.formatTime(new Date()));
    }

    findOcc(arr, key){
        let arr2 = [];
        arr.forEach((x)=>{
            // Checking if there is any object in arr2
            // which contains the key value
            if(arr2.some((val)=>{ return val[key] === x[key] })){
                // If yes! then increase the occurrence by 1
                arr2.forEach((k)=>{
                    if(k[key] === x[key]){
                        k["occurrence"]++
                    }
                })
            }else{
                // If not! Then create a new object initialize
                // it with the present iteration key's value and
                // set the occurrence to 1
                let a = {}
                a[key] = x[key]
                a["occurrence"] = 1
                arr2.push(a);
            }
        })
        return arr2
    }
    // This method will delete a record based on the method
    // deleteRecord(id) {
    //     axios.delete("http://localhost:5000/" + id).then((response) => {
    //         console.log(response.data);
    //     });
    //
    //     this.setState({
    //         record: this.state.records.filter((el) => el._id !== id),
    //     });
    // }

    // This method will map out the users on the table
    formatDate(date) {
        return moment(date).format('MMMM Do');
    }
    formatTime(date) {
        return moment(date).format('h:mm a');
    }
    formatAccuracy(item) {
        return `${item.toFixed(0) * 100} %`;
    }
    // This following section will display the table with the records of individuals.
    render() {
        return (
            <div>
                <div className="table">
                        <Container>
                            <Row>
                                {this.state.occurrence.map(item=>(
                                    <Col md={4} key={item.id}>
                                        <Card style={{ width: '18rem' }}>
                                            <Card.Body>
                                                <Card.Title>{item.sound}</Card.Title>
                                                <Card.Title>
                                                    {item.occurrence}
                                                </Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                </div>
                <h5>Vocalizations recorded</h5>
                <table  className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                    <tr>
                        <th>Sound</th>
                        <th>Accuracy</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.vocalizations.map(item=>(
                        <tr key={item.id}>
                            <td key={1}>{item.sound}</td>
                            <td key={2}>{`${Math.trunc(item.value * 100)} %`}</td>
                            <td key={4}>{this.formatDate(item.createtime)}</td>
                            <td key={3}>{this.formatTime(item.createtime)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
        );
    }
}
