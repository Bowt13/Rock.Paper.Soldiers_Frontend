import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGames, joinGame, updateAttackType } from '../../actions/games'
import { getUsers } from '../../actions/users'
import { userId } from '../../jwt'

//COMPONENTS
import RootButtons from '../../components/Game/menu/RootButtons'
import OffenseButtons from '../../components/Game/menu/OffenseButtons'
import DefenseButtons from '../../components/Game/menu/DefenseButtons'
import OffensePhysicalButtons from '../../components/Game/menu/OffensePhysicalButtons'

//STYLING
import './MenuBar.css'

export class MenuBar extends PureComponent {
  static PropTypes = {
    game: PropTypes.string.isRequired
  }
  static propTypes = {}
  state = {
    menu: 'offense'
  }

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
      this.selectAttackType = this.selectAttackType.bind(this)
    }
  }

  toggleState = stateString => {
    this.setState({
      menu: stateString
    })
  }

  selectAttackType = selectedAttack => {
    const { game, updateAttackType } = this.props
    updateAttackType(game.id, selectedAttack)
  }
  hasPendingMove = () => {
    const { players } = this.props.game
    if (!players[1]) return false
    return (
      players.find(player => player.userId === this.props.userId).pendingMove ||
      this.props.game.winner
    )
  }

  render() {
    console.log(this.hasPendingMove())
    return (
      <div className="bar">
        {this.state.menu === 'root' && (
          <RootButtons setMenu={this.toggleState} />
        )}
        {this.state.menu === 'offense' && (
          <OffenseButtons
            updateAttackType={this.selectAttackType}
            disable={this.hasPendingMove()}
          />
        )}
        {this.state.menu === 'defense' && (
          <DefenseButtons setMenu={this.toggleState} />
        )}
        {this.state.menu === 'offensephysical' && (
          <OffensePhysicalButtons setMenu={this.toggleState} />
        )}
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
  getGames,
  getUsers,
  joinGame,
  updateAttackType
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBar)
