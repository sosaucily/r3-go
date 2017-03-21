import React from 'react'
import { isNil, join, map, pipe, reject } from 'ramda'

import defaultAvatar from 'assets/images/default-avatar.png'
import styles from './styles.scss'

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
    <div className={styles.avatar} style={localStyles} />
  )
}
