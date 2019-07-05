import React, { Component } from 'react'

class Login extends Component{

    constructor(Props){
        super(Props)
        this.state = {
            username : "",
            password : ""
        }
    }
    render(){
        return(
            <div>
                User Name : <input type="text" name="username" value = {this.state.username} onChange = {this.handleChange} />
                Password  : <input type="password" name="password" value = {this.state.password} onChange = {this.handleChange} />
                <button>Login</button>
            </div>
        )
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
}

export default Login