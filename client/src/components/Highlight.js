import React, {Component} from 'react';
import DogData from './dog.json';
import Lottie from "react-lottie";
import animationData from '../lotties/heart.json';
import DogImage from "../imgs/dog.png";
import gs from "../imgs/gs.jpg";

import {Container, ProgressBar, Row, Col, Card, CardImg} from "react-bootstrap";

class Highlight extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render () {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
            },
        };
        return(
            <Container>
                <Row style={{border:'0.5px solid #e6ffe6'}}>
                    <Col md={4}>
                        <Card style={{ width: '18rem', textAlign:'center' }}>
                            <CardImg src={gs}>
                            </CardImg>
                            <Card.Title>
                                {DogData.name}
                            </Card.Title>
                            <Card.Body>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card style={{ width: '18rem', textAlign:"center" }}>
                            <Card.Body>
                                <Card.Title>
                                    Lifespan
                                </Card.Title>
                                <div>
                                    <Lottie
                                        options={defaultOptions}
                                        height={120}
                                        width={50}
                                    />
                                </div>
                                <Card.Title>
                                    {DogData.lifespan}
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row style={{padding: '2em', alignContent:"center", alignItems:"center",textAlign:'center', border:'1px solid #e6f2ff'}}>
                    <h5>General breed information</h5>
                </Row>
                <Row style={{border:'0.5px solid #e6ffe6'}}>
                    <Col md={5} style={{background: "#e6ffe6", borderRadius:"2%", padding:"1em", margin:"1em", height:"auto"}}>
                        <h6><b>Family Life</b></h6>
                        <br/>
                        <p>Friendly with children</p>
                        <ProgressBar now={DogData.kid_friendly * 20} style={{width: '100%', height:'1em'}}/>
                        <br/> <br/>
                        <p>Friendly with other dogs</p>
                        <ProgressBar now={DogData.dog_friendly * 20} style={{width: '100%', height:'1em'}}/>
                        <br/> <br/>
                        <p>Easy for novice dog owners</p>
                        <ProgressBar now={DogData.novice * 20} style={{width: '100%', height:'1em'}}/>
                        <br/> <br/>
                    </Col>
                    <Col md={5} style={{background: "#e6f2ff", borderRadius:"2%", padding:"1em", margin:"1em"}}>
                        <h6><b>Physical</b></h6>
                        <br/>
                        <p>Cold weather tolerance</p>
                        <ProgressBar variant="info" now={DogData.cold_weather_tolerance * 20} style={{width: '100%', height:'1em', paddingTop:'-2em'}}/>
                        <br/> <br/>
                        <p>Hot weather tolerance</p>
                        <ProgressBar variant="info" now={DogData.hot_weather_tolerance * 20} style={{width: '100%', height:'1em', paddingTop:'-2em'}}/>
                        <br/> <br/>
                        <p>Shedding level</p>
                        <ProgressBar variant="info" now={DogData.shedding * 20} style={{width: '100%', height:'1em', paddingTop:'-2em'}}/>
                        <br/> <br/>
                        <p>Drooling level</p>
                        <ProgressBar variant="info" now={DogData.drooling * 20} style={{width: '100%', height:'1em', paddingTop:'-2em'}}/>
                        <br/> <br/>
                        <p>Weight gain potential</p>
                        <ProgressBar variant="info" now={DogData.weight_gain_potential * 20} style={{width: '100%', height:'1em', paddingTop:'-2em'}}/>
                        <br/> <br/>
                    </Col>
                    <Col md={5} style={{background: "#ffffe6", borderRadius:"2%", padding:"1em", margin:"1em"}}>
                        <h6><b>Social</b></h6>
                        <br/>
                        <p>Friendly with strangers</p>
                        <ProgressBar  variant="warning" now={DogData.stranger_friendly * 20} style={{width: '100%', height:'1em'}}/>
                        <br/> <br/>
                        <p>Protective / Watchdog</p>
                        <ProgressBar  variant="warning" now={DogData.protective * 20} style={{width: '100%', height:'1em'}}/>
                        <br/> <br/>
                        <p>Playfulness</p>
                        <ProgressBar  variant="warning" now={DogData.playfulness * 20} style={{width: '100%', height:'1em'}}/>
                        <br/> <br/>
                    </Col>
                    <Col md={5} style={{background: "#ffebe6", borderRadius:"2%", padding:"1em", margin:"1em"}}>
                        <h6><b>Personality</b></h6>
                        <br/>
                        <p>Trainability</p>
                        <ProgressBar variant="danger" now={DogData.trainability * 20} style={{width: '100%', height:'1em'}}/>
                        <br/> <br/>
                        <p>Intelligence</p>
                        <ProgressBar  variant="danger" now={DogData.intelligence * 20} style={{width: '100%', height:'1em'}}/>
                        <br/> <br/>
                        <p>Bark level</p>
                        <ProgressBar  variant="danger" now={DogData.bark_level * 20} style={{width: '100%', height:'1em'}}/>
                        <br/> <br/>
                        <p>Energy level</p>
                        <ProgressBar variant="danger" now={DogData.energy_level * 20} style={{width: '100%', height:'1em'}}/>
                        <br/> <br/>
                        <p>Exercise needs</p>
                        <ProgressBar  variant="danger" now={DogData.energy_level * 20} style={{width: '100%', height:'1em'}}/>
                        <br/> <br/>
                    </Col>
                </Row>
                <Row style={{padding: '2em', alignContent:"center", alignItems:"center",textAlign:'center', border:'1px solid #e6f2ff'}}>
                    <h5>General breed information</h5>
                </Row>
            </Container>
        )
    }
}
export default Highlight;