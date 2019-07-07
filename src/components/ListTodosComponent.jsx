import React, { Component } from 'react'
import TodoDataService from '../api/TodoDataService'
import AuthenticationService from '../Authentication/AuthenticationService';

class ListTodosComponent extends Component {
    constructor() {
        super()
        this.state = {
            todos: [],
            message: null
        }
    }
    componentDidMount() {
        this.refreshTodos()
    }

    refreshTodos = () => {
        let username = AuthenticationService.getLoggedInUsername()
        TodoDataService.retrieveAllTodos(username)
        .then(response => {
            this.setState({ todos : response.data})
        })
    }

    deleteTodoClicked = (id) => {
        let username = AuthenticationService.getLoggedInUsername()
        TodoDataService.deleteTodo(username,id)
        .then(resposne => {
            this.setState({
                message : `Delete of Todo ${id} Successful`
            })
            this.refreshTodos()
        })
    }

    updateTodoClicked = (id) => {
        this.props.history.push(`/todos/${id}`)
    }

    addTodoClicked = () => {
        this.props.history.push(`/todos/-1`)
    }

    render() {
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>IsCompleted?</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo =>
                                        <tr key={todo.id}>
                                            <td>{todo.description}</td>
                                            <td>{todo.targetDate}</td>
                                            <td>{todo.done.toString()}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListTodosComponent