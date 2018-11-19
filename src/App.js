import React, { Component } from 'react'
//import styled from 'styled-components'
import { Block } from './common/block'
import ButtonGroup from './components/button-group'

import ParticleExample from './components/particle/example'
import SplitterExample from './components/splitter/example'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedComponent: <span />
    }
    this.components = [
      { id: 'particle', name: 'Particle', action: (item) => this.setState({ selectedComponent: item.component }), component: <ParticleExample /> },
      { id: 'splitter', name: 'Splitter', action: (item) => this.setState({ selectedComponent: item.component }), component: <SplitterExample /> },
    ]
  }
  render() {
    return (
      <Block>
        <Block style={{ width: '250px', padding: '10px', flex: '0 0 auto' }}>
          <ButtonGroup data={this.components} defaultSelectedId='splitter' />
        </Block>
        <Block style={{ padding: '10px' }}>
          {this.state.selectedComponent}
        </Block>
      </Block>
    )
  }
}

export default App
