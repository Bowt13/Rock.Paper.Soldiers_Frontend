import React, {PureComponent} from 'react'
import {getGames, createGame, joinGame} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import {withRouter} from 'react-router'
import './GamesList.css'

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

class GamesList extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.games === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
    }
  }

  renderGame = (game) => {
    const handleClick = () => {
      this.props.joinGame(game.id);
      history.push(`/games/${game.id}`);
    }

    const {users, history} = this.props
    return (<Card key={game.id} className="game-card">
      <CardContent>
        <Typography color="textSecondary">
          This game is played by&nbsp;
          {
            game.players
              .map(player => users[player.userId].username.capitalize())
              .join(' and ')
          }
        </Typography>
        <Typography variant="headline" component="h2">
          Game #{game.id}
        </Typography>
        <Typography color="textSecondary">
          Status: {game.status}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => handleClick()}
        >
          Fighter
        </Button>
        <Button
          size="small"
          onClick={() => handleClick()}
        >
          Mage
        </Button>
        <Button
          size="small"
          onClick={() => handleClick()}
        >
          Archer
        </Button>
      </CardActions>
    </Card>)
  }

  render() {
    const {games, users, authenticated, createGame} = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (games === null || users === null) return null

    return (<Paper class="outer-paper">
      <Button
        color="primary"
        variant="raised"
        onClick={createGame}
        className="create-game"
      >
        Create Game
      </Button>

      <div>
        {games.map(game => this.renderGame(game))}
      </div>
    </Paper>)
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  games: state.games === null ?
    null : Object.values(state.games).sort((a, b) => b.id - a.id)
})



export default withRouter(
  connect(mapStateToProps, {getGames, getUsers, createGame, joinGame})(GamesList)
)
