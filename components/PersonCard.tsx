// libs
import React, { FC } from 'react'
import PropTypes from 'prop-types'
// components
import Image from 'next/image'
// styles
import styles from 'styles/PersonCard.module.css'
// types
import { IPerson } from 'lib/interfaces/IPerson'

export const PersonCard: FC<{ person: IPerson }> = ({ person }) => {
  const { avatar, fullName, quote, skill } = person
  return (
    <div className={styles.wrapper}>
      <Image src={avatar} width='100px' height='100px' className={styles.avatar} />
      {fullName && <h1 className={styles.name}>{fullName}</h1>}
      {skill && <h3>{skill}</h3>}
      {quote && <p>{quote}</p>}
    </div>
  )
}

PersonCard.propTypes = {
  person: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    quote: PropTypes.string.isRequired,
    skill: PropTypes.string.isRequired,
  }).isRequired,
}
