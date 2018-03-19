import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Player from '../../components/Game/Player'
import HealthBar from '../../components/Game/HealthBar'

//STYLING
import './BattleArena.css'

export default class BattleArena extends PureComponent {
  static propTypes = {
    background: PropTypes.string.isRequired,
    player1: PropTypes.string.isRequired,
    player2: PropTypes.string.isRequired,
  }
  state = {
    player1status :'move',
    player2status :'move'
  }

CalulatePercentage = (totalDamage) => {
  const fullHealth = 10
  return ((fullHealth-totalDamage)*(fullHealth))
}

  render() {
    return (
      <div className={this.props.background}>
      <HealthBar side='left' percentage={this.CalulatePercentage(0)}/>
      <Player side='left' imgSrc={this.props.player1} status={this.state.player1status}/>
      <HealthBar side='right' percentage={this.CalulatePercentage(0)}/>
      <Player side='right' imgSrc={this.props.player2} status={this.state.player2status}/>
      </div>
    )
  }
}
