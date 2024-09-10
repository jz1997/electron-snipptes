declare module 'list-item-editor' {
  export interface ListItemEditorEntity {
    id?: number | bigint | string
    label?: string
  }

  export interface ListItemEditorState extends ListItemEditorEntity {
    showEditor?: boolean
    inputRef?: React.RefObject<HTMLInputElement>
  }

  export interface ListItemEditorProps {
    entity: ListItemEditorEntity
  }
}
