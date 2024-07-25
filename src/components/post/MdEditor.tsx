import { store } from "@/firebase/storage"
import MDEditor from "@uiw/react-md-editor"
import { useState, useCallback, ChangeEvent, SetStateAction } from "react"
import Loading from "../common/Loading"

const MdEditor = ({ value, onChange }: any) => {
  const insertToTextArea = (intsertString: string) => {
    const textarea = document.querySelector("textarea")
    if (!textarea) {
      return null
    }

    let sentence = textarea.value
    const len = sentence.length
    const pos = textarea.selectionStart
    const end = textarea.selectionEnd

    const front = sentence.slice(0, pos)
    const back = sentence.slice(pos, len)

    sentence = front + intsertString + back

    textarea.value = sentence
    textarea.selectionEnd = end + intsertString.length

    return sentence
  }
  const onImagePasted = async (
    dataTransfer: DataTransfer,
    setMarkdown: (value: SetStateAction<string | undefined>) => void
  ) => {
    const files: File[] = []
    for (let index = 0; index < dataTransfer.items.length; index += 1) {
      const file = dataTransfer.files.item(index)

      if (file) {
        files.push(file)
      }
    }

    await Promise.all(
      files.map(async (file) => {
        const url = await store.uploadImage(file)
        const insertedMarkdown = insertToTextArea(
          `![](${url})`
          //   `<img src="${url}" alt="image" width=600 />`
        )
        if (!insertedMarkdown) {
          return
        }
        setMarkdown(insertedMarkdown)
      })
    )
  }

  return (
    <div className="markarea">
      <div data-color-mode="light">
        <MDEditor
          height={865}
          value={value}
          onChange={(value, viewUpdate) => {
            onChange(value)
          }}
          onPaste={async (event) => {
            await onImagePasted(event.clipboardData, onChange)
          }}
          onDrop={async (event) => {
            event.preventDefault()
            await onImagePasted(event.dataTransfer, onChange)
          }}
        />
      </div>
    </div>
  )
}
export default MdEditor
