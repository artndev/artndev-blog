import MDPreview from '@uiw/react-markdown-preview'
import React from 'react'

function MarkdownPreview({ source, className }) {
  return (
    <div data-color-mode="light">
      <MDPreview
        source={source}
        className={className}
        style={{
          backgroundColor: 'transparent',
        }}
      />
    </div>
  )
}

export default MarkdownPreview
