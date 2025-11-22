import styled from 'styled-components'

import { motion } from 'motion/react'

export const StyledAside = styled(motion.aside)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  position: absolute;
  top: 0;
  right: 0;

  width: 500px;
  height: 100%;

  padding-top: 30px;

  color: #fff;

  background-color: var(--theme-primary-color);

  > header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;

    padding: 0 30px;
    margin-bottom: 20px;
  }
`