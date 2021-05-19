// import config from 'config'
import { config } from '../_config'
import { authHeader } from '../_helpers'

export const userService = {
  login,
  logout,
  getAll,
  register
}

function login (username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }
  console.log('config.API_BASE_URL------', config.API_BASE_URL)
  // ${config.apiUrl}
  return fetch(
    `${config.API_BASE_URL}/users/authenticate`,
    requestOptions
  )
    .then(handleResponse)
    .then(user => {
      // login successful if there's a user in the response
      if (user) {
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        user.authdata = window.btoa(username + ':' + password)
        localStorage.setItem('user', JSON.stringify(user))
      }

      return user
    })
}

function logout () {
  // remove user from local storage to log user out
  localStorage.removeItem('user')
}

function getAll () {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }
  // ${config.apiUrl}
  return fetch(
    `${config.API_BASE_URL}/users`,
    requestOptions
  ).then(handleResponse)
}

function register (username, password, firstName, lastName, license) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, firstName, lastName, license })
  }

  // ${config.apiUrl}
  return fetch(
    `${config.API_BASE_URL}/users/register`,
    requestOptions
  )
    .then(handleResponse)
    .then(user => {
      // registration successful if there's...
      if (user) {
        console.log(user)
        // store user details and basic auth credentials in local storage
        // to keep user logged in between page refreshes
        user.authdata = window.btoa(username + ':' + password)
        localStorage.setItem('user', JSON.stringify(user))
      }

      return user
    })
}

function handleResponse (response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout()
        location.reload(true)
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}
