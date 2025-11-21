import styled from 'styled-components'

import { motion } from 'motion/react'

interface StyledCircleProps {
  $backgroundImage: string
}

export const StyledUserContainer = styled(motion.div)<StyledCircleProps>`
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;

  border-radius: 50%;

  background-image: ${props => `url('${props.$backgroundImage}')`};
  background-size: 100%;
  background-position: center 67px;

  &.user-avatar--disabled {
    filter: saturate(0);
  }
`

export const StyledUserName = styled.div`
  position: absolute;

  top: -25px;
  
  min-width: 100%;

  padding: 0 10px;

  color: #767676;
  font-size: 12px;
  text-align: center;
  
  background-color: #f6f6f6;

  border-radius: 8px;
`