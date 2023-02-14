// main
import { useEffect, useState, useRef } from "react";

// components
import AdminLayout from "../../../layout/AdminLayout";
import SpinnerModal from "../../../components/SpinnerModal";
import ArticleForm from "../ArticleForm";
import NotifyModal from "../../../components/NotifyModal";
import TopBar from "../../../components/TopBar";

// other
import usePageTitle from "../../../hooks/usePageTitle";
import useAxios from "../../../hooks/useAxios";
import { addNewArticle } from "../../../services/apis";

const DELTA = { ops: [{ insert: "\n" }] };

const initialValues = {
  title: "",
  author: "",
  origin: "",
  content: DELTA,
  thumb: "",
  banner: "",
  category: "",
  en: {
    title: "",
    content: DELTA,
  },
};

function NewPosts() {
  const [formKey, setFormKey] = useState(1);
  const [sendRequest, isLoading, data, error, resetCreating] = useAxios();
  const btnRef = useRef();

  const submitHandler = async (values) => {
    const formData = new FormData();
    const { thumb, banner, ...rest } = values;
    formData.append("thumb", values.thumb);
    formData.append("banner", values.banner);
    formData.append("article", JSON.stringify(rest));

    await sendRequest(addNewArticle(formData));
  };

  useEffect(() => {
    if (data) {
      setFormKey((prev) => prev + 1);
    }
  }, [data]);

  usePageTitle("Tạo bài viết mới | Joya Travel");

  // notification
  let notify = {};
  if (data) {
    notify = {
      show: Boolean(data),
      message: "Thành công",
      type: "success",
      btn: {
        component: "button",
        text: "OK",
        cb: () => {
          resetCreating();
        },
      },
    };
  }

  if (error) {
    notify = {
      show: Boolean(error),
      message: error.message,
      type: "error",
      btn: {
        component: "button",
        text: "OK",
        cb: () => {
          resetCreating();
        },
      },
    };
  }

  return (
    <>
      <NotifyModal {...notify} />
      <SpinnerModal show={isLoading} />

      <AdminLayout title="Tạo bài viết mới">
        <TopBar title="Tạo bài viết mới">
          <button
            className="btn btn-primary"
            type="submit"
            onClick={() => btnRef.current.click()}
          >
            Lưu
          </button>
        </TopBar>

        <div className="p-2">
          <ArticleForm
            key={formKey}
            initialValues={initialValues}
            onSubmit={submitHandler}
            ref={btnRef}
          />
        </div>
      </AdminLayout>
    </>
  );
}

export default NewPosts;
