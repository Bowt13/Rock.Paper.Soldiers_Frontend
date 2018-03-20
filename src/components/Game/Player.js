import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Player extends PureComponent {
  static propTypes = {
    imgSrc: PropTypes.string.isRequired,
    side: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    attackType: PropTypes.string.isRequired,
    character: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div>
      {this.props.status === 'idle' &&
        <img className={`${this.props.character}-${this.props.side}-${this.props.status}`} src={this.props.imgSrc} alt={this.props.imgSrc}/>
      }
      {this.props.status !== 'idle' &&
        <img className={`${this.props.character}-${this.props.side}-${this.props.status}-${this.props.attackType}`} src={this.props.imgSrc} alt={this.props.imgSrc}/>
      }
      </div>
    )
  }
}
