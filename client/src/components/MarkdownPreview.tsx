import MDPreview from '@uiw/react-markdown-preview'
import React from 'react'

const MarkdownPreview: React.FC<IMarkdownPreviewProps> = ({
  source,
  className,
}) => {
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
