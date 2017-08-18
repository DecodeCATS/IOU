import superagent from 'superagent'
import {API_HOST} from './config'

class Api {
    requestSignup = (email, password) => (
        superagent
            .post(`${API_HOST}/auth/users`)
            .send({email, password})
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
    requestConnection = (token, connectionUserId) => (
        superagent
            .post(`${API_HOST}/connections/request`)
            .set('Authorization', `token ${token}`)
            .send({connectionUserId})
    )
    
    addConnection = (token, connectionUserId) => (
        superagent
            .post(`${API_HOST}/connections/`)
            .set('Authorization', `token ${token}`)
            .send({connectionUserId})
    )
    
    //Delete a user from the users connections
    deleteConnection = (token, connectionUserId) => (
        superagent
            .delete(`${API_HOST}/connections`)
            .set('Authorization', `token ${token}`)
            .send({connectionUserId})
    )

    getBlacklist = (token) => (
        superagent
            .get(`${API_HOST}/connections/blacklist`)
            .set('Authorization', `token ${token}`)
    )

    addBlacklist = (token, connectionUserId) => (
        superagent
            .post(`${API_HOST}/connections/blacklist`)
            .set('Authorization', `token ${token}`)
            .send({connectionUserId})
    )

    deleteBlacklist = (token, connectionUserId) => (
        superagent
            .delete(`${API_HOST}/connections/blacklist`)
            .set('Authorization', `token ${token}`)
            .send({connectionUserId})
    )
    // =======================================================================
    // *** Contract API calls ***
    // =======================================================================
    //Fetch all the contracts for the logged user
    getContracts = (token) => (
        superagent
            .get(`${API_HOST}/contracts`)
            .set('Authorization', `token ${token}`)
    )

    getContract = (token, contractId) => (
        superagent
            .get(`${API_HOST}/contracts/${contractId}`)
            .set('Authorization', `token ${token}`)
    )

    addContract = (token, contractId) => (
        superagent
            .post(`${API_HOST}/contracts`)
            .set('Authorization', `token ${token}`)
            .send({contractId})
    )

    deleteContract = (token, contractId) => (
        superagent
            .delete(`${API_HOST}/contracts/${contractId}`)
            .set('Authorization', `token ${token}`)
            .send({contractId})
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
            .get(`${API_HOST}/contracts/${contractId}/payments`)
            .set('Authorization', `token ${token}`)
    )
}

export default new Api();
