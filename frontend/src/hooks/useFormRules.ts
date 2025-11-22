import { useState } from 'react'

export const allFormRules = {
  requiredString: (str: string) => ({
    valid: !!str,
    message: str ? undefined : 'Este campo é obrigatório.',
  }),
  maxLength: (max: number) => (str: string) => ({
    valid: str.length <= max,
    message: str ? undefined : `No máximo ${max} caracteres.`,
  }),
}

interface UseFormRulesProps<T> {
  initialValue: T

  selectedRules: Array<(value: T) => { valid: boolean, message?: string }>
}

export function useFormRules<T>({ initialValue, selectedRules }: UseFormRulesProps<T>) {
  const [value, setValue] = useState<T>(initialValue)
  const [valid, setValid] = useState<boolean>()
  const [errorMessage, setErrorMessage] = useState<string>()

  function validate(validationValue = value) {
    for (const ruleFn of selectedRules) {
      const validationResult = ruleFn(validationValue)

      setValid(validationResult.valid)
      setErrorMessage(validationResult.message)

      if (!validationResult.valid) {
        return validationResult
      }
    }

    return {
      valid: true,
    }
  }

  function resetValidations() {
    setValid(false)
    setErrorMessage(undefined)
  }

  return {
    value,
    setValue,

    valid,

    errorMessage,

    validate,
    resetValidations,
  }
}