import React from 'react';
import {Link,NavLink} from 'react-router-dom';

export default class Friend extends React.Component {
    constructor(props){
        super(props)
        console.log(props)
        this.state=({
            smurf:{},
        })
    }
    componentDidMount(){
        this.getSmurf(this.props.match.params.id ) 
    }
    getSmurf = async (id) =>{
        await this.props.getSmurfs()
        const newSmurf = this.props.smurfs.find(smurf => smurf.id +'' === id)
        this.setState({
            smurf:newSmurf
        })
        }
    
    deleteSmurf =(id) =>{
        this.props.delete(id)
        // eslint-disable-next-line no-restricted-globals
        this.props.history.push({pathname:'/'
        })
       
    }
    render(){
        return (
            <div className="Smurf">
            <Link to='/'>Go Back</Link>
           <h3>{this.state.smurf.name}</h3>
              <strong>{this.state.smurf.height} tall</strong>
          <p>{this.state.smurf.age} smurf years old</p> 
          <NavLink to={`/smurfs/${this.state.smurf.id}/update`}>Update</NavLink>
            <button onClick={() => this.deleteSmurf(this.state.smurf.id)}>Delete</button>
            </div>
          );
        };

    }
