import React, { PropTypes } from 'react'

class Filter extends React.Component {
  static propTypes = {
    updateFilter: PropTypes.func.isRequired,
  }
  handleChange() {
    this.props.updateFilter(this.refs.filter.value)
  }
  render() {
    return (
      <div className='ui container'>
        <div className='ui icon fluid input'>
          <input onChange={ ::this.handleChange } ref='filter' placeholder='Filter...' />
          <i className='filter icon'></i>
        </div>
      </div>
    )
  }
}

export default Filter
