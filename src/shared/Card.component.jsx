import React from 'react'

const Card = ({ title, children }) => (
  <fieldset>
    <legend>{title}</legend>
    <div style={styles.container}>{children}</div>
  </fieldset>
)

const styles = {
  container: {
    display: 'flex',
  },
}

export default Card