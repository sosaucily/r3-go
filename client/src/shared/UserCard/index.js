import React from 'react'
import classnames from 'classnames'

import Avatar from 'shared/Avatar'
import styles from './styles.scss'

export default function UserCard({ avatar, className, onClick, text }) {
  const classes = classnames(styles.card, className)

  return (
    <div className={classes} onClick={onClick}>
      <div className={styles.avatar}>
        <Avatar image={avatar} />
      </div>
      <div className={styles.nameTextBox}>
        <div className={styles.email}>{text}</div>
      </div>
    </div>
  )
}
