import React from 'react'

const Card = ({ title, children }) => (
  <fieldset style={styles.container}>
    <legend>{title}</legend>
    {children}
  </fieldset>
)

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
  },
}

export default Card