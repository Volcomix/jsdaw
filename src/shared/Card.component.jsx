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
    borderColor,
    borderWidth: 1,
    borderStyle: 'solid',
    marginTop: -7,
  },
  content: {
    display: 'flex',
  },
  title: {
    fontSize: 12,
    color: borderColor,
  },
}

export default Card