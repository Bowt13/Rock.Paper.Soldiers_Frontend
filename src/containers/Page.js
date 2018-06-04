import React, { PureComponent } from 'react'
import { userId } from '../jwt'
import BattleArena from './Game/BattleArena'
import MenuBar from './Game/MenuBar'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getGames, updateGame } from '../actions/games'
import { getUsers } from '../actions/users'

export class Page extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  //FUNCTIONS
  toggleState = stateString => {
    this.setState({
      page: stateString
    })
  }

  makeMove = (userid, attacktype) => {
    const { game, updateGame } = this.props
    updateGame(game.id, attacktype)
  }

  //RENDER
  render() {
    //Constants
    const { game, users, authenticated, userId } = this.props
    if (!game) return null
    const backgroundNames = ['forrest', 'field']
    const background = backgroundNames[0]
    const player1 = game.players.find(p => p.userId === userId)
    const player2 = game.players.find(p => p.userId !== userId)

    //Authorization
    if (!authenticated) return <Redirect to="/login" />
    //Validation
    if (game === null || users === null) return 'Loading...'

    return (
      <div>
        {game === null && (
          <div className="game">
            <BattleArena
              background={background}
              player1="undefined"
              player2="undefined"
              game={this.props.game}
            />
            <MenuBar game={this.props.game} />
          </div>
        )}
        {game &&
          game.players.length < 2 && (
            <div className="game">
              <BattleArena
                background={background}
                player1="undefined"
                player2="undefined"
                game={this.props.game}
              />
              <MenuBar game={this.props.game} />
            </div>
          )}
        {!game.winner &&
          game.players.length === 2 && (
            <div className="game">
              <BattleArena
                background={background}
                player1={player1}
                player2={player2}
                game={this.props.game}
              />
              <MenuBar game={this.props.game} />
            </div>
          )}
        {game.winner &&
          game.players.length === 2 && (
            <div className="game">
              <BattleArena
                background={background}
                player1={player1}
                player2={player2}
                game={this.props.game}
              />
              <MenuBar game={this.props.game} />
            </div>
          )}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  game: state.games && state.games[props.match.params.id],
  userId: state.currentUser && userId(state.currentUser.jwt),
  users: state.users
})

const mapDispatchToProps = {
  getGames,
  getUsers,
  updateGame
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)
