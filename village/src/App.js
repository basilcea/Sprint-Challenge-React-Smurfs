import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import {Route} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      error:''
    };
  }
  getSmurfs = async() =>{
    try {
      const axoisData = await axios.get("http://localhost:3333/smurfs");
      this.setState({ smurfs: axoisData.data });
    } catch (err) {
      this.setState({
        error: err.message
      });
    }
  }
  componentDidMount(){
    this.getSmurfs();
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    console.log(this.state.smurfs)
    return (
      <div className="App">
      <Route exact
      path='/'
      render = {props =>(
        <Smurfs smurfs={this.state.smurfs} {...props}/>
      )}
      />
        <Route 
        path='/smurf-form'
        render = {props =>(
          <SmurfForm getSmurfs={this.getSmurfs} {...props} /> 
        )}
        />
        
       
      </div>
    );
  }
}

export default App;
