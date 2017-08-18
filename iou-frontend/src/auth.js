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
            .catch(err => {
                localStorage.removeItem("token");
                throw new Error(err);
            });
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
                // localStorage.id = res.body.id;
                // localStorage.email = res.body.email;
                // localStorage.avatarUrl = res.body.avatarUrl;
                // return localStorage;
                return res.body;
            })
            .catch(err => {
                delete localStorage.token;
                throw new Error(err);
            });
        }
        else {
            return {};
        }
    },

    getUserId() {
        return localStorage.id;
    
    },
    // getAvatar() {
    //     return localStorage.avatarurl;
    // }
    // =======================================================================
    // *** Notification API calls ***
    // =======================================================================
    getNotifications() {
        if(localStorage.token) {
            return api.getNotifications(localStorage.token)
            .then(res => {
                console.log(`Success, Notifications=`,res.body);
                return res.body; //Fix to send Notifications
            })
            .catch(err => {
                throw new Error(`Error from server: ${err.message}`);
            });
        }
        else {
            throw new Error(`Not logged in!`);
        }
    },

    deleteNotification(notificationId) {
        return api.deleteNotification(localStorage.token, notificationId)
        .then(res=> {
            return res.body; //No body expected for delete
        })
        .catch(err => {
            throw new Error(`Error from server: ${err.message}`);
        });
    },
    // =======================================================================
    // *** Connection API calls ***
    // =======================================================================
    getConnections() {
        // console.log("Getting Connections!!!");
        // localStorage.token = 'Test!'; //For testing
        if(localStorage.token) {
            return api.getConnections(localStorage.token)
            .then(res => {
                console.log(`Success, Connections=`,res.body);
                return res.body; //Fix to send Connections
            })
            .catch(err => {
                throw new Error(`Error from server: ${err.message}`);
            });
        }
        else {
            throw new Error(`Not logged in!`);
        }
    },
    
    requestConnection(connectionUserId) {
        return api.requestConnection(localStorage.token, connectionUserId)
        .then(res=> {
            return res.body; //No body expected for delete
        })
        .catch(err => {
            throw new Error(`Error from server: ${err.message}`);
        });
    },
    
    addConnection(connectionUserId) {
        return api.addConnection(localStorage.token, connectionUserId)
        .then(res=> {
            return res.body;
        })
        .catch(err => {
            throw new Error(`Error from server: ${err.message}`);
        });
    },
    
    deleteConnection(connectionUserId) {
        return api.deleteConnection(localStorage.token, connectionUserId)
        .then(res=> {
            return res.body; //No body expected for delete
        })
        .catch(err => {
            throw new Error(`Error from server: ${err.message}`);
        });
    },

    getBlacklist() {
        // console.log("Getting Connections!!!");
        // localStorage.token = 'Test!'; //For testing
        if(localStorage.token) {
            return api.getBlacklist(localStorage.token)
            .then(res => {
                // console.log(`Success, Blacklist=`,res.body);
                return res.body; //Fix to send Connections
            })
            .catch(err => {
                throw new Error(`Error from server: ${err.message}`);
            });
        }
        else {
            throw new Error(`Not logged in!`);
        }
    },
    
    addBlacklist(connectionUserId) {
        return api.addBlacklist(localStorage.token, connectionUserId)
        .then(res=> {
            return res.body;
        })
        .catch(err => {
            throw new Error(`Error from server: ${err.message}`);
        });
    },
    
    deleteBlacklist(connectionUserId) {
        return api.deleteBlacklist(localStorage.token, connectionUserId)
        .then(res=> {
            return res.body; //No body expected for delete
        })
        .catch(err => {
            throw new Error(`Error from server: ${err.message}`);
        });
    },
    // =======================================================================
    // *** Contract API calls ***
    // =======================================================================
    getContracts() {
        // console.log("Getting Connections!!!");
        localStorage.token = 'Test!'; //For testing
        if(localStorage.token) {
            return api.getContracts(localStorage.token)
                .then(res => {
                    console.log(`Success, Contracts=`,res.body);
                    return res.body; //Fix to send Contracts
                })
                .catch(err => {
                    throw new Error(`Error from server: ${err.message}`);
                });
        }
        else {
            throw new Error(`Not logged in!`);
        }
    }


};

export default auth;