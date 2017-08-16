import api from './api';

let localStorage = window.localStorage;

var auth = {

    signup(email, pass) {

        if (localStorage.token) {
            throw new Error('Already logged in'); //revise it later
        }
        else {
            return api.requestSignup(email, pass)
            .catch(err => {
                throw new Error(`Error from server: ${err.message}`);
            });
        }
    },

    login(email, pass) {
        if (localStorage.token) {
            throw new Error('Already logged in');
        }
        else {
            return api.requestLogin(email, pass)
            .then(res => {
                // console.log(`Login res Body=${JSON.stringify(res.body)}`);
                localStorage.token = res.body.token;
            })
            .catch(err => {
                // console.log(`Auth Error=${err}`);
                throw new Error(`Error from server: ${err.message}`);
            });
        }
    },

    getToken() {
        return localStorage.token;
    },

    logout() {
        return api.requestLogout(localStorage.getItem("token"))
            .then(res => localStorage.removeItem("token"))
            .catch(err => localStorage.removeItem("token"));
    },

    isLoggedIn() {
        //console.log(`Token=${localStorage.token}`);
        return !!localStorage.token;
    },

    getUser() {
        // console.log(`Get User Token=${localStorage.token}`)
        if(localStorage.token) {
            return api.getUser(localStorage.token)
            .then(res => {
                //console.log(`Me response=${JSON.stringify(res)}`);
                localStorage.id = res.body.id;
                localStorage.email = res.body.email;
                localStorage.avatarurl = res.body.avatarUrl;
                return localStorage;
            })
            .catch(err => {
                delete localStorage.token;
            });
        }
        else {
            return {};
        }
    },

    getUserId() {
        return localStorage.id;
    
    }
    // getAvatar() {
    //     return localStorage.avatarurl;
    // }
};

export default auth;