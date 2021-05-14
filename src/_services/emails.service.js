export const emailsService = {
  sendEmail
}

function sendEmail (service, user, password, sender, receiver, userId) {
  console.log('from email.service.ts... your information has been submitted')
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ service, user, password, sender, receiver, userId })
  }

  return fetch('http://localhost:4000/emails', requestOptions)
}
