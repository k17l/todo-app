class AuthenticationService {

    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem('authenticatedUser', username)
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser')
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user === null)
            return false
        else
            return true
    }

    getLoggedInUsername() {
        let username = sessionStorage.getItem('authenticatedUser')
        if (username === null)
            return ''
        else
            return username
    }
}

export default new AuthenticationService()