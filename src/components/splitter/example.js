import React, { Component } from 'react'

import { Block } from '../../common/block'
import Splitter from './splitter'
import Particle from '../particle'
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
        const { panel1Width, panel2Width, panel1Height, panel2Height } = this.state
        return (
            <Block style={{ height: '600px', flex: '0 0 900px', border: '1px solid black', overflow: 'hidden' }}>
                <Splitter orientation='column'
                    panel1={() => (
                        <Splitter orientation='row'
                            panel1={() => (
                                <Block>
                                    <Particle
                                        width={panel1Width}
                                        height={panel1Height}
                                        nodeCount={Math.floor(panel1Width / 5)}
                                        radius={2.5}
                                        minDistance={40}
                                        maxDistance={60}
                                        fillColor='rgba(0,0,0,1)'
                                        strokeColor='rgba(0,0,0,1)' />
                                </Block>
                            )}
                            panel2={() => (
                                <Block>
                                    <Particle
                                        width={panel2Width}
                                        height={panel2Height}
                                        nodeCount={Math.floor(panel2Width / 5)}
                                        radius={2.5}
                                        minDistance={40}
                                        maxDistance={60}
                                        fillColor='blue'
                                        strokeColor='blue' />
                                </Block>
                            )}
                            onUpdate={this.handleOnUpdate.bind(this)}
                        />
                    )}
                    panel2={() => (
                        <Block style={{ padding: '20px', overflow: 'hidden'}}>
                            <Block style={{ width: '100px', height: '100px', backgroundColor: 'blue' }}>

                            </Block>
                        </Block>
                    )}
                />
            </Block>
        )
    }
}
export default SplitterExample