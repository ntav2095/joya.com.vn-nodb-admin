import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useLocation,
  Navigate,
} from "react-router-dom";

// components
import AdminLayout from "../../layout/AdminLayout/index";
import CustomPagination from "../../containers/customerPagination";
import SpinnerModal from "../../components/SpinnerModal";
import ErrorMessage from "../../components/ErrorMessage";
import ArticlesFilter from "./ArticlesFilter";
import NotifyModal from "../../components/NotifyModal";

// apis
import { fetchArticles, deleteArticle } from "../../services/apis";
import useAxios from "../../hooks/useAxios";
import usePageTitle from "../../hooks/usePageTitle";

// css
import "./Articles.override.css";
import TopBar from "../../components/TopBar";

const PAGE_SIZE = 6;

function Articles() {
  const [sendDelete, deleting, deleted, deleteError, resetDelete] = useAxios();
  const [sendRequest, isFetching, data, fetchingError] = useAxios();
  const [confirmDelete, setConfirmDelete] = useState(null); // null | guide
  const [articles, setArticles] = useState(null);
  const navigate = useNavigate();
  const params = new URL(document.location).searchParams;
  const search = params.get("search") || "";
  let { category, page } = useParams();
  if (!page) {
    page = 1;
  } else {
    page = Number(page);
  }

  const changePageHandler = (pageNum) => {
    let path = "";
    if (category) {
      path = `/guides/phan-loai/${category}`;
      if (pageNum > 1) {
        path += `/${pageNum}`;
      }
    }

    if (!category) {
      path = `/guides`;
      if (pageNum > 1) {
        path += `/${pageNum}`;
      }
    }

    if (search) {
      path += `?search=${search}`;
    }
    navigate(path);
  };

  let filteredArticles = articles || [];
  if (category) {
    filteredArticles = filteredArticles.filter(
      (article) => article.category === category
    );
  }

  if (search) {
    filteredArticles = filteredArticles.filter((article) =>
      article.title.includes(search)
    );
  }

  useEffect(() => {
    sendRequest(fetchArticles());
  }, []);

  // nếu xóa tour xong mà bị tụt 1 trang
  useEffect(() => {
    if (data) {
      setArticles(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (deleted) {
      setArticles((prev) =>
        prev.filter((item) => item.slug !== deleted.data.slug)
      );
    }
  }, [deleted]);

  // notification
  let notify = {};
  if (confirmDelete) {
    notify = {
      show: confirmDelete,
      type: "normal",
      message: `Bạn có chắc muốn xóa bài viết ${confirmDelete.title} không?`,
      leftBtn: {
        text: "Có",
        component: "button",
        cb: () => {
          sendDelete(deleteArticle(confirmDelete.slug));
          setConfirmDelete(null);
        },
      },
      rightBtn: {
        text: "Không",
        component: "button",
        cb: () => {
          setConfirmDelete(null);
        },
      },
    };
  }

  if (deleted) {
    notify = {
      show: deleted,
      type: "success",
      message: `Xóa thành công`,
      btn: {
        text: "OK",
        cb: () => {
          resetDelete();
        },
        component: "button",
      },
      onHide: () => {
        resetDelete();
      },
      time: 2000,
    };
  }

  if (deleteError) {
    notify = {
      show: deleteError,
      type: "error",
      message: deleteError.message,
      btn: {
        text: "OK",
        cb: () => {
          resetDelete();
        },
        component: "button",
      },
      onHide: () => {
        resetDelete();
      },
    };
  }

  usePageTitle("Guides | Joya Travel");

  if (!page || isNaN(page) || !Number.isInteger(page) || page < 1)
    return <Navigate to="/guides" />;

  return (
    <>
      <NotifyModal {...notify} />

      <SpinnerModal show={deleting || isFetching} />

      <AdminLayout>
        <TopBar title="Guides">
          <Link to="/guides/them-moi" className="btn btn-primary">
            Tạo bài viết mới
          </Link>
          <Link to="/guides/quan-ly-danh-muc" className="btn btn-primary">
            Danh mục
          </Link>
        </TopBar>

        <div className="p-2">
          {data && <ArticlesFilter categories={data.metadata.category} />}

          {articles && articles.length > 0 && (
            <>
              <table className="table table-bordered">
                <thead className="bg-dark text-light">
                  <tr>
                    <th>
                      <div>STT</div>
                    </th>
                    <th style={{ width: "70%" }}>
                      <div>Tiêu đề</div>
                    </th>
                    <th style={{ width: "70%" }}>
                      <div>Danh mục</div>
                    </th>

                    <th>
                      <div>Hành động</div>
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-light">
                  {filteredArticles
                    .slice(
                      (page - 1) * PAGE_SIZE,
                      (page - 1) * PAGE_SIZE + PAGE_SIZE
                    )
                    .map((item, index) => (
                      <tr key={item.slug}>
                        <td>
                          <div>{(page - 1) * PAGE_SIZE + index + 1}</div>
                        </td>
                        <td>
                          <div>
                            <Link to={`/guides/cap-nhat/${item.slug}`}>
                              {item.title}
                            </Link>
                          </div>
                        </td>
                        <td>
                          <div>
                            {
                              data?.metadata.category.find(
                                (cat) => cat.id === item.category
                              )?.name
                            }
                          </div>
                        </td>

                        <td>
                          <div className="d-flex flex-nowrap">
                            <button
                              className="btn btn-danger me-2"
                              onClick={() => setConfirmDelete(item)}
                            >
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {filteredArticles && (
                <CustomPagination
                  total={Math.ceil(filteredArticles.length / PAGE_SIZE)}
                  pagenumber={page}
                  callback={changePageHandler}
                />
              )}
            </>
          )}

          {articles && articles.length === 0 && <h5>Không có bài viết nào</h5>}

          {fetchingError && <ErrorMessage msg={fetchingError.message} />}
        </div>
      </AdminLayout>
    </>
  );
}

export default Articles;
