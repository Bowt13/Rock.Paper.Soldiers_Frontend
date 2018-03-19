import React, { PureComponent } from 'react'

//COMPONENTS
import RootButtons from '../../components/Game/menu/RootButtons'
import OffenseButtons from '../../components/Game/menu/OffenseButtons'
import DefenseButtons from '../../components/Game/menu/DefenseButtons'
import OffensePhysicalButtons from '../../components/Game/menu/OffensePhysicalButtons'

//STYLING
import './MenuBar.css'

export default class MenuBar extends PureComponent {
  static propTypes = {
  }
  state = {
    menu: 'offense'
  }

  toggleState = (stateString) => {
    this.setState({
      menu: stateString
    })
  }

  componentWillMount() {
    this.toggleState = this.toggleState.bind(this)
  }

  render() {
    return (
      <div className='bar'>
        {
          this.state.menu === 'root' &&
          <RootButtons setMenu={this.toggleState}/>
        }
        {
          this.state.menu === 'offense' &&
          <OffenseButtons setMenu={this.toggleState}/>
        }
        {
          this.state.menu === 'defense' &&
          <DefenseButtons setMenu={this.toggleState}/>
        }
        {
          this.state.menu === 'offensephysical' &&
          <OffensePhysicalButtons setMenu={this.toggleState}/>
        }
      </div>
    )
  }
}
