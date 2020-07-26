import React, { useState } from 'react'

const Tab = ({ children }) => {
  const [highLightStyle, setHighLightStyle] = useState({left: 0, opacity: 0})

  function moveHighlight(event) {
    // update highLightStyle to move the highlight
    setHighLightStyle({
      left: event.nativeEvent.layerX - 150,
    })
  }

  function hideHighlight(event) {
    setHighLightStyle({
      opacity: 0,
      left: event.nativeEvent.layerX - 150,
    })
  }

  return (
    <div className="tab" onMouseOut={hideHighlight} onMouseMove={moveHighlight}>
      <div className="highlight" style={highLightStyle} />
      { children }
    </div>
  )
}

export default Tab
