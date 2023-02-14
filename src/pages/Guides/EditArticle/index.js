// main
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

// components
import AdminLayout from "../../../layout/AdminLayout";
import ArticleForm from "../ArticleForm";
import ErrorMessage from "../../../components/ErrorMessage";
import SpinnerModal from "../../../components/SpinnerModal";

// other
import useAxios from "../../../hooks/useAxios";
import usePageTitle from "../../../hooks/usePageTitle";
import { fetchSingleArticle, updateArticle } from "../../../services/apis";

// css
import styles from "./EditArticle.module.css";
import TopBar from "../../../components/TopBar";

function EditPost() {
  const [goEdit, editing, isSuccess, editingError] = useAxios();
  const [fetchArticle, fetching, fetchedData, fetchingError] = useAxios();
  const [article, setArticle] = useState(null);
  const submitRef = useRef();

  const { articleId } = useParams();

  const submitHandler = async (values) => {
    const formData = new FormData();
    const { thumb, banner, ...rest } = values;

    formData.append("article", JSON.stringify({ ...rest, _id: articleId }));
    formData.append("thumb", thumb);
    formData.append("banner", banner);
    goEdit(updateArticle(formData));
  };

  useEffect(() => {
    fetchArticle(fetchSingleArticle(articleId));
  }, [articleId]);

  useEffect(() => {
    if (fetchedData) {
      setArticle(fetchedData.data);
    }
  }, [fetchedData]);

  useEffect(() => {
    if (isSuccess) {
      alert("Thanh cong");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (editingError) {
      alert("That bai");
    }
  }, [editingError]);

  const initialValues = article;

  const submitTrigger = () => {
    if (submitRef.current) {
      submitRef.current.click();
    }
  };

  usePageTitle("Cập nhật guides | Go Travel");

  return (
    <>
      <SpinnerModal show={editing} />

      <AdminLayout title={`Cập nhật bài viết ID: ${articleId}`}>
        <TopBar title={`Cập nhật guides ${articleId}`}>
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
