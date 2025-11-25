import { BsArrowLeft } from 'react-icons/bs'

import cards404Img from '@/assets/images/illustrations/cards-404.png'

import { DefaultButton } from '@/components/commons/DefaultButton'

import { StyledContainer } from './styles'

export function Error404() {
  return (
    <StyledContainer>
      <h1>
        <img
          src={cards404Img}
          alt='Erro 404'
          width='500px'
        />
      </h1>

      <p>
        Essa página não existe ou você não possui autorização para acessá-la.
      </p>

      <DefaultButton
        to={{
          pathname: '/',
        }}
        anchor
        prependIcon={<BsArrowLeft size={25} />}
      >
        Voltar para o início
      </DefaultButton>
    </StyledContainer>
  )
}