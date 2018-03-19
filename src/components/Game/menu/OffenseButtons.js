import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

//STYLING
import './MenuButtons.css'

export default class OffenseButtons extends PureComponent {
  static propTypes = {
    setMenu: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div>
      <p className='text'>Attacks:</p>
      <div className='button-container'>
      <button className='melee'>Melee</button>
      <button className='spell'>Spell</button>
      <button className='ranged'>Ranged</button>
      {/*<button className='back' onClick={_ => this.props.setMenu('root')}>{'<<back<<'}</button>*/}
      </div>
      </div>
    )
  }
}
