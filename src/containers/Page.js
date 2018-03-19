import React, { PureComponent } from 'react'
import BattleArena from './Game/BattleArena'
import MenuBar from './Game/MenuBar'


//STYLING


//CLASSES
const cleric = require ('../img/classes/cleric.gif')
const fighter = require ('../img/classes/fighter.gif')

export default class Page extends PureComponent {
  static propTypes = {
  }
  state = {
    page: 'battle'
  }

  toggleState = (stateString) => {
    this.setState({
      page: stateString
    })
  }

  componentWillMount() {
    this.toggleState = this.toggleState.bind(this)
  }

  render() {
    return (
      <div className='game'>
      {
        this.state.page === 'battle' &&
        <div>
        <BattleArena background='forest' player1={cleric} player2={fighter}/>
        <MenuBar/>
        </div>
      }
      </div>
    )
  }
}
