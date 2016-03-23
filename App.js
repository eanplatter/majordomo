import React from 'react'
import { render } from 'react-dom'

class App extends React.Component {
  state = {
    token: chrome.storage.sync.get('token')
  }

  componentDidMount() {
    console.log(chrome.storage.sync.get('token'))
  }

  handleSubmit(e) {
    e.preventDefault()
    chrome.storage.sync.set({'token': e.target.value})
  }

  render() {
    return (
      <div>
        <label>Please enter your taken</label>
        <input ref='input' placeholder='put that token here!' />
        <button onClick={this.handleSubmit}>
          Save
        </button>
        <p>Your token is:</p>
        <pre>{this.state.token}</pre>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'))
