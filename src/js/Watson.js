import axios from 'axios'

const BASE_URL = 'http://localhost:8080/v1'

export default class Watson {
  static ask(question, workspace_id) {
    return axios.post(`${BASE_URL}/answer`, { question, workspace_id })
  }

  static login(name, email) {
    return axios.post(`${BASE_URL}/login`, { name, email })
  }
}
