import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import BattleArena from './Game/BattleArena'
import MenuBar from './Game/MenuBar'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame} from '../actions/games'
import {getUsers} from '../actions/users'
import {userId} from '../jwt'

export class Page extends PureComponent {
  static propTypes = {
  }

  toggleState = (stateString) => {
    this.setState({
      page: stateString
    })
  }

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  makeMove = (userid, attacktype) => {
    const {game, updateGame} = this.props
    updateGame(game.id, attacktype)
  }


  render() {
    const {game} = this.props
    return (
      <div>
      {game === null &&
      <div className='game'>
        <BattleArena background='forest' player1= 'undefined' player2= 'undefined'/>
        <MenuBar/>
      </div>
      }
      {game !== null && game.players.length < 2 &&
      <div className='game'>
        <BattleArena background='forest' player1= 'undefined' player2= 'undefined' health={game.players[0].hp}/>
        <MenuBar/>
      </div>
      }
      {game !== null && game.players.length === 2 &&
      <div className='game'>
        <BattleArena background='forest' player1={game.players[0]} player2={game.players[1]}/>
        <MenuBar/>
      </div>
      }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users
})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
