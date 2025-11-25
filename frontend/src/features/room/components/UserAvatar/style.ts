import styled from 'styled-components'

interface StyledImageContainerProps {
  $backgroundImage?: string
  $size?: string
}

export const StyledImgContainer = styled.div<StyledImageContainerProps>`
  display: block;

  width: ${props => props.$size || '50px'};
  height: ${props => props.$size || '50px'};

  border-radius: 50%;

  background-image: ${props => `url('${props.$backgroundImage}')`};
  background-size: 100%;
  background-position: center calc(${props => props.$size || '50px'} * 1.34);
`