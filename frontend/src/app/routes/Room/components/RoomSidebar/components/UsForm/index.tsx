import React, { useState } from 'react'
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
  const [loading, setLoading] = useState({
    submit: false,
  })

  const titleFieldControls = useFormRules({
    initialValue: '',
    selectedRules: [
      allFormRules.requiredString,
      allFormRules.maxLength(1000),
    ],
  })

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault()

    if (titleFieldControls.validate().valid) {
      setLoading({ ...loading, submit: true })

      await onSubmit(titleFieldControls.value)

      setLoading({ ...loading, submit: false })
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
          loading={loading.submit}
          prependIcon={<BsCheck size={25} />}
          color='var(--theme-primary-lighten-3-color)'
          type='submit'
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