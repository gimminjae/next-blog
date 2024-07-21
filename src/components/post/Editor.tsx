import { useCallback, useMemo } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "prismjs/themes/prism.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import Prism from "prismjs";
import dynamic from "next/dynamic";

// const Prism = dynamic(() => require("prismjs"), {
//   ssr: false,
//   // loading: () => <p>Loading...</p>,
// });
// const colorSyntax = dynamic(
//   () => import("@toast-ui/editor-plugin-color-syntax"),
//   {
//     ssr: false,
//   }
// );
// const codeSyntaxHighlight = dynamic(
//   () => import("@toast-ui/editor-plugin-code-syntax-highlight"),
//   {
//     ssr: false,
//   }
// );

export default function ToastEditor({
  editorRef,
  initialValue,
  initialEditType,
  id,
  onChange,
  preview,
}: any) {
  const handleChange = useCallback(() => {
    const markdown = editorRef?.current?.getInstance().getMarkdown();
    const e = {
      target: {
        id: id,
        value: markdown,
      },
    };
    onChange(e);
  }, [editorRef, onChange, id]);
  const editor = useMemo(() => {
    return (
      Editor && (
        <Editor
          ref={editorRef}
          initialValue=""
          initialEditType={initialEditType}
          previewStyle={preview}
          hideModeSwitch={true}
          height="calc(100vh - 380px)"
          theme={""} // '' & 'dark'
          usageStatistics={false}
          onChange={handleChange}
          // toolbarItems={toolbarItems}
          useCommandShortcut={true}
          plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
          // hooks={{ addImageBlobHook: onUploadImage }} // firebase 이미지 업로드
        />
      )
    );
    // setTimeout(() => {

    //   );
    // }, 3000);
  }, []);
  return <>{typeof window !== "undefined" && editorRef && editor}</>;
}
