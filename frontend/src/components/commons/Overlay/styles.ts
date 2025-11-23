import styled from 'styled-components'

import { motion } from 'motion/react'

import { DefaultButton } from '../DefaultButton'

export const StyledOverlay = styled(motion.div)`
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;
  
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: rgb(0, 0, 0, .7);
`

export const StyledCloseButton = styled(DefaultButton)`
  position: absolute;
  top: 10px;
  right: 10px;
`
