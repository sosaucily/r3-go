import React from 'react'
import { isNil, join, map, pipe, reject } from 'ramda'

import defaultAvatar from '../../../assets/images/default-avatar.png'
import AvatarContainer from './AvatarContainer'

const backgroundImages = pipe(
  reject(isNil),
  map(url => `url('${url}')`),
  join(', ')
)

export default function Avatar({ image }) {
  const localStyles = {
    backgroundImage: backgroundImages([image, defaultAvatar])
  }

  return (
    <AvatarContainer style={localStyles} />
  )
}
