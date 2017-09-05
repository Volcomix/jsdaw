import React from 'react'

import { borderColor } from './styles'

const Card = ({ title, children }) => (
  <div style={styles.container}>
    <span style={styles.title}>{title}</span>
    <div style={styles.content}>{children}</div>
  </div>
)

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
  },
  content: {
    display: 'flex',
  },
  title: {
    fontSize: 12,
    color: borderColor,
    marginBottom: 4,
  },
}

export default Card