import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Block } from '../../common/block'

class ButtonGroup extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            action: PropTypes.func
        })),
        orientation: PropTypes.oneOf(['row', 'column']),
        defaultSelectedId: PropTypes.string
    }
    static defaultProps = {
        data: [
            { id: 'test1', name: 'Test One', action: () => console.log('test1') },
            { id: 'test2', name: 'Test Two', action: () => console.log('test2') },
            { id: 'test3', name: 'Test Three', action: () => console.log('test3') },
        ],
        orientation: 'column',
        defaultSelectedId: 'test2'
    }
    constructor(props) {
        super(props)
        this.state = {
            id: ''
        }
    }
    componentDidMount() {
        this.props.defaultSelectedId && this.setState({ id: this.props.defaultSelectedId }, () => {
            const item = this.props.data.find(v => v.id === this.props.defaultSelectedId)
            item.action && item.action(item)
        })
    }
    handleOnClick(item) {
        this.setState({ id: item.id }, () => {
            item.action && item.action(item)
        })
    }
    render() {
        const { data, orientation } = this.props
        return (
            <Group length={data.length} orientation={orientation}>
                {data.map((v, i) =>
                    <Button
                        key={i}
                        active={v.id === this.state.id}
                        onClick={this.handleOnClick.bind(this, v)}
                    >{v.name}</Button>
                )}
            </Group>
        )
    }
}
export default ButtonGroup


const Group = styled(Block)`
flex: 1 1 auto;
flex-direction: ${p=>p.orientation};
background-color: rgba(15, 15, 15, 0.9);
border: 1px solid rgba(0, 0, 0, 0.1);
color: rgba(255, 255, 255, 0.75);
border-radius: 3px;
${p=>p.orientation === 'column' ? `padding: 15px 0;` : `padding: 0 15px;`};
${p=>p.orientation === 'column' ? `height: ${p.length * 50}px` : `min-height: 50px`};

`
const Button = styled(Block)`
justify-content: center;
align-items: center;
width: 100%;
height: 50px;
${p => p.active && `
  background-color: rgba(15, 15, 15, 1);
  outline: 4px solid rgba(15, 15, 15, 1);
  color: white;
  font-size: 1.1rem;
  z-index: 1;
`}
&:hover {
  cursor: pointer;
  ${p => !p.active && 'background-color: rgba(255, 255, 255, 0.05)'};
}
`