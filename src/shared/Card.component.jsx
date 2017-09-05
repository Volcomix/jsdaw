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
    borderLeftColor: borderColor,
    borderLeftWidth: 1,
    borderLeftStyle: 'solid',
  },
  content: {
    display: 'flex',
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 12,
    color: borderColor,
    marginLeft: 8,
  },
}

export default Card