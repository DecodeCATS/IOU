import api from './api';

let localStorage = window.localStorage;

var auth = {

    signup(username, email, password, firstName, lastName, description) {
        return api.requestSignup(username, email, password, firstName, lastName, description)
        .catch(err => {
            // console.log(`Auth Error=${JSON.stringify(err)}`);
            throw new Error(`Error from server: ${err.text}`);
        });
    },

    login(email, pass) {
        return api.requestLogin(email, pass)
        .then(res => {
            // console.log(`Login res Body=${JSON.stringify(res.body)}`);
            localStorage.token = res.body.token;
        })
        .catch(err => {
            // console.log("ERROR!!!!");
            // console.log(err);
            throw new Error(`Error from server: ${err}`);
        });
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
        return api.getNotifications(localStorage.token)
        .then(res => {
            return res.body; //Fix to send Notifications
        })
        .catch(err => {
            throw new Error(`Error from server: ${err.message}`);
        });
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
        return api.getConnections(localStorage.token)
        .then(res => {
            // console.log(`Success, Connections=`,res.body);
            return res.body; //Fix to send Connections
        })
        .catch(err => {
            throw new Error(`Error from server: ${err.message}`);
        });
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

    // getBlacklist() {
    //     // console.log("Getting Connections!!!");
    //     // localStorage.token = 'Test!'; //For testing
    //     if(localStorage.token) {
    //         return api.getBlacklist(localStorage.token)
    //         .then(res => {
    //             // console.log(`Success, Blacklist=`,res.body);
    //             return res.body; //Fix to send Connections
    //         })
    //         .catch(err => {
    //             throw new Error(`Error from server: ${err.message}`);
    //         });
    //     }
    //     else {
    //         throw new Error(`Not logged in!`);
    //     }
    // },
    
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
    
    searchConnections(username, email, firstName, lastName) {
        return api.searchConnections(localStorage.token, username, email, firstName, lastName)
        .then(res=> {
            return res.body;
        })
        .catch(err => {
            throw new Error(`Error from server: ${err.message}`);
        });
    },
    // =======================================================================
    // *** Contract API calls ***
    // =======================================================================
    getContracts() {
        return api.getContracts(localStorage.token)
        .then(res => {
            return res.body;
        })
        .catch(err => {
            throw new Error(`Error from server: ${err.message}`);
        });
    },

    getContract(contractId) {
        return api.getContract(localStorage.token, contractId)
        .then(res => {
            return res.body; //Fix to send Contracts
        })
        .catch(err => {
            throw new Error(`Error from server: ${err.message}`);
        });
    },
    
    addContract(contract) {
        return api.addContract(localStorage.token, contract)
        .then(res => {
            return res.body;
        })
        .catch(err => {
            throw new Error(`Error from server: ${err.message}`);
        });
    },

    deleteContract(contractId) {
        return api.deleteContract(localStorage.token, contractId)
        .then(res=> {
            return res.body;
        })
        .catch(err => {
            throw new Error(`Error from server: ${err.message}`);
        });
    },
    // =======================================================================
    // *** Payment API calls ***
    // =======================================================================
    getActivePayments() {
        return api.getActivePayments(localStorage.token)
        .then(res => {
            // console.log(`Success, Payments=`,res.body);
            return res.body; //Fix to send Payments
        })
        .catch(err => {
            throw new Error(`Error from server: ${err.message}`);
        });
    },
    
    getLatestPayments(numDaysBefore, numDaysAfter) {
        return api.getLatestPayments(localStorage.token, numDaysBefore, numDaysAfter)
        .then(res => {
            // console.log(`Success, Payments=`,res.body);
            return res.body; //Fix to send Payments
        })
        .catch(err => {
            throw new Error(`Error from server: ${err.message}`);
        });
    },
    
    getContractPayments(contractId) {
        return api.getContractPayments(localStorage.token, contractId)
        .then(res => {
            // console.log(`Success, Payments=`,res.body);
            return res.body; //Fix to send Payments
        })
        .catch(err => {
            throw new Error(`Error from server: ${err.message}`);
        });
    },
    
    addPayment(payment) {
        return api.addPayment(localStorage.token, payment)
        .then(res => {
            return res.body;
        })
        .catch(err => {
            throw new Error(`Error from server: ${err.message}`);
        });
    },

    deletePayment(paymentId) {
        return api.deleteContract(localStorage.token, paymentId)
        .then(res=> {
            return res.body;
        })
        .catch(err => {
            throw new Error(`Error from server: ${err.message}`);
        });
    },
    
    // =======================================================================
    // *** Organisation API calls ***
    // =======================================================================
    getOrganisations() {
        return api.getOrganisations(localStorage.token)
        .then(res => {
            // console.log(`Success, Connections=`,res.body);
            return res.body; //Fix to send Connections
        })
        .catch(err => {
            throw new Error(`Error from server: ${err.message}`);
        });
    },
    
    // =======================================================================
    // *** Currency API calls ***
    // =======================================================================
    getCurrencies() {
        return api.getCurrencies(localStorage.token)
        .then(res => {
            // console.log(`Success, Connections=`,res.body);
            return res.body; //Fix to send Connections
        })
        .catch(err => {
            throw new Error(`Error from server: ${err.message}`);
        });
    }
};

export default auth;