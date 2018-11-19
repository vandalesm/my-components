import React, { Component } from 'react'

import { Block } from '../../common/block'
import ButtonGroup from './button-group'

class ButtonGroupExample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: ''
        }
        this.data = [
            { id: 'test1', name: 'Test One', action: (item) => this.setState({ selected: item.name }) },
            { id: 'test2', name: 'Test Two', action: (item) => this.setState({ selected: item.name }) },
            { id: 'test3', name: 'Test Three', action: (item) => this.setState({ selected: item.name }) },
            { id: 'test4', name: 'Test Four', action: (item) => this.setState({ selected: item.name }) },
            { id: 'test5', name: 'Test Five', action: (item) => this.setState({ selected: item.name }) },
        ]
    }
    render() {
        return (
            <Block column justifyCenter>
                <Block style={{ flex: '0 0 auto', width: '300px' }}>
                    <ButtonGroup data={this.data}></ButtonGroup>
                </Block>
                <Block withMargin />
                <div>{this.state.selected}</div>
                <Block withMargin />
                <Block style={{ flex: '0 0 auto', width: '700px' }}>
                    <ButtonGroup data={this.data} orientation='row'></ButtonGroup>
                </Block>
            </Block>
        )
    }
}
export default ButtonGroupExample