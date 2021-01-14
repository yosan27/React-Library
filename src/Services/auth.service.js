class AuthService {
    API_URL(){
        return 'http://localhost:8500/api/'
        // return 'https://farday-library.herokuapp.com/api/'
    }
    authHeader(){
        const user = JSON.parse(localStorage.getItem('userFaraday'));

        if (user && user.token) {
            return { Authorization: 'Bearer ' + user.token };
        } else {
            return {};
        }
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('userFaraday'));
    }

    getStatusUser() {
        const user = JSON.parse(localStorage.getItem('userFaraday'));
        return user.roles[0]
    }

    getUsername() {
        const user = JSON.parse(localStorage.getItem('userFaraday'));
        return user.username
    }

    getUserCode() {
        const user = JSON.parse(localStorage.getItem('userFaraday'));
        return user.userCode
    }
}

export default new AuthService();