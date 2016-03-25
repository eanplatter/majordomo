import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'
import Login from './components/Login'

class App extends React.Component {
  state = {
    token: chrome.storage.local.get('token', function (res) { return res.token }),
    showForm: false,
    data: [],
    error: null,
  }

  componentDidMount() {
    chrome.storage.local.get('token', (res) => {
      if (res) {
        var instance = axios.create({
          baseURL: 'https://www.pivotaltracker.com',
          headers: {'X-TrackerToken': res.token}
        })
        instance.get('/services/v5/projects/1436906/stories?filter=state:started')
          .then(
            response => {
              this.setState({
                data: response.data,
                token: res.token
              })
            },
            err => {
              this.setState({
                error: err,
              })
            }
          )
      } else {
        this.setState({
          showForm: true,
        })
      }
    })
  }

  renderApp() {
    const data = this.state.data.map((item, index) => {
      if (item.story_type === 'feature') {
        item.icon = 'star yellow'
      } else if (item.story_type === 'chore') {
        item.icon = 'setting grey'
      } else if (item.story_type === 'bug') {
        item.icon = 'bug red'
      }
      return (
        <div
          key={item.id}
          className='ui card'
        >
          <div className='content'>
            <div className='header'>
              <i className={`icon ${item.icon} right floated`} />
            </div>
            <div className='meta'>
              {item.id}
            </div>
            <div className='description'>
              {item.name}
            </div>
          </div>
          <div className='extra content'>
            <div className='ui three buttons' style={{margin: '10px auto'}}>
              <button className='ui tiny icon blue basic button'>
                <i className='icon copy' />
              </button>
              <button className='ui tiny icon red basic button'>
                <i className='icon arrow up' />
              </button>
              <button className='ui tiny icon green basic button'>
                <i className='icon bomb' />
              </button>
            </div>
          </div>
        </div>
      )
    })
    return (
      <div
        style={{
          height: 400,
          width: 400,
          fontSize: 13,
          margin: 10,
        }}
        className='ui container'
      >
        <h1 style={{color: '#D6D6D6', textAlign: 'center',}}>Current Stories</h1>
        <div className='ui cards'>
          {data}
        </div>
      </div>
    )
  }

  renderLogin() {
    return (
      <div style={{height: 400, width: 400}} className='ui container'>
        <Login />
      </div>
    )
  }

  render() {
    console.log('data', this.state.data)
    return this.state.token ? this.renderApp() : this.renderLogin()
  }
}

render(<App />, document.getElementById('root'))
