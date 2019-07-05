import React, { Component } from 'react'

class LoginComponent extends Component{

    constructor(Props){
        super(Props)
        this.state = {
            username : "",
            password : "",
            showFailureMessage : false,
            showSuccessMessage : false
        }
    }
    render(){
        return(
            <div>
                {this.state.showSuccessMessage && <div>Login Success</div>}
                {this.state.showFailureMessage && <div>Login Failure</div>}
                User Name : <input type="text" name="username" value = {this.state.username} onChange = {this.handleChange} />
                Password  : <input type="password" name="password" value = {this.state.password} onChange = {this.handleChange} />
                <button onClick = {this.loginClicked}>Login</button>
            </div>
        )
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    loginClicked = (event) => {
        if(this.state.username === 'admin' && this.state.password === 'admin'){
            this.props.history.push(`/welcome/${this.state.username}`)
        }
        else{
            console.log('failure')
            this.setState({
                showFailureMessage : true,
                showSuccessMessage : false
            })
        }
    }
}

export default LoginComponent