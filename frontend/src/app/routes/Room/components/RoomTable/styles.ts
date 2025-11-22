import styled from 'styled-components'

export const StyledTableContainer = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  height: calc(100vh - 80px - 210px);
`

interface StyledTableProps {
  $width: number
  $height: number
}

export const StyledTable = styled.div<StyledTableProps>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: ${props => props.$width}px;
  height: ${props => props.$height}px;
  
  background-color: #f1f1f1;

  border-radius: 50%;
`
