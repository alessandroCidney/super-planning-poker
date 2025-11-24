import styled from 'styled-components'

import { motion } from 'motion/react'

export const Container = styled(motion.div)`
  position: absolute;
  top: 90px;
  left: 10px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;

  padding: 0 20px;

  height: 50px;

  color: rgb(4, 150, 255);

  background-color: rgb(4, 150, 255, .1);

  border-radius: 9999px;

  span {
    max-width: 300px;

    overflow: hidden;
    
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`