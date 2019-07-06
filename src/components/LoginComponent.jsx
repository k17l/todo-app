import React, { Component } from 'react'
import AunthenticationService from '../Authentication/AuthenticationService'

class LoginComponent extends Component {

    constructor(Props) {
        super(Props)
        this.state = {
            username: "admin",
            password: "admin",
            showFailureMessage: false,
        }
    }
    render() {
        return (
            <div>
                {this.state.showFailureMessage && <div className="alert alert-warning">Invalid Credentials</div>}
                <h1>Login</h1>
                <div className="form-group col-xs-2">
                    <label htmlFor="username">User Name</label>
                    <input type="text" name="username" value={this.state.username} onChange={this.handleChange} className="form-control" id="username" placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" id="password" placeholder="Enter Password" />
                </div>
                <button type="submit" className="btn btn-primary mb-2" onClick={this.loginClicked}>Login</button>
            </div>
        )
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    loginClicked = (event) => {
        if (this.state.username === 'admin' && this.state.password === 'admin') {
            this.props.history.push(`/welcome/${this.state.username}`)
            AunthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
        }
        else {
            this.setState({
                showFailureMessage: true
            })
        }
    }
}

export default LoginComponent