import axios from 'axios'
    
export const API_URL = 'http://localhost:8080/jpa'

class TodoDataService {

    retrieveAllTodos(name) {
        let username = 'user'
        let password = 'password'
        let basicAuthHeader = 'Basic' + window.btoa(username + ':' + password)

        return axios.get(`${API_URL}/users/${name}/todos`, {
            header: {
                authorization : basicAuthHeader
            }
        })
    }

    deleteTodo(name, id) {
        return axios.delete(`${API_URL}/users/${name}/todos/${id}`)
    }

    updateTodo(name, id, todo) {
        return axios.put(`${API_URL}/users/${name}/todos/${id}`, todo)
    }

    retrieveTodo(name, id) {
        return axios.get(`${API_URL}/users/${name}/todos/${id}`);
    }

    createTodo(name, todo) {
        return axios.post(`${API_URL}/users/${name}/todos/`, todo);
    }
}

export default new TodoDataService()