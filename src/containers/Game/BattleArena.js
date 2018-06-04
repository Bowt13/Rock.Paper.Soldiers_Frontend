import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Player from '../../components/Game/Player'
import HealthBar from '../../components/Game/HealthBar'
import { updateAttackType } from '../../actions/games'
import { connect } from 'react-redux'
import { userId } from '../../jwt'

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
    game: PropTypes.object.isRequired
  }
  state = {
    playerStatus: 'idle',
    player1AttackType: 'none',
    player2AttackType: 'none'
  }

  //FUNCTIONS
  togglePlayerState = stateString => {
    this.setState({
      playerStatus: stateString
    })
  }

  togglePlayer1AttackType = attacktype => {
    this.setState({
      player1AttackType: attacktype
    })
  }

  togglePlayer2AttackType = attacktype => {
    this.setState({
      player2AttackType: attacktype
    })
  }

  timerPlayer1AttackType = (x, y) => {
    setTimeout(_ => this.togglePlayer1AttackType(x), y)
  }

  timerPlayer2AttackType = (x, y) => {
    setTimeout(_ => this.togglePlayer2AttackType(x), y)
  }

  timerPlayerState = (x, y) => {
    setTimeout(_ => this.togglePlayerState(x), y)
  }

  timerIdleCheck = y => {
    setInterval(_ => this.moveChecker(), y)
  }

  moveChecker = () => {
    const { player1, player2 } = this.props
    if (
      this.state.playerStatus === 'idle' &&
      player1.pendingMove !== null &&
      player2.pendingMove !== null
    ) {
      this.togglePlayerState('move')
    }
  }

  winMoveChecker = () => {
    const { player1, player2 } = this.props
    if (player1.previousMove === 'melee' && player2.previousMove === 'melee')
      return `ties to`
    if (player1.previousMove === 'melee' && player2.previousMove === 'ranged')
      return `wins from`
    if (player1.previousMove === 'melee' && player2.previousMove === 'spell')
      return `loses to`
    if (player1.previousMove === 'spell' && player2.previousMove === 'spell')
      return `ties to`
    if (player1.previousMove === 'spell' && player2.previousMove === 'melee')
      return `wins from`
    if (player1.previousMove === 'spell' && player2.previousMove === 'ranged')
      return `loses to`
    if (player1.previousMove === 'ranged' && player2.previousMove === 'ranged')
      return `ties to`
    if (player1.previousMove === 'ranged' && player2.previousMove === 'spell')
      return `wins from`
    if (player1.previousMove === 'ranged' && player2.previousMove === 'melee')
      return `loses to`
  }

  //RENDER
  render() {
    //Constants
    const { player1, player2, users, userId, game, background } = this.props
    const player1img = `${player1.character}-${this.state.playerStatus}-${
      this.state.player1AttackType
    }`

    return (
      <div>
        <div className={`fieldOverlay`} />
        <div>
          {player1 !== undefined &&
            player2 !== undefined && (
              <div className={background}>
                {player1 !== 'undefined' &&
                  player2 !== 'undefined' && (
                    <div>
                      <HealthBar side="left" percentage={player1.hp * 10} />
                      <HealthBar side="right" percentage={player2.hp * 10} />

                      {this.state.playerStatus === 'idle' && (
                        <div>
                          {game.winner && (
                            <p className="attack-display">
                              {users[game.winner].username}
                              <br />
                              WINS
                            </p>
                          )}
                          {!game.winner &&
                            player1.previousMove &&
                            player2.previousMove && (
                              <p className="attack-display">
                                {player1.character}: {player1.previousMove}
                                <br />
                                {this.winMoveChecker()}
                                <br />
                                {player2.character}: {player2.previousMove}
                              </p>
                            )}

                          <Player
                            side="left"
                            character={player1.character}
                            imgSrc={require(`../../img/classes/${
                              player1.character
                            }-${this.state.playerStatus}.gif`)}
                            status={this.state.playerStatus}
                            attackType={player1.pendingMove}
                          />

                          <Player
                            side="right"
                            character={player2.character}
                            imgSrc={require(`../../img/classes/${
                              player2.character
                            }-${this.state.playerStatus}.gif`)}
                            status={this.state.playerStatus}
                            attackType={player2.pendingMove}
                          />

                          {this.togglePlayer1AttackType(player1.pendingMove)}
                          {this.togglePlayer2AttackType(player2.pendingMove)}
                          {this.timerIdleCheck(180)}
                        </div>
                      )}
                      {this.state.playerStatus === 'move' && (
                        <div>
                          <Player
                            side="left"
                            character={player1.character}
                            imgSrc={require(`../../img/classes/${player1img}.gif`)}
                            status={this.state.playerStatus}
                            attackType={this.state.player1AttackType}
                          />

                          <Player
                            side="right"
                            character={player2.character}
                            imgSrc={require(`../../img/classes/${
                              player2.character
                            }-${this.state.playerStatus}-${
                              this.state.player2AttackType
                            }.gif`)}
                            status={this.state.playerStatus}
                            attackType={this.state.player2AttackType}
                          />
                          {this.timerPlayerState('attack', 450)}
                        </div>
                      )}
                      {this.state.playerStatus === 'attack' && (
                        <div>
                          <Player
                            side="left"
                            character={player1.character}
                            imgSrc={require(`../../img/classes/${player1img}.gif`)}
                            status={this.state.playerStatus}
                            attackType={this.state.player1AttackType}
                          />

                          <Player
                            side="right"
                            character={player2.character}
                            imgSrc={require(`../../img/classes/${
                              player2.character
                            }-${this.state.playerStatus}-${
                              this.state.player2AttackType
                            }.gif`)}
                            status={this.state.playerStatus}
                            attackType={this.state.player2AttackType}
                          />
                          {this.timerPlayerState('moveback', 400)}
                        </div>
                      )}
                      {this.state.playerStatus === 'moveback' && (
                        <div>
                          <p className="attack-display">
                            {player1.character}: {player1.previousMove}
                            <br />
                            {this.winMoveChecker()}
                            <br />
                            {player2.character}: {player2.previousMove}
                          </p>}
                          <Player
                            side="left"
                            character={player1.character}
                            imgSrc={require(`../../img/classes/${
                              player1.character
                            }-${this.state.playerStatus}-${
                              this.state.player1AttackType
                            }.gif`)}
                            status={this.state.playerStatus}
                            attackType={this.state.player1AttackType}
                          />
                          <Player
                            side="right"
                            character={player2.character}
                            imgSrc={require(`../../img/classes/${
                              player2.character
                            }-${this.state.playerStatus}-${
                              this.state.player2AttackType
                            }.gif`)}
                            status={this.state.playerStatus}
                            attackType={this.state.player2AttackType}
                          />
                          {this.timerPlayerState('idle', 450)}
                          {this.timerPlayer1AttackType(
                            player1.pendingMove,
                            460
                          )}
                          {this.timerPlayer2AttackType(
                            player2.pendingMove,
                            460
                          )}
                        </div>
                      )}
                    </div>
                  )}
              </div>
            )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  users: state.users
})

const mapDispatchToProps = {
  updateAttackType
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BattleArena)
