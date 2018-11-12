import React, { Component } from 'react'

import Particle from './components/particle/particle.js'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rect: {}
    }
  }
  componentDidMount() {
    this.setState({ rect: this.refs.container.getBoundingClientRect() })
  }
  render() {
    return (
      <div ref='container' style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
      }}>
        <Particle
          width={this.state.rect.width}
          height={600}
          nodeCount={200}
          radius={3.5}
          minDistance={80}
          maxDistance={100}
          fillColor='rgba(255,255,255,1)'
          strokeColor='rgba(255,255,255,1)' />
      </div>
    )
  }
}

export default App
