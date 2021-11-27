import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';

export default class Create extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onChangeBreed = this.onChangeBreed.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      breed: "german shepherd",
      age: "",
      type: "indoor",
      gender: "male",
      weight: ""
    };
  }

  // These methods will update the state properties.
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeAge(e) {
    this.setState({
      age: e.target.value,
    });
  }
  onChangeGender(e) {
    this.setState({
      gender: e.target.value,
    });
  }

  onChangeWeight(e) {
    this.setState({
      weight: e.target.value,
    });
  }

  onChangeBreed(e) {
    this.setState({
      breed: e.target.value,
    });
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }




// This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();

    // When post request is sent to the create url, axios will add a new record(newperson) to the database.
    const newdog = {
      name: this.state.name,
      breed: this.state.breed,
      type: this.state.type,
      weight: this.state.weight,
      gender: this.state.gender,
      age: this.state.age,

    };
    console.log(newdog);

    axios
      .post("http://localhost:5000/record/add", newdog)
      .then((res) => console.log(res.data));

    // We will empty the state after posting the data to the database
    this.setState({
      name: "",
      breed: "",
      type: "",
      weight: "",
      gender: "",
      age: ""
    });
  }

  // This following section will display the form that takes the input from the user.
  render() {
    return (
      <div style={{ marginTop: 20 }}>
        <h3>Add dog details</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Dog name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Dog Age: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.age}
              placeholder={"months"}
              onChange={this.onChangeAge}
            />
          </div>
          <div className="form-group">
            <label>Weight: </label>
            <input
                type="number"
                className="form-control"
                value={this.state.weight}
                onChange={this.onChangeWeight}
                placeholder={"kg"}
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Dog Breed:</label>
            <br/>
            <div className="form-check form-check-inline">
              <select value={this.state.breed} onChange={this.onChangeBreed}>
                <option value="german shepherd">German shepherd</option>
                <option value="spitz">Spitz</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="">Gender:</label>
            <br/>
            <div className="form-check form-check-inline">
              <select value={this.state.gender} onChange={this.onChangeGender}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="">Type:</label>
            <br/>
            <div className="form-check form-check-inline">
              <select value={this.state.type} onChange={this.onChangeType}>
                <option value="indoor">Indoor</option>
                <option value="outdoor">Outdoor</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <input
                type="submit"
                value="Add"
                className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
