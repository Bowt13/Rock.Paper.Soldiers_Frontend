import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Player from '../../components/Game/Player'
import HealthBar from '../../components/Game/HealthBar'

//STYLING
import './BattleArena.css'

//CLASSES
//cleric
const clericidle = require ('../../img/classes/cleric.gif')
//fighter
const fighteridle = require ('../../img/classes/fighter.gif')
const fightermove = require ('../../img/classes/fightermove.gif')
const fighterattack = require ('../../img/classes/fighterattack.gif')
//mage
const mageidle = require ('../../img/classes/mage.gif')
const magemove = require ('../../img/classes/magemove.gif')
const mageattack = require ('../../img/classes/mageattack.gif')

export default class BattleArena extends PureComponent {
  static propTypes = {
    background: PropTypes.string.isRequired,
    player1: PropTypes.string.isRequired,
    player2: PropTypes.string.isRequired,
  }
  state = {
    playerStatus :'idle',
  }

calulatePercentage = (totalDamage) => {
  const fullHealth = 10
  return ((fullHealth-totalDamage)*(fullHealth))
}
toggleState = (stateString) => {
  this.setState({
    playerStatus: stateString
  })
}

  render() {
    return (
      <div className={this.props.background}>
        {this.state.playerStatus === 'idle' &&
        <div>
          <HealthBar side='left' percentage={this.calulatePercentage(0)}/>
          <Player side='left' imgSrc={fighteridle} status={this.state.playerStatus}/>
          <HealthBar side='right' percentage={this.calulatePercentage(0)}/>
          <Player side='right' imgSrc={mageidle} status={this.state.playerStatus}/>
          <button onClick={_ => this.toggleState('move')}/>
        </div>
        }
        {this.state.playerStatus === 'move' &&
        <div>
          <HealthBar side='left' percentage={this.calulatePercentage(0)}/>
          <Player side='left' imgSrc={fightermove} status={this.state.playerStatus}/>
          <HealthBar side='right' percentage={this.calulatePercentage(0)}/>
          <Player side='right' imgSrc={magemove} status={this.state.playerStatus}/>
          <button onClick={_ => this.toggleState('attack')}/>
        </div>
        }
        {this.state.playerStatus === 'attack' &&
        <div>
          <HealthBar side='left' percentage={this.calulatePercentage(0)}/>
          <Player side='left' imgSrc={fighterattack} status={this.state.playerStatus}/>
          <HealthBar side='right' percentage={this.calulatePercentage(0)}/>
          <Player side='right' imgSrc={mageattack} status={this.state.playerStatus}/>
          <button onClick={_ => this.toggleState('moveback')}/>
        </div>
        }
        {this.state.playerStatus === 'moveback' &&
        <div>
          <HealthBar side='left' percentage={this.calulatePercentage(2)}/>
          <Player side='left' imgSrc={fightermove} status={this.state.playerStatus}/>
          <HealthBar side='right' percentage={this.calulatePercentage(0)}/>
          <Player side='right' imgSrc={magemove} status={this.state.playerStatus}/>
          <button onClick={_ => this.toggleState('idle')}/>
        </div>
        }
      </div>
    )
  }
}
