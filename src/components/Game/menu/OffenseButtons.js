import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

//STYLING
import './MenuButtons.css'

export default class OffenseButtons extends PureComponent {
  static propTypes = {
    updateAttackType: PropTypes.func.isRequired,
    disable: PropTypes.boolean
  }


  render() {
    return (
      <div>
      <p className='text'>Attacks:</p>
      <div className='button-container'>
      <button className='melee' disabled={this.props.disable} onClick={_ => this.props.updateAttackType('melee')}>Melee</button>
      <button className='spell' disabled={this.props.disable}onClick={_ => this.props.updateAttackType('spell')}>Spell</button>
      <button className='ranged' disabled={this.props.disable} onClick={_ => this.props.updateAttackType('ranged')}>Ranged</button>
      {/*<button className='back' onClick={_ => this.props.setMenu('root')}>{'<<back<<'}</button>*/}
      </div>
      </div>
    )
  }
}
