import { useState, useEffect } from "react";
import Editor from "../../containers/Editor";
import AdminLayout from "../../layout/AdminLayout";
import TopBar from "../../components/TopBar";
import usePageTitle from "../../hooks/usePageTitle";
import useAxios from "../../hooks/useAxios";
import { updateAbout, fetchAbout } from "../../services/apis/about.api";

function AboutManager() {
  const [sendRequest, isLoading, data, error, resetStates] = useAxios();
  const [update, updating, updated, updatingError] = useAxios();
  const [content, setContent] = useState(null);
  const [language, setLanguage] = useState("vi");
  const [editorKey, setEditorKey] = useState(0);

  const changeHandler = (delta) => {
    setContent(delta);
  };

  const submitHandler = () => {
    update(updateAbout({ language, content }));
  };

  useEffect(() => {
    sendRequest(fetchAbout());
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

  usePageTitle("Giới thiệu công ty | Joya Travel");

  return (
    <AdminLayout>
      <TopBar title="Giới thiệu công ty">
        <button onClick={submitHandler} className="btn btn-primary">
          Update
        </button>
      </TopBar>
      <div className="p-2">
        <select
          className="p-2 mb-2"
          onChange={(e) => setLanguage(e.target.value)}
          value={language}
        >
          <option value="vi">Tiếng Việt</option>
          <option value="en">Tiếng Anh</option>
        </select>

        {data && !isLoading && (
          <div className="bg-white">
            <Editor
              key={editorKey}
              placeholder="Nhập nội dung..."
              initialValue={content}
              onChange={changeHandler}
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AboutManager;
