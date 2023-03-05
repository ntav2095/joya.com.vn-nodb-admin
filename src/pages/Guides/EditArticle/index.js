// main
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// components
import AdminLayout from "../../../layout/AdminLayout";
import ArticleForm from "../ArticleForm";
import ErrorMessage from "../../../components/ErrorMessage";
import SpinnerModal from "../../../components/SpinnerModal";
import NotifyModal from "../../../components/NotifyModal";
import TopBar from "../../../components/TopBar";

// other
import useAxios from "../../../hooks/useAxios";
import usePageTitle from "../../../hooks/usePageTitle";
import { fetchSingleArticle, updateArticle } from "../../../services/apis";

// css
import styles from "./EditArticle.module.css";

function EditPost() {
  const [goEdit, editing, isSuccess, editingError, resetEdit] = useAxios();
  const [fetchArticle, fetching, fetchedData, fetchingError] = useAxios();
  const [article, setArticle] = useState(null);
  const submitRef = useRef();
  const navigate = useNavigate();

  const { slug } = useParams();

  const submitHandler = async (values) => {
    const formData = new FormData();
    const { thumb, banner, ...rest } = values;

    if (typeof thumb === "string") {
      rest.thumb = thumb;
    } else {
      formData.append("thumb", thumb);
    }

    if (typeof banner === "string") {
      rest.banner = banner;
    } else {
      formData.append("banner", banner);
    }

    formData.append("article", JSON.stringify({ ...rest, old_slug: slug }));

    goEdit(updateArticle(formData));
  };

  useEffect(() => {
    fetchArticle(fetchSingleArticle(slug));
  }, [slug]);

  useEffect(() => {
    if (fetchedData) {
      setArticle(fetchedData.data);
    }
  }, [fetchedData]);

  const initialValues = article;

  const submitTrigger = () => {
    if (submitRef.current) {
      submitRef.current.click();
    }
  };

  usePageTitle("Cập nhật guide | Joya Travel");

  // notification
  let notify = {};
  if (isSuccess) {
    notify = {
      show: Boolean(isSuccess),
      message: "Thành công",
      type: "success",
      btn: {
        component: "button",
        text: "OK",
        cb: () => {
          navigate("/guides");
        },
      },
    };
  }

  if (editingError) {
    notify = {
      show: Boolean(editingError),
      message: editingError.message,
      type: "error",
      btn: {
        component: "button",
        text: "OK",
        cb: () => {
          resetEdit();
        },
      },
    };
  }
  return (
    <>
      <SpinnerModal show={editing} />
      <NotifyModal {...notify} />

      <AdminLayout title={`Cập nhật bài viết: ${slug}`}>
        <TopBar title={`Cập nhật guides ${slug}`}>
          <button className="btn btn-primary" onClick={submitTrigger}>
            Lưu
          </button>
        </TopBar>

        <div className="p-2">
          {initialValues && !fetching && (
            <div className={styles.container}>
              <ArticleForm
                ref={submitRef}
                initialValues={initialValues}
                onSubmit={submitHandler}
              />
            </div>
          )}

          {fetchingError && <ErrorMessage msg={fetchingError.message} />}
        </div>
      </AdminLayout>
    </>
  );
}

export default EditPost;
