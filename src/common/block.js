import styled from 'styled-components'

export const Block = styled.div`
display: flex;
flex: 1 1 auto;
flex-direction: ${p => p.column ? 'column' : 'row'};
`