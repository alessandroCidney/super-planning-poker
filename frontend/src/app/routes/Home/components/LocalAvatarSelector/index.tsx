import { useState } from 'react'

import { BsPencilFill } from 'react-icons/bs'

import { UserAvatar } from '@/features/room/components/UserAvatar'
import { AvatarSelector } from '@/features/room/components/AvatarSelector'

import type { User } from '@/types/users'

import { StyledButton, StyledContainer, StyledFloatingIcon } from './styles'

interface LocalAvatarSelectorProps {
  value: User['avatar']

  onSelect: (newValue: User['avatar']) => void
}

export function LocalAvatarSelector({ onSelect, value }: LocalAvatarSelectorProps) {
  const [showAvatarSelector, setShowAvatarSelector] = useState(false)

  function handleSelect(newValue: User['avatar']) {
    onSelect(newValue)
    setShowAvatarSelector(false)
  }

  return (
    <StyledContainer>
      <StyledButton
        onClick={() => setShowAvatarSelector(true)}
        type='button'
      >
        <UserAvatar
          imageId={value.path}
          size='120px'
        />
        
        <StyledFloatingIcon>
          <BsPencilFill
            size={20} />
        </StyledFloatingIcon>
      </StyledButton>

      <AvatarSelector
        open={showAvatarSelector}
        value={value}
        onSelect={handleSelect}
        onClose={() => setShowAvatarSelector(false)}
      />
    </StyledContainer>
  )
}