import React, { PropTypes } from 'react'
import logo from '../../images/pivotalLogo.png'

class Login extends React.Component {
  static propTypes = {
    toggleForm: PropTypes.func.isRequired,
  }

  state = {
    token: '',
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({
      token: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    chrome.storage.local.set({token: this.state.token})
    this.props.toggleForm()
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <div className='ui hidden divider' />
        <img src={logo} style={{maxWidth: '200px'}} /><br />
        <div style={{padding: '20px', textAlign: 'center'}}>
          <h3>Please enter your Pivotal Tracker token.</h3>
          <p>To find your token, go <a target='_blank' href='https://www.pivotaltracker.com/profile'> here</a></p>
          <div className='ui input fluid focus'>
            <input
              placeholder='put that token here!'
              onChange={this.handleChange.bind(this)}
              />
          </div>
          <div className='ui hidden divider' />
          <button
            className='ui button fluid'
            onClick={this.handleSubmit.bind(this)}
            >
            Save your token
          </button>
        </div>
      </div>
    )
  }
}

export default Login
