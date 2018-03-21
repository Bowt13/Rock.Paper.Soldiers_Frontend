import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Player from '../../components/Game/Player'
import HealthBar from '../../components/Game/HealthBar'
import {updateAttackType} from '../../actions/games'
import {connect} from 'react-redux'

//STYLING
import './BattleArena.css'
import './classesCss/mage.css'
import './classesCss/fighter.css'
import './classesCss/fighter.css'

export class BattleArena extends PureComponent {
  static propTypes = {
    background: PropTypes.string.isRequired,
    player1: PropTypes.object.isRequired,
    player2: PropTypes.object.isRequired,
    game: PropTypes.object.isRequired,
  }
  state = {
    playerStatus :'idle',
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

timerIdleCheck = (y) => {
  setInterval(_ => this.moveChecker(), y);
}

moveChecker = () => {
  if (this.state.playerStatus === 'idle' && this.props.player1.pendingMove !== null && this.props.player2.pendingMove !== null){
    this.togglePlayerState('move')
  }
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

                {this.timerIdleCheck(1)}
            </div>
            }
            {this.state.playerStatus === 'move' &&
            <div>

              <Player side='left' character={this.props.player1.character}
                imgSrc={require (`../../img/classes/${this.props.player1.character}-${this.state.playerStatus}-${this.props.player1.pendingMove}.gif`)}
                status={this.state.playerStatus}
                attackType={this.props.player1.pendingMove}/>

              <Player side='right' character={this.props.player2.character}
                imgSrc={require (`../../img/classes/${this.props.player2.character}-${this.state.playerStatus}-${this.props.player2.pendingMove}.gif`)}
                status={this.state.playerStatus}
                attackType={this.props.player2.pendingMove}/>
                {this.timerPlayerState('attack', 450)}
            </div>
            }
            {this.state.playerStatus === 'attack' &&
            <div>

              <Player side='left' character={this.props.player1.character}
                imgSrc={require (`../../img/classes/${this.props.player1.character}-${this.state.playerStatus}-${this.props.player1.pendingMove}.gif`)}
                status={this.state.playerStatus}
                attackType={this.props.player1.pendingMove}/>

              <Player side='right' character={this.props.player2.character}
                imgSrc={require (`../../img/classes/${this.props.player2.character}-${this.state.playerStatus}-${this.props.player2.pendingMove}.gif`)}
                status={this.state.playerStatus}
                attackType={this.props.player2.pendingMove}/>
                {this.timerPlayerState('moveback', 400)}
            </div>
            }
            {this.state.playerStatus === 'moveback' &&
            <div>
              <Player side='left' character={this.props.player1.character}
                imgSrc={require (`../../img/classes/${this.props.player1.character}-${this.state.playerStatus}-${this.props.player1.pendingMove}.gif`)}
                status={this.state.playerStatus}
                attackType={this.props.player1.pendingMove}/>

              <Player side='right' character={this.props.player2.character}
                imgSrc={require (`../../img/classes/${this.props.player2.character}-${this.state.playerStatus}-${this.props.player2.pendingMove}.gif`)}
                status={this.state.playerStatus}
                attackType={this.props.player2.pendingMove}/>
                {this.timerPlayerState('idle', 450)}
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
const mapDispatchToProps = {
  updateAttackType
}

export default connect(null, mapDispatchToProps)(BattleArena)
