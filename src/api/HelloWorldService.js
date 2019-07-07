import axios from 'axios'

class HelloWorldService{

    executeHelloWorldService(){
        return axios.get("http://localhost:8080/hello-world")
    }

    executeHelloWorldPathVariableService(name){
        return axios.get(`http://localhost:8080/hello-world-bean/${name}`)
    }
}

export default new HelloWorldService()