import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'
import Login from './components/Login'
import Story from './components/Story'
import Filter from './components/Filter'
import doThing from '../injection'
class App extends React.Component {
  state = {
    token: chrome.storage.local.get('token', function (res) { return res.token }),
    showForm: false,
    data: [],
    error: null,
    filterText: '',
  }

  componentDidMount() {
    doThing()
    chrome.storage.local.get('token', (res) => {
      if (res) {
        var instance = axios.create({
          baseURL: 'https://www.pivotaltracker.com',
          headers: {'X-TrackerToken': res.token}
        })
        instance.get('/services/v5/projects/1436906/stories?filter=state:started,unstarted')
          .then(
            response => {
              this.setState({
                data: response.data,
                token: res.token,
                showForm: false,
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

  toggleForm() {
    this.setState({
      showForm: !this.state.showForm,
    })
  }

  updateFilter(filterText) {
    this.setState({
      filterText,
    })
  }

  renderApp() {
    const current = []
    const backlog = []
    this.state.data.map((item, index) => {
      if (item.story_type === 'feature') {
        item.icon = 'star yellow'
      } else if (item.story_type === 'chore') {
        item.icon = 'setting grey'
      } else if (item.story_type === 'bug') {
        item.icon = 'bug red'
      } else if (item.story_type === 'release') {
        item.icon = 'flag green'
      }

      const name = item.name.toLowerCase()
      const filterText = this.state.filterText.toLowerCase()
      if (name.indexOf(filterText) > -1) {
        if (item.current_state === 'started') {
          current.push(<Story story={ item } key={ item.id } />)
        } else {
          backlog.push(<Story story={ item } key={ item.id } />)
        }
      }
    })

    return (
      <div className='ui container'>
        <div className='ui hidden divider' />
        <h1 style={{color: '#424242', textAlign: 'center'}}>Current / Backlog</h1>
        <Filter updateFilter={ ::this.updateFilter } />
        <h3>Current</h3>
        <div className='ui relaxed divided list'>
          { current }
        </div>
        <h3>Backlog</h3>
        <div className='ui relaxed divided list'>
          { backlog }
        </div>
      </div>
    )
  }

  renderLogin() {
    return (
      <div className='ui container'>
        <Login toggleForm={ ::this.toggleForm } />
      </div>
    )
  }

  render() {
    return this.state.showForm || this.state.token ? this.renderApp() : this.renderLogin()
  }
}

render(<App />, document.getElementById('root'))
