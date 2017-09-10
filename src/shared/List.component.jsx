import React from 'react'

import { keyColor, textColor } from './styles'

class List extends React.Component {
  componentDidMount() {
    this.selectedItem.scrollIntoView()
  }

  render() {
    const { items, selected, onSelect } = this.props
    return (
      <ul style={{
        ...styles.container,
        ...items.length > 4 ? styles.scroll : undefined,
      }}>
        {Object.keys(items).map(value =>
          <li
            key={value}
            ref={ref => (value === selected) && (this.selectedItem = ref)}
            style={{
              ...styles.item,
              ...value === selected ? styles.selected : undefined,
            }}
            onClick={() => onSelect(value)}
          >
            {items[value]}
          </li>
        )}
      </ul>
    )
  }
}

const styles = {
  container: {
    listStyleType: 'none',
    padding: 0,
    fontSize: 12,
    backgroundColor: 'white',
    color: textColor,
    height: 80,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
  },
  scroll: {
    overflowY: 'scroll',
  },
  item: {
    padding: '2px 8px',
    cursor: 'pointer',
  },
  selected: {
    backgroundColor: keyColor,
    color: 'white',
  },
}

export default List