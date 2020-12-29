import React, { Component } from 'react'

import { Block } from '../../common/block'
import Splitter from './splitter'
class SplitterExample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            panel1Width: 300,
            panel2Width: 300,
            panel1Height: 300,
            panel2Height: 300
        }
    }
    handleOnUpdate(panel1, panel2) {
        this.setState({
            panel1Width: panel1.width,
            panel2Width: panel2.width,
            panel1Height: panel1.height,
            panel2Height: panel2.height
        })
    }
    render() {
        const { panel2Width, panel2Height } = this.state
        const itemCount = Math.floor(panel2Width / 100) * Math.floor(panel2Height / 100)
        const arr = Array(itemCount).fill('x')
        return (
            <Block withBorder style={{ height: '650px', flex: '0 0 900px', overflow: 'hidden' }}>
                <Splitter orientation='column'
                    panel1={() => (
                        <Splitter orientation='row'
                            panel1={() => (
                                <Block justifyCenter alignItemsCenter withWrap withClip>
                                    {Array(4).fill('x').map((v, i) => {
                                        return (
                                            <Block key={i} noGrow baseWidth='100px' style={{ height: '100px' }} alignItemsStretch>
                                                <Block justifyCenter alignItemsCenter style={{ margin: '5px', backgroundColor: 'rgba(15, 15, 15, 0.9)', color: 'white' }}>{i + 1}</Block>
                                            </Block>
                                        )
                                    })}
                                </Block>
                            )}
                            panel2={() => (
                                <Block justifyCenter alignItemsCenter withWrap withClip>
                                    {Array(4).fill('x').map((v, i) => {
                                        return (
                                            <Block key={i} noGrow baseWidth='100px' style={{ height: '100px' }} alignItemsStretch>
                                                <Block justifyCenter alignItemsCenter style={{ margin: '5px', backgroundColor: 'rgba(15, 15, 15, 0.9)', color: 'white' }}>{i + 1}</Block>
                                            </Block>
                                        )
                                    })}
                                </Block>
                            )}
                        />
                    )}
                    panel2={() => (
                        <Block justifyCenter alignItemsCenter withWrap withClip>
                            {arr.map((v, i) => {
                                return (
                                    <Block key={i} noGrow baseWidth='100px' style={{ height: '100px' }} alignItemsStretch>
                                        <Block justifyCenter alignItemsCenter style={{ margin: '5px', backgroundColor: 'rgba(15, 15, 15, 0.9)', color: 'white' }}>{i + 1}</Block>
                                    </Block>
                                )
                            })}
                        </Block>
                    )}
                    onUpdate={this.handleOnUpdate.bind(this)}
                />
            </Block>
        )
    }
}
export default SplitterExample