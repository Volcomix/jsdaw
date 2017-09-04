import React from 'react'

import { borderColor } from './styles'

const Card = ({ title, children }) => (
  <fieldset style={styles.container}>
    <legend style={styles.title}>{title}</legend>
    <div style={styles.content}>{children}</div>
  </fieldset>
)

const styles = {
  container: {
    border: 'none',
    marginTop: -9,
  },
  content: {
    display: 'flex',
  },
  title: {
    fontSize: 12,
    color: borderColor,
    textAlign: 'center',
    width: '100%',
  },
}

export default Card