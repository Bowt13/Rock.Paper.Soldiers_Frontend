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
    playerStatus :'idle',
    attackType: 'melee',
  }

calulatePercentage = (totalDamage) => {
  const fullHealth = 10
  return ((fullHealth-totalDamage)*(fullHealth))
}

togglePlayerState = (stateString) => {
  this.setState({
    playerStatus: stateString
  })
}

toggleAttacktype = (stateString) => {
  this.setState({
    playerStatus: stateString
  })
}

timerPlayerState = (x, y) => {
  setTimeout(_ => this.togglePlayerState(x), y);
}

  render() {
    return (
      <div className={this.props.background}>
        <HealthBar side='left' percentage={this.calulatePercentage(0)}/>
        <HealthBar side='right' percentage={this.calulatePercentage(0)}/>
        {this.state.playerStatus === 'idle' &&
        <div>
          <Player side='left' imgSrc={require (`../../img/classes/${this.props.player1}-${this.state.playerStatus}.gif`)} status={this.state.playerStatus} attackType={this.state.attackType}/>
          <Player side='right' imgSrc={require (`../../img/classes/${this.props.player2}-${this.state.playerStatus}.gif`)} status={this.state.playerStatus} attackType={this.state.attackType}/>
          {this.timerPlayerState('move', 450)}
        </div>
        }
        {this.state.playerStatus === 'move' &&
        <div>
          <Player side='left' imgSrc={require (`../../img/classes/${this.props.player1}-${this.state.playerStatus}.gif`)} status={this.state.playerStatus} attackType={this.state.attackType}/>
          <Player side='right' imgSrc={require (`../../img/classes/${this.props.player2}-${this.state.playerStatus}.gif`)} status={this.state.playerStatus} attackType={this.state.attackType}/>
          {this.timerPlayerState('attack', 450)}
        </div>
        }
        {this.state.playerStatus === 'attack' &&
        <div>
          <Player side='left' imgSrc={require (`../../img/classes/${this.props.player1}-${this.state.playerStatus}-${this.state.attackType}.gif`)} status={this.state.playerStatus} attackType={this.state.attackType}/>
          <Player side='right' imgSrc={require (`../../img/classes/${this.props.player2}-${this.state.playerStatus}-${this.state.attackType}.gif`)} status={this.state.playerStatus} attackType={this.state.attackType}/>
          {this.timerPlayerState('moveback', 400)}
        </div>
        }
        {this.state.playerStatus === 'moveback' &&
        <div>
          <Player side='left' imgSrc={require (`../../img/classes/${this.props.player1}-${this.state.playerStatus}.gif`)} status={this.state.playerStatus} attackType={this.state.attackType}/>
          <Player side='right' imgSrc={require (`../../img/classes/${this.props.player2}-${this.state.playerStatus}.gif`)} status={this.state.playerStatus} attackType={this.state.attackType}/>
          {this.timerPlayerState('idle', 500)}
        </div>
        }
      </div>
    )
  }
}
