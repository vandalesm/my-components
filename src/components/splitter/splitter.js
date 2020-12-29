import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Block } from '../../common/block'

class Splitter extends Component {
    static propTypes = {
        orientation: PropTypes.oneOf(['row', 'column']),
        height: PropTypes.number,
        panel1: PropTypes.func,
        panel2: PropTypes.func,
        onUpdate: PropTypes.func,
    }
    static defaultProps = {
        orientation: 'row',
        panel1: () => <div><h1>PANEL 1</h1></div>,
        panel2: () => <div>PANEL 2</div>
    }
    constructor(props) {
        super(props)
        this.state = {
            isMouseDown: false,
            isDragging: false,
        }
    }
    componentDidMount() {
        this.props.onUpdate && this.props.onUpdate(this.panel1.getBoundingClientRect(), this.panel2.getBoundingClientRect())
    }
    handleMouseMove(evt) {
        evt.preventDefault()
        if (this.state.isMouseDown) {
            !this.state.isDragging && this.setState({ isDragging: true })
            const rect = this.panel1.getBoundingClientRect()
            if (this.props.orientation === 'row') {
                const panel1Width = evt.clientX - rect.left
                this.panel1.style.flex = '0 0 ' + panel1Width + 'px'
            } else {
                const panel1Height = evt.clientY - rect.top
                this.panel1.style.flex = '0 0 auto'
                this.panel1.style.height = panel1Height + 'px'
            }
        }
    }
    handleMouseDown(evt) {
        evt.preventDefault()
        this.setState({ isMouseDown: true })
    }
    handleMouseUp(evt) {
        evt.preventDefault()
        this.endDrag()
    }
    handleMouseLeave(evt) {
        evt.preventDefault()
        this.endDrag()
    }
    endDrag() {
        if (this.state.isMouseDown) {
            this.setState({ isMouseDown: false })
            if (this.state.isDragging) {
                this.props.onUpdate && this.props.onUpdate(this.panel1.getBoundingClientRect(), this.panel2.getBoundingClientRect())
                this.setState({ isDragging: false })
            }
        }
    }
    render() {
        return (
            <Container orientation={this.props.orientation}
                height={this.props.height}
                onMouseUp={this.handleMouseUp.bind(this)}
                onMouseMove={this.handleMouseMove.bind(this)}
                onMouseLeave={this.handleMouseLeave.bind(this)}>
                <Panel ref={c => this.panel1 = c}>
                    {this.props.panel1()}
                </Panel>
                <Handle
                    orientation={this.props.orientation}
                    onMouseDown={this.handleMouseDown.bind(this)}
                />
                <Panel ref={c => this.panel2 = c}>
                    {this.props.panel2()}
                </Panel>
            </Container>
        )
    }
}
export default Splitter

const Container = styled.div`
display: flex;
flex: 1 1 auto;
backface-visibility: hidden;
flex-direction: ${p => p.orientation};
${p=>p.height && 'height: ' + p.height + 'px'};
`
const Panel = styled(Block)`
min-height: 30px;
overflow: auto;
`
const Handle = styled.div`
display: 'flex';
flex: 0 0 10px;
backface-visibility: hidden;
background-color: rgba(15, 15, 15, 0.25);
z-index: 1;
&:hover {
    cursor: ${p => p.orientation === 'row' ? 'col-resize' : 'row-resize'};
}
`