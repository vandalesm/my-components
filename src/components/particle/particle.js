import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Particle extends Component {
    static propTypes = {
        width: PropTypes.number,
        height: PropTypes.number,
        fillColor: PropTypes.string,
        strokeColor: PropTypes.string,
        nodeCount: PropTypes.number,
        radius: PropTypes.number,
        minDistance: PropTypes.number,
        maxDistance: PropTypes.number
    }
    static defaultProps = {
        width: 500,
        height: 500,
        fillColor: 'rgba(255,255,255,1)',
        strokeColor: 'rgba(255,255,255,1)',
        nodeCount: 100,
        radius: 3,
        minDistance: 40,
        maxDistance: 60

    }
    constructor(props) {
        super(props)
        this.state = {
            canvas: {},
        }
        this.interval = {}
    }
    componentDidMount() {
        this.draw()
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    draw() {
        let cGen = this.updateCanvas()
        this.interval = setInterval(() => {
            cGen.next()
        }, 100)
    }
    *updateCanvas() {
        let context = this.refs.canvas.getContext('2d')
        const {
            width,
            height,
            radius,
            nodeCount,
            minDistance,
            maxDistance
        } = this.props
        const minDistance2 = minDistance * minDistance;
        const maxDistance2 = maxDistance * maxDistance;

        const particles = new Array(nodeCount)
        for (let i = 0; i < nodeCount; ++i) {
            particles[i] = {
                x: Math.random() * width,
                y: Math.random() * height,
                vx: 0,
                vy: 0
            };
        }

        while (true) {
            context.save();
            context.clearRect(0, 0, width, height);
            for (let i = 0; i < nodeCount; ++i) {
                const p = particles[i];
                p.x += p.vx;
                if (p.x < -maxDistance) p.x += width + maxDistance * 2;
                else if (p.x > width + maxDistance) p.x -= width + maxDistance * 2;
                p.y += p.vy;
                if (p.y < -maxDistance) p.y += height + maxDistance * 2;
                else if (p.y > height + maxDistance) p.y -= height + maxDistance * 2;
                p.vx += 0.2 * (Math.random() - .5) - 0.01 * p.vx;
                p.vy += 0.2 * (Math.random() - .5) - 0.01 * p.vy;
                context.fillStyle = this.props.fillColor
                context.strokeStyle = this.props.strokeColor
                context.beginPath();
                context.arc(p.x, p.y, radius, 0, 2 * Math.PI);
                context.fill();
            }
            for (let i = 0; i < nodeCount; ++i) {
                for (let j = i + 1; j < nodeCount; ++j) {
                    const pi = particles[i];
                    const pj = particles[j];
                    const dx = pi.x - pj.x;
                    const dy = pi.y - pj.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < maxDistance2) {
                        context.globalAlpha = d2 > minDistance2 ? (maxDistance2 - d2) / (maxDistance2 - minDistance2) : 1;
                        context.beginPath();
                        context.moveTo(pi.x, pi.y);
                        context.lineTo(pj.x, pj.y);
                        context.stroke();
                    }
                }
            }
            context.restore();
            yield context.canvas;
        }
    }
    render() {
        return (
            <canvas width={this.props.width} height={this.props.height} ref='canvas'></canvas>
        )
    }
}

export default Particle
