import MDEditor from "@uiw/react-md-editor"

const MdViewer = ({ content }: any) => {
  return (
    <>
      <div className="markdownDiv" data-color-mode="light">
        <MDEditor.Markdown source={content} className="my-5" />
      </div>
    </>
  )
}
export default MdViewer
