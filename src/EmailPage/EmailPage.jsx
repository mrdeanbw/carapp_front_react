import React from 'react'
import { emailsService } from '../_services'

class EmailPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {}, //added
      service: '',
      emailUser: '',
      password: '',
      sender: '',
      receiver: '',
      submitted: false,
      loading: false,
      error: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.setState({
      user: JSON.parse(localStorage.getItem('user'))
    })
  }

  handleChange (e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault()

    this.setState({ submitted: true })
    const { service, emailUser, password, sender, receiver, user } = this.state

    // stop here if form is invalid
    if (!(service && emailUser && password && sender && receiver)) {
      return
    }

    let alertMessage =
      'Is this information correct?\nService: ' +
      service +
      '\nUsername ' +
      emailUser +
      '\nPassword: ' +
      password +
      '\nSender: ' +
      sender +
      '\nReceiver: ' +
      receiver

    if (confirm(alertMessage)) {
      console.log('Email message sent!')
    }
    this.setState({ loading: true })

    emailsService.sendEmail(
      service,
      emailUser,
      password,
      sender,
      receiver,
      user.id
    )
  }

  render () {
    const {
      service,
      emailUser,
      password,
      sender,
      receiver,
      submitted,
      error
    } = this.state
    return (
      <div className='jumbotron container col-md-6 float-right'>
        <div className='alert alert-info'>
          An email will be sent if the information is correct. Please check on
          your email security settings to allow less secure apps.
        </div>
        <h2>Email form</h2>
        <div className='ui segment'>
          <form name='form' onSubmit={this.handleSubmit} className='ui form'>
            <div
              className={
                'form-group' + submitted && !service ? ' has-error' : ''
              }
            >
              <label htmlFor='service'>Service:</label>
              <input
                type='text'
                className='form-control'
                name='service'
                value={this.state.service}
                onChange={this.handleChange}
                placeholder='eg: gmail'
              />
              {submitted && !service && (
                <div className='help-block'>service is required</div>
              )}
            </div>
            <div
              className={
                'form-group' + submitted && !emailUser ? ' has-error' : ''
              }
            >
              <label htmlFor='service'>Username:</label>
              <input
                type='text'
                className='form-control'
                name='emailUser'
                value={this.state.emailUser}
                onChange={this.handleChange}
                placeholder='eg: alexanderlschalk'
              />
              {submitted && !emailUser && (
                <div className='help-block'>username is required</div>
              )}
            </div>
            <div
              className={
                'form-group' + (submitted && !password ? ' has-error' : '')
              }
            >
              <label htmlFor='password'>
                Password (for your email address)
              </label>
              <input
                type='password'
                className='form-control'
                name='password'
                value={this.state.password}
                onChange={this.handleChange}
                placeholder='required'
              />
              {submitted && !password && (
                <div className='help-block'>password is required</div>
              )}
            </div>
            <div
              className={
                'form-group' + (submitted && !sender ? ' has-error' : '')
              }
            >
              <label htmlFor='sender'>Sender (for your email address)</label>
              <input
                type='text'
                className='form-control'
                name='sender'
                value={this.state.sender}
                onChange={this.handleChange}
                placeholder='<username>@<service>.com'
              />
              {submitted && !sender && (
                <div className='help-block'>sender is required</div>
              )}
            </div>
            <div
              className={
                'form-group' + (submitted && !receiver ? ' has-error' : '')
              }
            >
              <label htmlFor='receiver'>
                Receiver (for your email address)
              </label>
              <input
                type='text'
                className='form-control'
                name='receiver'
                value={this.state.receiver}
                onChange={this.handleChange}
                placeholder='recommended: same email as sender'
              />
              {submitted && !receiver && (
                <div className='help-block'>receiver is required</div>
              )}
            </div>
            {submitted && <div className='help-block'>Email was sent!</div>}
            <div className='form-group' style={{ marginTop: '1rem' }}>
              <button className='btn btn-primary'>Send Email</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export { EmailPage }
