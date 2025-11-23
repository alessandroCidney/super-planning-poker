import { useCallback, useMemo } from 'react'

import catKingImg from '@/assets/images/pixelarts/cat-king.png'
import dogWarriorImg from '@/assets/images/pixelarts/dog-warrior.png'
import birdWizardImg from '@/assets/images/pixelarts/bird-wizard.png'
import birdBusinesspersonImg from '@/assets/images/pixelarts/bird-businessperson.png'
import spyFoxImg from '@/assets/images/pixelarts/spy-fox.png'
import rabbitDoctorImg from '@/assets/images/pixelarts/rabbit-doctor.png'

export function useAvatars() {
  const avatarsArr = useMemo(() => [
    {
      imageId: 'cat-king',
      imagePath: catKingImg,
    },
    {
      imageId: 'dog-warrior',
      imagePath: dogWarriorImg,
    },
    {
      imageId: 'bird-wizard',
      imagePath: birdWizardImg,
    },
    {
      imageId: 'bird-businessperson',
      imagePath: birdBusinesspersonImg,
    },
    {
      imageId: 'spy-fox',
      imagePath: spyFoxImg,
    },
    {
      imageId: 'rabbit-doctor',
      imagePath: rabbitDoctorImg,
    },
  ], [])

  const getRandomAvatar = useCallback(() => {
    return avatarsArr[Math.floor(Math.random() * avatarsArr.length)]
  }, [avatarsArr])

  return {
    avatarsArr,
    getRandomAvatar,
  }
}