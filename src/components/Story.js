import React, { PropTypes } from 'react'

class Story extends React.Component {
  static propTypes = {
    story: PropTypes.object,
  }

  handleClick() {
    console.log('whut')
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      console.log(tabs[0]);
    });
  }

  render() {
    return (
      <div className='item'>
        <div className='ui container'>
          <div className='left floated content'>
            <div className='ui icon basic button' onClick={::this.handleClick}>
              <i className='icon double large angle left' />
              <i className='icon large github' />
            </div>
          </div>
          <div className='middle aligned content'>
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
