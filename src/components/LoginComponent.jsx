import React, { Component } from 'react'
import AunthenticationService from '../Authentication/AuthenticationService'

class LoginComponent extends Component {

    constructor(Props) {
        super(Props)
        this.state = {
            username: '',
            password: '',
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

    loginClicked = () => {
        // if (this.state.username === 'user' && this.state.password === 'password') {
        //     this.props.history.push(`/welcome/${this.state.username}`)
        //     AunthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        // }
        // else {
        //     this.setState({
        //         showFailureMessage: true
        //     })
        // }

        // AunthenticationService.executeBasicAuthenticationService(this.state.username, this.state.password)
        //     .then(
        //         () => {
        //             AunthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        //             this.props.history.push(`/welcome/${this.state.username}`)
        //         }
        //     ).catch(() => {
        //         this.setState({
        //             showFailureMessage: true
        //         })
        //     })

        AunthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                AunthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                this.props.history.push(`/welcome/${this.state.username}`)
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })
    }
}

export default LoginComponent