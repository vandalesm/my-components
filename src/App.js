import React, { Component } from 'react'
//import styled from 'styled-components'
import { Block } from './common/block'
import ButtonGroup from './components/button-group'

import ParticleExample from './components/particle/example'
import SplitterExample from './components/splitter/example'
import ButtonGroupExample from './components/button-group/example'
import EditableDropdownExample from './components/editable-dropdown'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedComponent: <span />
    }
    this.components = [
      { id: 'particle', name: 'Particle', action: (item) => this.setState({ selectedComponent: item.component }), component: <ParticleExample /> },
      { id: 'splitter', name: 'Splitter', action: (item) => this.setState({ selectedComponent: item.component }), component: <SplitterExample /> },
      { id: 'buttonGroup', name: 'Button Group', action: (item) => this.setState({ selectedComponent: item.component }), component: <ButtonGroupExample /> },
      { id: 'editableDropdown', name: 'Editable Dropdown', action: (item) => this.setState({ selectedComponent: item.component }), component: <EditableDropdownExample /> },
    ]
  }
  render() {
    return (
      <Block>
        <Block style={{ width: '250px', padding: '10px', flex: '0 0 auto' }}>
          <ButtonGroup data={this.components} defaultSelectedId='editableDropdown' />
        </Block>
        <Block style={{ padding: '10px' }}>
          {this.state.selectedComponent}
        </Block>
      </Block>
    )
  }
}

export default App
