import React, {PureComponent} from 'react'

export default class Pin extends PureComponent {
  render() {
    const {size, onClick, color} = this.props
    const pinStyle = {
      cursor: 'pointer',
      fill: color,
      stroke: 'none'
    }

    return (
      <svg
        height={size}
        viewBox="-16 -18 64 64"
        style={{
          ...pinStyle,
          transform: `translate(${-size / 2}px,${-size}px)`
        }}
        onClick={onClick}
      >
        <path
          fill="rgba(0,0,0,.2)"
          stroke="none"
          transform="translate(-2,48) scale(1,0.5) rotate(40) translate(0,-46)"
          d="M0,47 Q0,28 10,15 A15,15 0,1,0 -10,15 Q0,28 0,47"
        />
        <path
          stroke="black"
          strokeWidth="1"
          d="M0,47 Q0,28 10,15 A15,15 0,1,0 -10,15 Q0,28 0,47"
        />
        <circle cx="0" cy="4" r="4" fill="black" stroke="none" />
      </svg>
    )
  }
}
