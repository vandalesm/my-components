import styled from 'styled-components'

export const Block = styled.div`
display: flex;
flex: 1 1 auto;
flex-direction: ${p => p.column ? 'column' : 'row'};
justify-content: ${p=>p.justifyCenter ? 'center' :
    p.justifyStart ? 'flex-start' :
    p.justifyEnd ? 'flex-end' :
    p.justifyAround ? 'space-around' :
    p.justifyBetween ? 'space-between' : 'inherit'
};
${p=>p.withMargin && 'margin: 10px;'}
`