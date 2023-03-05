// main
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// components
import AdminLayout from "../../layout/AdminLayout";
import TopBar from "../../components/TopBar";

// hooks
import useAxios from "../../hooks/useAxios";
import { fetchVisas, deleteVisaProduct } from "../../services/apis";

// css
import SpinnerModal from "../../components/SpinnerModal";
import { useSelector } from "react-redux";

function Visas() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [startDeleting, isDeleting, deleted, deletingError] = useAxios();

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete this visa product?")) {
      startDeleting(deleteVisaProduct(id));
    }
  };

  useEffect(() => {
    sendRequest(fetchVisas());
  }, []);

  useEffect(() => {
    if (deleted) {
      alert("Deleted");
      sendRequest(fetchVisas());
    }
  }, [deleted]);

  useEffect(() => {
    if (deletingError) {
      alert(`Failed to delete: ${deletingError.message.vi}`);
    }
  }, [deletingError]);

  const changeFilterHandler = (e) => {
    //
  };

  const countries = useSelector(
    (state) => state.destinations.destinations.places
  ).filter((item) => item.type === "country");

  return (
    <>
      <SpinnerModal show={isLoading || isDeleting} />
      <AdminLayout
        title="Sản phẩm visa"
        path="/add-visa-product"
        text="New Visa "
      >
        <TopBar title="Dịch vụ visa">
          <Link className="btn btn-primary" to="/visas/them-moi">
            Tạo visa mới
          </Link>

          <Link className="btn btn-primary" to="/visas/quan-ly-danh-muc">
            Danh mục
          </Link>
        </TopBar>

        <div className="p-2">
          {data && data.data.length > 0 && (
            <table className="table table-bordered">
              <thead className="bg-dark text-light">
                <tr>
                  <th style={{ width: "70px" }}>
                    <div className="text-center">STT</div>
                  </th>
                  <th>
                    <div className="text-center">Tên</div>
                  </th>
                  <th style={{ width: "160px" }}>
                    <div className="text-center">Nước</div>
                  </th>
                  <th>
                    <div className="text-center">Giá</div>
                  </th>
                  <th style={{ width: "200px" }}>
                    <div className="text-center">Công cụ</div>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-light">
                {data.data.map((visa, index) => (
                  <tr key={visa.slug}>
                    <td>
                      <div className="text-center">{index + 1}</div>
                    </td>
                    <td>
                      <div>{visa.name}</div>
                    </td>
                    <td>
                      <div className="text-center">
                        {
                          countries.find((item) => item.id == visa.country)
                            ?.name
                        }
                      </div>
                    </td>
                    <td>
                      <div>{visa.price}</div>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Link
                          className="btn btn-warning me-2"
                          to={`/edit-visa-product/${visa._id}`}
                        >
                          Sửa
                        </Link>
                        <button
                          className="btn btn-danger me-2"
                          onClick={() => deleteHandler(visa._id)}
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

          {data && data.data.length === 0 && (
            <h5>Không có sản phẩm visa nào</h5>
          )}
        </div>
      </AdminLayout>
    </>
  );
}

export default Visas;
