import React from 'react'
import { Link } from 'react-router-dom'

class HomePage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {},
      users: ['']
    }
  }

  componentDidMount () {
    this.setState({
      user: JSON.parse(localStorage.getItem('user')),
      users: { loading: true }
    })
  }

  render () {
    const { user, users } = this.state
    return (
      <div className='container col-md-6'>
        <h1>
          Hello there{' '}
          {user.firstName && user.LastName && (
            <div className='help-block'>
              {user.firstName} {user.lastName}
            </div>
          )}
          !
          {user.license && (
            <div className='help-block'>your license is {user.license}</div>
          )}
        </h1>
        <p>You're logged in to the car registration portal!</p>
        <h3 style={{ marginTop: '1rem' }}>
          <Link to='/login'>Click here to log out</Link>
        </h3>
        <div id='demo' class='carousel slide' data-ride='carousel'>
          {/* <!-- Indicators --> */}
          <ul class='carousel-indicators'>
            <li data-target='#demo' data-slide-to='0' class='active'></li>
            <li data-target='#demo' data-slide-to='1'></li>
            <li data-target='#demo' data-slide-to='2'></li>
            <li data-target='#demo' data-slide-to='3'></li>
          </ul>

          {/* <!-- The slideshow --> */}
          <div class='carousel-inner'>
            <div class='carousel-item active'>
              <img
                src='../../images/Chevy.png'
                alt='Chevrolet Truck'
                width='640'
                height='480'
              />
            </div>
            <div class='carousel-item'>
              <img
                src='../../images/Ford.png'
                alt='Ford Fusion'
                width='640'
                height='480'
              />
            </div>
            <div class='carousel-item'>
              <img
                src='../../images/Honda.png'
                alt='Honda Civic'
                width='640'
                height='480'
              />
            </div>
            <div class='carousel-item'>
              <img
                src='../../images/Lambo.png'
                alt='Lamborghini'
                width='640'
                height='480'
              />
            </div>
          </div>

          {/* <!-- Left and right controls --> */}
          <a class='carousel-control-prev' href='#demo' data-slide='prev'>
            <span class='carousel-control-prev-icon'></span>
          </a>
          <a class='carousel-control-next' href='#demo' data-slide='next'>
            <span class='carousel-control-next-icon'></span>
          </a>
        </div>
      </div>
    )
  }
}

export { HomePage }
