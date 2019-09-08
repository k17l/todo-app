import axios from 'axios'
import { API_URL } from '../constants/constants'
import Cookie from "js-cookie"
export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        return axios.get(`${API_URL}/basicauth`,
            { headers: { authorization: this.createBasicAuthToken(username, password) } })
    }

    executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        })
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }

    // registerSuccessfulLogin(username, password) {
    //     sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    //     this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    // }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        Cookie.set("token", token);
        this.setupAxiosInterceptors(token)
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        Cookie.remove("token")
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null)
            return false
        else
            return true
    }

    getLoggedInUsername() {
        let username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (username === null)
            return ''
        else
            return username
    }

    setupAxiosInterceptors(token) {
        token = Cookie.get("token") ? Cookie.get("token") : token;
        const jwtTokenHeader = this.createJWTToken(token);
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn)
                    config.headers.authorization = jwtTokenHeader
                return config
            }
        )

    }
}

export default new AuthenticationService()