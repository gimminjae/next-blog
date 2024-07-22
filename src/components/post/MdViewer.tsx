import MDEditor from "@uiw/react-md-editor";

const MdViewer = ({ content }: any) => {
  return (
    <>
      <div
        className="markdownDiv"
        data-color-mode="light"
        style={{ padding: 15 }}
      >
        <MDEditor.Markdown style={{ padding: 10 }} source={content} />
      </div>
    </>
  );
};
export default MdViewer;
