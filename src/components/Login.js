import React from 'react'
import logo from '../../images/pivotalLogo.png'

class Login extends React.Component {
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
    this.setState({
      showForm: false,
    })
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <img src={logo} style={{maxWidth: '200px'}} /><br />
        <div style={{padding: '20px', color: '#fff', textAlign: 'center'}}>
          <h3>Please enter your Pivotal Tracker token.</h3>
          <p>To find your token, go <a target='_blank' href='https://www.pivotaltracker.com/profile'> here</a></p>
          <input
            style={{
              display: 'block',
              margin: '10px auto',
              padding: '7px',
              borderRadius: '2px',
              outline: 'none',
              boxShadow: 'none',
              border: 'none',
              width: '300px',
            }}
            placeholder='put that token here!'
            onChange={this.handleChange.bind(this)}
          />
          <button
            style={{
              width: '300px',
              padding: '10px',
              borderRadius: '2px',
              background: '#D6D6D6',
              border: '1px solid #000'
            }}
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
