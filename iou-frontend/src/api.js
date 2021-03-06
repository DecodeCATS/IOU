import superagent from 'superagent'
import {API_HOST} from './config'

class Api {
    requestSignup = (username, email, password, firstName, lastName, description) => (
        superagent
            .post(`${API_HOST}/auth/users`)
            .send({username, email, password, firstName, lastName, description})
    )

    requestLogin = (email, password) => (
        superagent
            .post(`${API_HOST}/auth/sessions`)
            .send({email, password})
    )

    requestLogout = (token) => (
        superagent
            .delete(`${API_HOST}/auth/sessions`)
            .set('Authorization', `token ${token}`)
    )

    getUser = (token) => (
        superagent
            .get(`${API_HOST}/auth/me`)
            .set('Authorization', `token ${token}`)
    )
    // =======================================================================
    // *** Notification API calls ***
    // =======================================================================
    getNotifications = (token) => (
        superagent
            .get(`${API_HOST}/notifications`)
            .set('Authorization', `token ${token}`)
    )
    //Delete a notification
    deleteNotification = (token, notificationId) => (
        superagent
            .delete(`${API_HOST}/notifications`)
            .set('Authorization', `token ${token}`)
            .send({notificationId})
    )

    // =======================================================================
    // *** Connection API calls ***
    // =======================================================================
    //Fetch all the connections for the logged user
    getConnections = (token) => (
        superagent
            .get(`${API_HOST}/connections`)
            .set('Authorization', `token ${token}`)
    )

    //Request a new connection
    requestConnection = (token, userId) => (
        superagent
            .post(`${API_HOST}/connections/request`)
            .set('Authorization', `token ${token}`)
            .send({userId})
    )
    
    addConnection = (token, userId) => (
        superagent
            .post(`${API_HOST}/connections/accept`)
            .set('Authorization', `token ${token}`)
            .send({userId})
    )
    
    //Delete a user from the users connections
    deleteConnection = (token, userId) => (
        superagent
            .delete(`${API_HOST}/connections`)
            .set('Authorization', `token ${token}`)
            .send({userId})
    )

    // getBlacklist = (token) => (
    //     superagent
    //         .get(`${API_HOST}/connections/blacklist`)
    //         .set('Authorization', `token ${token}`)
    // )

    addBlacklist = (token, userId) => (
        superagent
            .post(`${API_HOST}/connections/blacklist`)
            .set('Authorization', `token ${token}`)
            .send({userId})
    )

    deleteBlacklist = (token, userId) => (
        superagent
            .delete(`${API_HOST}/connections/blacklist`)
            .set('Authorization', `token ${token}`)
            .send({userId})
    )
    // =======================================================================
    // *** Contract API calls ***
    // =======================================================================
    //Fetch all the contracts for the logged user
    getContracts = (token) => (
        superagent
            .get(`${API_HOST}/contracts/all`)
            .set('Authorization', `token ${token}`)
    )

    getContract = (token, contractId) => (
        superagent
            .get(`${API_HOST}/contracts/${contractId}`)
            .set('Authorization', `token ${token}`)
    )

    addContract = (token, contract) => (
        superagent
            .post(`${API_HOST}/contracts`)
            .set('Authorization', `token ${token}`)
            .send(contract)
    )

    deleteContract = (token, contractId) => (
        superagent
            .delete(`${API_HOST}/contracts/${contractId}`)
            .set('Authorization', `token ${token}`)
            .send({contractId})
    )
    
    searchConnections = (token, username, email, firstName, lastName) => (
        superagent
            .post(`${API_HOST}/connections/search`)
            .set('Authorization', `token ${token}`)
            .send({username, email, firstName, lastName})
    )
    // =======================================================================
    // *** Payment API calls ***
    // =======================================================================
    getActivePayments = (token) => (
        superagent
            .get(`${API_HOST}/payments/active`)
            .set('Authorization', `token ${token}`)
    )
    
    getLatestPayments = (token, numDaysBefore, numDaysAfter) => (
        superagent
            .get(`${API_HOST}/payments/range`)
            .set('Authorization', `token ${token}`)
            .send({numDaysBefore, numDaysAfter})
    )
    
    getContractPayments = (token, contractId) => (
        superagent
            .get(`${API_HOST}/payments/contracts/${contractId}`)
            .set('Authorization', `token ${token}`)
    )

    addPayment = (token, payment) => (
        superagent
            .post(`${API_HOST}/payments`)
            .set('Authorization', `token ${token}`)
            .send(payment)
    )
    
    completePayment = (token, payment) => (
        superagent
            .patch(`${API_HOST}/payments`)
            .set('Authorization', `token ${token}`)
            .send(payment)
    )

    deleteContract = (token, paymentId) => (
        superagent
            .delete(`${API_HOST}/payments`)
            .set('Authorization', `token ${token}`)
            .send({paymentId})
    )

    // =======================================================================
    // *** Organisation API calls ***
    // =======================================================================
    getOrganisations = (token) => (
        superagent
            .get(`${API_HOST}/connections/organisations`)
            .set('Authorization', `token ${token}`)
    )
    // =======================================================================
    // *** Currency API calls ***
    // =======================================================================
    getCurrencies = (token) => (
        superagent
            .get(`${API_HOST}/currencies`)
            .set('Authorization', `token ${token}`)
    )
}

export default new Api();
