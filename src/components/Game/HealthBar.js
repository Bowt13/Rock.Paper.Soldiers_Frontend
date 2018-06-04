import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

//STYLING
import './HealthBar.css'

export default class HealthBar extends PureComponent {
  static propTypes = {
    percentage: PropTypes.number.isRequired,
    side: PropTypes.string.isRequired
  }

  render() {
    return (
      <div>
        <div className={`wrapper-${this.props.side}`}>
          <div className={`p${this.props.percentage}`} />
          <p className={`text-${this.props.side}`}>
            {' '}
            hp:{this.props.percentage / 10}
          </p>
        </div>
      </div>
    )
  }
}
