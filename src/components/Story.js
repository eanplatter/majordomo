import React, { PropTypes } from 'react'

class Story extends React.Component {
  static propTypes = {
    story: PropTypes.object,
  }
  render() {
    return (
      <div className='item' style={{background: '#D6D6D6'}}>
        <div className='ui container'>
          <div className='left floated content'>
            <div className='ui icon basic button'>
              <i className='icon double large angle left' />
              <i className='icon large github' />
            </div>
          </div>
          <div className='top aligned content'>
            <i className={ `icon ${this.props.story.icon}` } />
              <a
                target='_blank'
                href={ this.props.story.url }
              >
                { this.props.story.name }
              </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Story
