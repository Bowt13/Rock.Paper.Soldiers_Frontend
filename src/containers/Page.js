import React, { PureComponent } from 'react'
import BattleArena from './Game/BattleArena'
import MenuBar from './Game/MenuBar'


//STYLING


//CLASSES
const cleric = require ('../img/classes/cleric.gif')
const fighter = require ('../img/classes/fighter.gif')
const fightermove = require ('../img/classes/fightermove.gif')
const mage = require ('../img/classes/mage.gif')

export default class Page extends PureComponent {
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

  render() {
    return (
      <div className='game'>
        <BattleArena background='forest' player1={mage} player2={fighter}/>
        <MenuBar/>
      </div>
    )
  }
}
