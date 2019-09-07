import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AunthenticationService from '../Authentication/AuthenticationService.js'

import { withRouter } from 'react-router'



class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AunthenticationService.isUserLoggedIn()

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="http://kalaiselvan.me/" className="navbar-brand" target="_blank" rel="noopener noreferrer">kalaiselvan.me</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && <li><Link className="nav-link" to="/welcome/admin">Home</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AunthenticationService.logout}>Logout</Link></li>}
                </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(HeaderComponent)