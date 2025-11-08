import { AppButton } from '../../commons/AppButton'
import { StyledAside, StyledMain, StyledSection, StyledCard } from './styles'

export function Room() {
  const exampleCards = [
    {
      title: 'Criar novo botão',
      description: 'Eu, como usuário, gostaria de que houvesse um novo botão bolado.',
    },
  ]

  return (
    <StyledMain>
      <StyledSection>
        Room
      </StyledSection>

      <StyledAside>
        <header>
          <h2>
            Fila de USs
          </h2>

          <AppButton
          >
            Criar nova
          </AppButton>
        </header>

        <div>
          {
            exampleCards.map((cardData, cardDataIndex) => (
              <StyledCard
                key={`cardData${cardDataIndex}`}
              >
                <header>
                  <h3>
                    { cardData.title }
                  </h3>
                </header>

                <p>
                  { cardData.description }
                </p>
              </StyledCard>
            ))
          }
        </div>
      </StyledAside>
    </StyledMain>
  )
}
