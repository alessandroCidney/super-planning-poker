import styled from 'styled-components'

import { motion } from 'motion/react'

interface StyledCircleProps {
  $backgroundImage: string
}

export const StyledUserName = styled.div`
  position: absolute;

  top: -25px;
  
  padding: 0 10px;

  min-width: 100%;
  max-width: 200px;
  
  overflow: hidden;

  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  text-align: center;
  color: #767676;
  
  background-color: #f6f6f6;

  border-radius: 8px;
`

export const StyledUserContainer = styled(motion.div)<StyledCircleProps>`
  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 54px;
  height: 54px;

  border-radius: 50%;
  border: 2px solid #fff;
  outline: 2px solid #000;

  background-image: ${props => `url('${props.$backgroundImage}')`};
  background-size: 100%;
  background-position: center 67px;

  &.user-avatar--disabled {
    filter: saturate(0);
  }

  &.user-avatar--owner {
    outline: 2px solid var(--theme-primary-darken-2-color);

    ${StyledUserName} {
      color: #fff;

      background-color: var(--theme-primary-darken-1-color);
    }
  }
`