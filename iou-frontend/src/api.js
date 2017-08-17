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
    
    //Fetch all the connections for the logged user
    getConnections = (token) => (
        superagent
            .get(`${API_HOST}/connections`)
            .set('Authorization', `token ${token}`)
    )

    //Delete a user from the users connections
    deleteConnection = (token, userId) => (
        superagent
            .delete(`${API_HOST}/connections`)
            .set('Authorization', `token ${token}`)
            .send({userId})
    )
    //Fetch all the contracts for the logged user
    getContracts = (token) => (
        superagent
            .get(`${API_HOST}/contracts`)
            .set('Authorization', `token ${token}`)
    )
}

export default new Api();
