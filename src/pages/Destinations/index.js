// main
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// components
import AdminLayout from "../../layout/AdminLayout";
import NotifyModal from "../../components/NotifyModal";
import DestinationModal from "./DestinationModal";
import TopBar from "../../components/TopBar";
import CustomPagination from "../../containers/customerPagination";

// other
import useAxios from "../../hooks/useAxios";
import { PAGE_SIZE } from "../../services/constants";
import isValidPageNumber from "../../services/helpers/isValidPageNumber";
import { fetchDestinations } from "../../services/apis";
import { deleteDestinationItem } from "../../services/apis/destination.api";

function Destinations() {
  const [sendRequest, isLoading, data, error, resetStates] = useAxios();
  const [goDelete, isDeleting, deletedData, deletingError, resetDelete] =
    useAxios();
  const [destinations, setDestinations] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null); // destination object
  const [modal, setModal] = useState({
    show: false,
    mode: "",
    initialValues: null,
  });
  const navigate = useNavigate();
  let { page, category } = useParams();
  if (!page) {
    page = 1;
  } else {
    page = Number(page);
  }

  if (!category) {
    category = "";
  }

  const INITIALVALUES = {
    continent: "",
    region: "",
    name: "",
    en: { name: "" },
  };

  // HANDLERS
  const changeFilterHandler = (e) => {
    let path = "/diem-den";
    if (e.target.value) {
      path = `/diem-den/phan-loai/${e.target.value}`;
    }
    navigate(path);
  };

  const addHandler = () => {
    setModal({
      show: true,
      mode: "add",
      initialValues: INITIALVALUES,
    });
  };

  const confirmDeleteHandler = (dest) => {
    setConfirmDelete(dest);
  };

  const deleteHandler = (id) => {
    console.log(id);
    goDelete(deleteDestinationItem(id));
  };

  const editHandler = (dest) => {
    setModal({
      show: true,
      mode: "edit",
      initialValues: dest,
    });
  };

  const hideHandler = () => {
    setModal({ show: false, initialValues: null, mode: "" });
  };

  useEffect(() => {
    sendRequest(fetchDestinations());
  }, []);

  useEffect(() => {
    if (data) {
      setDestinations(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (deletedData) {
      setDestinations((prev) => ({
        ...prev,
        places: prev.places.filter((item) => item.id !== deletedData.data.id),
      }));
    }
  }, [deletedData]);

  // notification
  let notify = {};
  if (confirmDelete) {
    notify = {
      show: Boolean(confirmDelete),
      type: "normal",
      message: `Bạn có chắc là muốn xóa "${confirmDelete.name}"?`,
      leftBtn: {
        component: "button",
        text: "Xóa",
        cb: () => {
          console.log(confirmDelete);
          deleteHandler(confirmDelete.id);
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
      message: `Xóa thành công`,
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
          sendRequest(fetchDestinations());
        },
      },
    };
  }

  // filter
  let filteredDestinations = destinations?.places;
  let paginatedDestinations = filteredDestinations || [];
  if (filteredDestinations) {
    if (category === "chau-au") {
      filteredDestinations = filteredDestinations.filter(
        (item) => item.continent === "europe"
      );
    }

    if (category === "viet-nam") {
      filteredDestinations = filteredDestinations.filter((item) => item.region);
    }

    if (isValidPageNumber(page)) {
      paginatedDestinations = filteredDestinations.slice(
        (page - 1) * PAGE_SIZE,
        (page - 1) * PAGE_SIZE + PAGE_SIZE
      );
    }
  }

  const changePageHandler = (pageNumber) => {
    let path = "";
    if (category) {
      path = `/diem-den/phan-loai/${category}/${pageNumber}`;
    }

    if (!category) {
      path = `/diem-den/${pageNumber}`;
    }

    navigate(path);
  };

  if (
    !["viet-nam", "chau-au", ""].includes(category) ||
    !isValidPageNumber(page)
  )
    return <Navigate to="/diem-den" />;

  return (
    <>
      <NotifyModal {...notify} />
      <AdminLayout>
        <TopBar title="Quản lý địa điểm">
          <button onClick={addHandler} className="btn btn-primary">
            Thêm
          </button>
        </TopBar>

        <div className="p-2">
          <select
            className="p-2 mb-2"
            onChange={changeFilterHandler}
            value={category}
          >
            <option value="">Lọc</option>
            <option value="chau-au">Châu Âu</option>
            <option value="viet-nam">Việt Nam</option>
          </select>
          {filteredDestinations && paginatedDestinations.length > 0 && (
            <table className="table table-bordered">
              <thead className="bg-dark text-light">
                <tr>
                  <th style={{ width: "70px" }}>
                    <div className="text-center">STT</div>
                  </th>
                  <th>
                    <div className="text-center">Tên</div>
                  </th>
                  <th>
                    <div className="text-center">Tên tiếng Anh</div>
                  </th>
                  <th>
                    <div className="text-center">Vùng miền</div>
                  </th>
                  <th>
                    <div className="text-center">Châu lục</div>
                  </th>
                  <th>
                    <div className="text-center">Loại</div>
                  </th>
                  <th style={{ width: "160px" }}>
                    <div className="text-center">Công cụ</div>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white">
                {paginatedDestinations.map((dest, index) => (
                  <tr key={dest.id}>
                    <td>
                      <div className="text-center">{index + 1}</div>
                    </td>
                    <th>
                      <div className="text-center">{dest.name}</div>
                    </th>
                    <th>
                      <div className="text-center">{dest.en.name}</div>
                    </th>
                    <th>
                      <div className="text-center">
                        {
                          destinations?.regions.find(
                            (item) => item.slug === dest.region
                          )?.name
                        }
                      </div>
                    </th>
                    <th>
                      <div className="text-center">
                        {
                          destinations?.continents.find(
                            (item) => item.slug === dest.continent
                          )?.name
                        }
                      </div>
                    </th>
                    <th>
                      <div className="text-center">{dest.type}</div>
                    </th>

                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-warning me-2 "
                          onClick={() => editHandler(dest)}
                        >
                          Sửa
                        </button>
                        <button
                          className="btn btn-danger "
                          onClick={() => confirmDeleteHandler(dest)}
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
        </div>

        {destinations && (
          <DestinationModal
            {...modal}
            onHide={hideHandler}
            destinations={destinations}
            setDestinations={setDestinations}
          />
        )}

        {filteredDestinations && (
          <CustomPagination
            total={Math.ceil(filteredDestinations.length / PAGE_SIZE)}
            pagenumber={page}
            callback={changePageHandler}
          />
        )}
      </AdminLayout>
    </>
  );
}

export default Destinations;
