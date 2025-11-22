import React from 'react'
import { BsCheck, BsX } from 'react-icons/bs'

import { DefaultButton } from '@/components/commons/DefaultButton'
import { SimpleInput } from '@/components/commons/SimpleInput'

import { allFormRules, useFormRules } from '@/features/forms/hooks/useFormRules'

import { StyledCardActions, StyledCardFormContainer, StyledHeader } from './styles'
import { ErrorMessageWrapper } from '@/features/forms/components/ErrorMessageWrapper'

interface UsFormProps {
  onSubmit: (title: string) => void | Promise<void>
  onCancel: () => void | Promise<void>
}

export function UsForm({ onSubmit, onCancel }: UsFormProps) {
  const titleFieldControls = useFormRules({
    initialValue: '',
    selectedRules: [
      allFormRules.requiredString,
      allFormRules.maxLength(1000),
    ],
  })

  function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault()

    if (titleFieldControls.validate().valid) {
      onSubmit(titleFieldControls.value)
    }
  }

  return (
    <StyledCardFormContainer
      onSubmit={handleSubmit}
    >
      <StyledHeader>
        <ErrorMessageWrapper
          errorMessage={titleFieldControls.errorMessage}
        >
          <SimpleInput
            label='Título da Tarefa'
            value={titleFieldControls.value}
            autoFocus
            onChange={e => titleFieldControls.setValue(e.target.value)}
          />
        </ErrorMessageWrapper>
      </StyledHeader>

      <StyledCardActions>
        <DefaultButton
          prependIcon={<BsCheck size={25} />}
          color='var(--theme-primary-lighten-3-color)'
        >
          Salvar
        </DefaultButton>

        <DefaultButton
          prependIcon={<BsX size={25} />}
          color='var(--theme-primary-lighten-3-color)'
          onClick={onCancel}
        >
          Cancelar
        </DefaultButton>
      </StyledCardActions>
    </StyledCardFormContainer>
  )
}