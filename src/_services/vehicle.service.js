import { authHeader } from '../_helpers'

export const vehicleService = {
  submitData,
  getAll
}

function submitData (carData) {
  console.log('from vehicle.service.ts... your information has been submitted')
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ carData })
  }

  return fetch(`http://localhost:4000/vehicles`, requestOptions)
}

function getAll () {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(`http://localhost:4000/vehicles`, requestOptions)
}
