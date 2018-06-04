import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

//STYLING
import './MenuButtons.css'

export default class RootButtons extends PureComponent {
  static propTypes = {
    setMenu: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="button-container">
        <button
          className="offense"
          onClick={_ => this.props.setMenu('offense')}>
          Offense
        </button>
        <button
          className="defence"
          onClick={_ => this.props.setMenu('defense')}>
          Defence
        </button>
      </div>
    )
  }
}
