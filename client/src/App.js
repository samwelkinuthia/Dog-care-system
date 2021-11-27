import './App.css';
import React from "react";
// We use Route in order to define the different routes of our application
import { Route } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import Edit from "./components/edit";
import Show from "./components/show";
import Create from "./components/create";
import RecordList from "./components/recordList";
import ClassificationList from "./components/classificationList";
import Feeder from "./components/Feeder";
import Tracker from "./components/Tracker";
import Highlight from "./components/Highlight";

const App = () => {
  return (
    <div>
        <Navbar />
        <Route exact path="/">
        <RecordList />
      </Route>
      <Route path="/edit/:id" component={Edit} />
      <Route path="/show/:id" component={Show} />
      <Route path="/create">
        <Create />
      </Route>
        <Route path="/vocalization">
            <ClassificationList />
        </Route>
        <Route path="/feed">
            <Feeder />
        </Route>
        <Route path="/highlights">
            <Highlight />
        </Route>
        <Route path="/track">
            <Tracker />
        </Route>
    </div>
  );
};

export default App;
