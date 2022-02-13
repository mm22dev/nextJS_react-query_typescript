// libs
import React, { FC } from 'react'
import PropTypes from 'prop-types'
// styles
import styles from 'styles/Home.module.css'
// types
import { IPerson } from 'lib/interfaces/IPerson'

export const PersonCard: FC<IPerson> = ({ id, name, age }) => {
  return (
    <div className={styles.card}>
      <p>{`ID: ${id}`}</p>
      <p>{`Name: ${name}`}</p>
      <p>{`Age: ${age}`}</p>
    </div>
  )
}

PersonCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
}
