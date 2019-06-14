import React, { Component } from 'react';
import axios from 'axios';

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      height: '',
      error:'name',
      value: 'Add to the Village',
      placeName:'Name',
      placeAge:'Age',
      placeHeight:'Height',
      target: '',
      submit:this.addSmurf
    };
  }

  addSmurf = async(event,b) => {
    event.preventDefault();
    // add code to create the smurf using the api
    try{
      await axios.post('http://localhost:3333/smurfs',
      {name:this.state.name, age:this.state.age ,height:this.state.height})
      return this.props.getSmurfs()
    }
    catch(err){
      this.setState({
        error:err.message
      })

    }
  }
    updateSmurf = async(e, id) => {
      e.preventDefault()
      try {
        await axios.put(
          `http://localhost:3333/smurfs/${id}`,
          {
            name: this.state.name,
            age: this.state.age,
            height: this.state.height
          }
        );
        return this.props.getSmurfs();
      } catch (err) {
        this.setState({
          error: err.message
        });
      }
    };
    getSmurfDetails = async(id) => {
      await this.props.getSmurfs()
      const newSmurf = this.props.smurfs.find(smurf => smurf.id === Number(id))
      console.log(newSmurf)
      this.setState({
          placeName: newSmurf.name,
          placeAge: newSmurf.age,
          placeHeight:newSmurf.height,
          value: "Update Smurf",
          target: id,
          submit:this.updateSmurf
      })
    }


  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidMount(){
    
    if(this.props.location.pathname === `/smurfs/${this.props.match.params.id}/update`) {
      this.getSmurfDetails(this.props.match.params.id)
  } 
  }

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={(e) =>this.state.submit(e, this.state.target)}>
          <input
            onChange={this.handleInputChange}
            placeholder={this.state.placeName}
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder={this.state.placeAge}
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder={this.state.placeHeight}
            value={this.state.height}
            name="height"
          />
          <button type="submit">{this.state.value}</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;
