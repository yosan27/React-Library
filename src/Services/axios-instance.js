import axios from "axios";
console.log(localStorage.getItem('userFaraday'))
// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'http://localhost:8500/api/',
    // baseURL: 'https://farday-library.herokuapp.com/api/',
});
// Alter defaults after instance has been created
if (localStorage.getItem('userFaraday') != null) {
    const user = JSON.parse(localStorage.getItem('userFaraday'));
    const tokenAuth = `${user.type} ${user.token}`;
    console.log(user)
    console.log(user.token)
    console.log(tokenAuth)
    instance.defaults.headers.common['Authorization'] = `${tokenAuth}`;
}

export default instance;