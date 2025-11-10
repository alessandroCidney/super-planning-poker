import { DefaultButton } from '../../../../commons/DefaultButton'
import { StyledAside } from './styles'

export function RoomSidebar() {
  return (
    <StyledAside>
      <header>
        <h2>
          Tarefas
        </h2>
      </header>

      <section>
        <DefaultButton>
          Nova Tarefa
        </DefaultButton>
      </section>
    </StyledAside>
  )
}