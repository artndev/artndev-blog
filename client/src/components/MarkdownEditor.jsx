import React from 'react'
import MDEditor, { commands } from '@uiw/react-md-editor'

function MarkdownEditor({ value, onChange }) {
  return (
    <div data-color-mode="light">
      <MDEditor
        id="text"
        value={value}
        onChange={onChange}
        preview="edit"
        textareaProps={{
          placeholder: 'Write your thoughts...',
        }}
        minHeight={500}
        maxHeight={500}
        commands={[
          commands.group([commands.title1, commands.title2, commands.title3], {
            name: 'title',
            groupName: 'title',
            buttonProps: { 'aria-label': 'Insert title' },
          }),
          commands.bold,
          commands.italic,
          commands.strikethrough,
          commands.divider,
          commands.link,
          commands.quote,
          commands.codeBlock,
          commands.image,
          commands.divider,
          commands.orderedListCommand,
          commands.unorderedListCommand,
        ]}
        extraCommands={[
          commands.codeEdit,
          commands.codeLive,
          commands.codePreview,
        ]}
        highlightEnable={false}
      />
    </div>
  )
}

export default MarkdownEditor
