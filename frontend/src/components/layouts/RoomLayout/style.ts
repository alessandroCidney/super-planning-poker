import styled from 'styled-components'

import { motion } from 'motion/react'

export const StyledMain = styled.section`
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  overflow: hidden;
`

export const StyledSection = styled(motion.section)`
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;
`