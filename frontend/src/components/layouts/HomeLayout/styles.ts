import styled from 'styled-components'

import cardBackground from '@/assets/images/backgrounds/card-background.jpg'

export const StyledMain = styled.section`
  height: 100vh;
  width: 100vw;

  position: relative;

  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  background: url(${cardBackground});
`
