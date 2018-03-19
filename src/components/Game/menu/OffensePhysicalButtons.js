import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

//STYLING
import './MenuButtons.css'

export default class OffensePhysicalButtons extends PureComponent {
  static propTypes = {
    setMenu: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div>
      <p className='text'>Melee Attacks:</p>
      <div className='button-container'>
      <button className='melee'>Slash</button>
      <button className='spell'>Stab</button>
      <button className='ranged'>Strike</button>
      <button className='back' onClick={_ => this.props.setMenu('offense')}>{'<<'}</button>
      </div>
      </div>
    )
  }
}
