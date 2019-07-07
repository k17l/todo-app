import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AuthenticationService from '../Authentication/AuthenticationService'
import TodoDataService from '../api/TodoDataService'

class TodoComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: ''
        }
    }

    componentDidMount(){

        if (this.state.id === -1) {
            return
        }

        let username = AuthenticationService.getLoggedInUsername()

        TodoDataService.retrieveTodo(username, this.state.id)
            .then(response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            }))
    }

    validate = (values) => {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 Characters in Description'
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }
        return errors
    }

    onSubmit = (values) => {
        let username = AuthenticationService.getLoggedInUsername()

        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }

        if (this.state.id === -1) {
            TodoDataService.createTodo(username, todo)
                .then(() => this.props.history.push('/todos'))
        } else {
            TodoDataService.updateTodo(username, this.state.id, todo)
                .then(() => this.props.history.push('/todos'))
        }
    }

    render() {

        let { description,targetDate } = this.state

        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik 
                        initialValues = {{description,targetDate}}
                        onSubmit = { this.onSubmit }
                        validate = { this.validate }
                        validateOnBlur = {false}
                        validateOnChange = {false}
                        enableReinitialize = {true}
                    >
                        {
                            (props) => (
                               <Form>
                                   
                                   <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"></Field>
                                        <ErrorMessage name="description" component="div" className = "alert alert-warning" />
                                   </fieldset>
                                   <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"></Field>
                                        <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                                   </fieldset>
                                   <button className="btn btn-success">Save</button>
                               </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default TodoComponent