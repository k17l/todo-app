import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import HelloWorldService from '../api/HelloWorldService'

export default class WelcomeComponent extends Component {

    constructor() {
        super()
        this.state = {
            welcomeMessage: '',
            errorMessage: null
        }
    }

    render() {
        return (
            <div>
                { this.state.errorMessage && <div className="alert alert-danger">{this.state.errorMessage}</div>}
                <h1>Welcome!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}.
                    You can manage your todos <Link to="/todos">here</Link>.
                </div>
                <div className="container">
                    Click here to get a customized welcome message.
                    <button onClick={this.retrieveWelcomeMessage}
                        className="btn btn-success">Get Welcome Message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
            </div>
        )
    }

    retrieveWelcomeMessage = () => {
        HelloWorldService.executeHelloWorldService()
            .then(response => this.handleSuccessfulResponse(response))
            .catch(error => this.handleErrorResponse(error))
    }

    handleSuccessfulResponse = (response) => {
        this.setState({
            welcomeMessage: response.data
        })
    }

    handleErrorResponse = (error) => {
        console.log(error.response)
        this.setState({
            errorMessage: error.response.data.message
        })
    }
}