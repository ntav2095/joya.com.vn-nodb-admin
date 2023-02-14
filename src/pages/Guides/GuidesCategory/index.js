// main
import { useState, useEffect } from "react";

// components
import AdminLayout from "../../../layout/AdminLayout";
import GuidesCategoryModal from "./GuidesCategoryModal";
import NotifyModal from "../../../components/NotifyModal";
import TopBar from "../../../components/TopBar";

// other
import useAxios from "../../../hooks/useAxios";
import usePageTitle from "../../../hooks/usePageTitle";
import {
  fetchGuidesCategory,
  deleteGuidesCategoryItem,
} from "../../../services/apis";

function GuidesCategory() {
  const [sendRequest, isLoading, data, error, resetStates] = useAxios();
  const [goDelete, isDeleting, deletedData, deletingError, resetDelete] =
    useAxios();
  const [confirmDelete, setConfirmDelete] = useState(null); // categoryItem
  const [category, setCategory] = useState([]);
  const [modal, setModal] = useState({
    show: false,
    mode: "",
    item: null,
  });

  const goFetchCategories = () => {
    sendRequest(fetchGuidesCategory());
  };

  // fetch categories
  useEffect(() => {
    goFetchCategories();
  }, []);

  useEffect(() => {
    if (data?.data) {
      setCategory(data.data);
    }
  }, [data]);

  usePageTitle("Danh mục Guides | Joya Travel");

  // notification
  let notify = {};
  if (confirmDelete) {
    notify = {
      show: Boolean(confirmDelete),
      type: "normal",
      message: `Bạn có chắc muốn xóa danh mục "${confirmDelete.name}" không?`,
      leftBtn: {
        component: "button",
        text: "Xóa",
        cb: () => {
          goDelete(deleteGuidesCategoryItem(confirmDelete._id));
          setConfirmDelete(null);
        },
      },
      rightBtn: {
        component: "button",
        text: "Hủy",
        cb: () => {
          setConfirmDelete(null);
        },
      },
    };
  }

  if (deletedData) {
    notify = {
      show: Boolean(deletedData),
      type: "success",
      message: "Xóa thành công",
      btn: {
        component: "button",
        text: "OK",
        cb: () => {
          resetDelete();
        },
      },
    };
  }

  if (deletingError) {
    notify = {
      show: Boolean(deletingError),
      type: "error",
      message: deletingError.message,
      btn: {
        component: "button",
        text: "OK",
        cb: () => {
          resetDelete();
          goFetchCategories();
        },
      },
    };
  }

  useEffect(() => {
    if (deletedData) {
      setCategory((prev) =>
        prev.filter((item) => item._id !== deletedData.data._id)
      );
    }
  }, [deletedData]);

  return (
    <AdminLayout>
      <NotifyModal {...notify} />
      <TopBar title="Quản lý danh mục guides">
        <button
          className="btn btn-primary"
          onClick={() => setModal({ show: true, mode: "add", item: null })}
        >
          Thêm danh mục
        </button>
      </TopBar>

      <div className="p-2">
        {category && category.length > 0 && (
          <table className="table table-bordered">
            <thead className="bg-dark text-light">
              <tr>
                <th>STT</th>
                <th>Tiếng Việt</th>
                <th>Tiếng Anh</th>
                <th>Lựa chọn</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {category.map((item, index) => (
                <tr key={item}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.en.name}</td>
                  <td>
                    <div>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() =>
                          setModal({ show: true, mode: "edit", item: item })
                        }
                      >
                        Sửa
                      </button>
                      <button
                        className="btn btn-danger"
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
        )}

        {data && data.data.length === 0 && <h6>Không có item nào</h6>}
      </div>

      <GuidesCategoryModal
        {...modal}
        onHide={() => setModal({ show: false, mode: "", item: null })}
        setCategory={setCategory}
        reFetchCategories={goFetchCategories}
      />
    </AdminLayout>
  );
}

export default GuidesCategory;
