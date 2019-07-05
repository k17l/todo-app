import React, { Component } from 'react'
import Login from './Login'

class TodoApp extends Component {
    render(){
        return(
            <div>
                My Todo Application
                <Login />
            </div>
        )
    }
}

export default TodoApp