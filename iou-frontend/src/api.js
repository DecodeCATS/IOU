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
}

export default new Api();
