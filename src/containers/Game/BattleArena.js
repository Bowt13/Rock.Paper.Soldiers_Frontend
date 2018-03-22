import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Player from '../../components/Game/Player'
import HealthBar from '../../components/Game/HealthBar'

//STYLING
import './BattleArena.css'
import './classesCss/mage.css'
import './classesCss/fighter.css'
import './classesCss/fighter.css'

export default class BattleArena extends PureComponent {
  static propTypes = {
    background: PropTypes.string.isRequired,
    player1: PropTypes.object.isRequired,
    player2: PropTypes.object.isRequired,
  }
  state = {
    playerStatus :'idle',
    attackType: 'spell',
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

toggleAttackType = (stateString) => {
  this.setState({
    attackType: stateString
  })
}

timerPlayerState = (x, y) => {
  setTimeout(_ => this.togglePlayerState(x), y);
}

timerAttackType = (x, y) => {
  setTimeout(_ => this.toggleAttackType(x), y);
}

  render() {

    return (
      <div>
      <div>
      </div>
      <div>
      {this.props.player1 !== undefined && this.props.player2 !== undefined &&
        <div className={this.props.background}>
        {this.props.player1 !== 'undefined' && this.props.player2 !== 'undefined' &&
          <div>
            <HealthBar side='left' percentage={this.props.player1.hp*10}/>
            <HealthBar side='right' percentage={this.props.player2.hp*10}/>
            
            {this.state.playerStatus === 'idle' &&
            <div>

              <Player side='left' character={this.props.player1.character}
                imgSrc={require (`../../img/classes/${this.props.player1.character}-${this.state.playerStatus}.gif`)}
                status={this.state.playerStatus}
                attackType={this.props.player1.pendingMove}/>

              <Player side='right'character={this.props.player2.character}
                imgSrc={require (`../../img/classes/${this.props.player2.character}-${this.state.playerStatus}.gif`)}
                status={this.state.playerStatus}
                attackType={this.props.player2.pendingMove}/>

            </div>
            }
            {this.state.playerStatus === 'move' &&
            <div>

              <Player side='left' character={this.props.player1.character}
                imgSrc={require (`../../img/classes/${this.props.player1.character}-${this.state.playerStatus}-${this.props.player1.pendingMove}.gif`)}
                status={this.state.playerStatus}
                attackType={this.state.attackType}/>

              <Player side='right' character={this.props.player2.character}
                imgSrc={require (`../../img/classes/${this.props.player2.character}-${this.state.playerStatus}-${this.props.player2.pendingMove}.gif`)}
                status={this.state.playerStatus}
                attackType={this.state.attackType}/>

            </div>
            }
            {this.state.playerStatus === 'attack' &&
            <div>

              <Player side='left' character={this.props.player1.character}
                imgSrc={require (`../../img/classes/${this.props.player1.character}-${this.state.playerStatus}-${this.props.player1.pendingMove}.gif`)}
                status={this.state.playerStatus}
                attackType={this.state.attackType}/>

              <Player side='right' character={this.props.player2.character}
                imgSrc={require (`../../img/classes/${this.props.player2.character}-${this.state.playerStatus}-${this.props.player2.pendingMove}.gif`)}
                status={this.state.playerStatus}
                attackType={this.state.attackType}/>

            </div>
            }
            {this.state.playerStatus === 'moveback' &&
            <div>
              <Player side='left' character={this.props.player1.character}
                imgSrc={require (`../../img/classes/${this.props.player1.character}-${this.state.playerStatus}-${this.props.player1.pendingMove}.gif`)}
                status={this.state.playerStatus}
                attackType={this.state.attackType}/>

              <Player side='right' character={this.props.player2.character}
                imgSrc={require (`../../img/classes/${this.props.player2.character}-${this.state.playerStatus}-${this.props.player2.pendingMove}.gif`)}
                status={this.state.playerStatus}
                attackType={this.state.attackType}/>

            </div>
            }
          </div>
        }
        </div>
      }
      </div>
      </div>
    )
  }
}
