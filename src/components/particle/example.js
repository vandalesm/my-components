import React, { Component } from 'react'

import Particle from './particle.js'

class ParticleExample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rect: {}
        }
    }
    componentDidMount() {
        this.setState({rect: this.refs.container.parentElement.getBoundingClientRect()})
    }
    render() {
        const width = this.state.rect.width ? this.state.rect.width - 20 : 400
        return (
            <div ref='container' style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                border: '1px solid black'
            }}>
                <Particle
                    width={width}
                    height={300}
                    nodeCount={Math.floor(width / 5)}
                    radius={2.5}
                    minDistance={40}
                    maxDistance={60}
                    fillColor='rgba(0,0,0,1)'
                    strokeColor='rgba(0,0,0,1)' />
            </div>
        )
    }
}

export default ParticleExample
