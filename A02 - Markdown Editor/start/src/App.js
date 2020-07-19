import React, { useState } from 'react'
import ReactMarkdown from "react-markdown";
import './App.css'

export default function App() {
  const [markdown, setMarkdown] = useState('# sup')

  // onChange set the value of the text area
  function handleChange(event) {
    setMarkdown(event.target.value)
  }

  return (
    <div className="app">
      <textarea onChange={handleChange} value={markdown} />

      <ReactMarkdown className="preview" source={markdown} />
    </div>
  );
}
