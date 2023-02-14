import { useEffect, useState } from "react";
import Editor from "../../../containers/Editor";
import { updateTerm, fetchSingleTerm } from "../../../services/apis";
import useAxios from "../../../hooks/useAxios";

function TermTab({ type }) {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [update, updating, updated, updatingError] = useAxios();
  const [content, setContent] = useState(null);
  const [language, setLanguage] = useState("vi");
  const [editorKey, setEditorKey] = useState(0);

  const submitHandler = () => {
    update(updateTerm({ type, content: content, language }));
  };

  const changeHandler = (delta) => {
    setContent(delta);
  };

  useEffect(() => {
    sendRequest(fetchSingleTerm(type));
  }, []);

  useEffect(() => {
    if (data) {
      setContent(() => {
        if (language === "vi") {
          return data.data.content;
        } else {
          return (
            data.data.translation.find((item) => item.language === language)
              ?.content || null
          );
        }
      });
      setEditorKey(1);
    }
  }, [data]);

  useEffect(() => {
    if (data && editorKey > 0) {
      setContent(() => {
        if (language === "vi") {
          return data.data.content;
        } else {
          return (
            data.data.translation.find((item) => item.language === language)
              ?.content || null
          );
        }
      });
      setEditorKey((prev) => prev + 1);
    }
  }, [language]);

  return (
    <div>
      <select onChange={(e) => setLanguage(e.target.value)} className="mb-2">
        <option value="vi">Tiếng Việt</option>
        <option value="en">Tiếng Anh</option>
      </select>
      {data && (
        <Editor
          key={editorKey}
          placeholder="Nhập nội dung..."
          initialValue={content}
          onChange={changeHandler}
        />
      )}

      {updated && <p className="text-success mt-3 mb-0">Đã cập nhật</p>}
      {updatingError && (
        <p className="text-danger mt-3 mb-1">{updatingError.message}</p>
      )}
      <button onClick={() => submitHandler()} className="btn btn-primary mt-1">
        {updating && (
          <div
            className="spinner-border spinner-border-sm me-1"
            role="status"
          />
        )}
        {!updating && <span>Cập nhật</span>}
        {updating && <span>Đang cập nhật</span>}
      </button>
    </div>
  );
}

export default TermTab;
