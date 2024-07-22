import MDEditor from "@uiw/react-md-editor"
import { useState, useCallback, ChangeEvent } from "react"

const MdEditor = ({ value, onChange }: any) => {
  return (
    <div className="markarea">
      <div data-color-mode="light">
        <MDEditor
          height={865}
          value={value}
          onChange={(value, viewUpdate) => {
            onChange(value)
          }}
        />
      </div>
    </div>
  )
}
export default MdEditor
