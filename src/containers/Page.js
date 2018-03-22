import React, { PureComponent } from 'react'
//import PropTypes from 'prop-types'
import BattleArena from './Game/BattleArena'
import MenuBar from './Game/MenuBar'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, updateGame} from '../actions/games'
import {getUsers} from '../actions/users'

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
    const {game, users, authenticated} = this.props
    const background = ['forrest', 'field']

    if (!authenticated) return (
      <Redirect to="/login" />
    )

    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    const player1 = game.players.find(p => p.character === 'fighter')
    const player2 = game.players.find(p => p.character === 'mage')

    console.log(player1)
    console.log(player2)
    return (
      <div>
      {game === null &&
      <div className='game'>
        <BattleArena background={background[0]}
        player1= 'undefined'
        player2= 'undefined'
        game={this.props.game}
        />
        <MenuBar game={this.props.game}/>
      </div>
      }
      {game && game.players.length < 2 &&
      <div className='game'>
        <BattleArena background={background[0]}
        player1= 'undefined'
        player2= 'undefined'
        game={this.props.game}
        />
        <MenuBar game={this.props.game}/>
      </div>
      }
      {game && game.players.length === 2 &&
      <div className='game'>
        <BattleArena background={background[0]}
        player1={player1}
        player2={player2}
        health={game.players[0].hp}
        game={this.props.game}
        />
        <MenuBar game={this.props.game}/>
      </div>
      }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  game: state.games && state.games[props.match.params.id],
  users: state.users
})

const mapDispatchToProps = {
  getGames, getUsers, updateGame
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
