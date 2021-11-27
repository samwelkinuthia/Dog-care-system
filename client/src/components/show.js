import React,  {Component}  from "react";
// This will require to npm install axios
import axios from "axios";
import {Link} from "react-router-dom";
import {Card, CardImg, Col, Container, Row} from "react-bootstrap";

class Show extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
    this.state = {
      record: {}
    };
  }
  // This will get the record based on the id from the database.
  componentDidMount() {
    console.log("Mounted Successfully");
    axios
      .get("http://localhost:5000/record/" + this.props.match.params.id)
      .then((response) => {
        this.setState({ record: response.data });
        console.log(this.state);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // This following section will display the update-form that takes the input from the user to update the data.
  render() {
    return (
      <div>
        <Container>
          <Row style={{border:'0.5px solid #e6ffe6'}}>
            <Col md={4}>
              <Card style={{ width: '18rem', textAlign:'center' }}>
                <Card.Title>

                </Card.Title>
                <Card.Body>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card style={{ width: '18rem', textAlign:"center" }}>
                <Card.Body>
                  <Card.Title>
                  </Card.Title>
                  <div>
                  </div>
                  <Card.Title>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.

// export default withRouter(Show);
export default Show;