import { useRef } from "react";
import FormEditImage from "./formEditImage";
import {
  // main
  useEffect,
  useState,

  // components
  AdminLayout,
  ErrorMessage,
  Pagination,
  StatusBar,
  Filter,

  // api
  useAxios,
  fetchSingleTour,
  fetchTours,

  // other
  PAGE_SIZE,
  usePageTitle,
  svg,
  styles,
} from "./import";

import "./TourImagesManager.override.css";

const checkMark = <span className={styles.checkSVG}>{svg.checkCircle}</span>;

function TourImagesManager() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [sendRequestTour, loadingTour, tour, tourError] = useAxios();
  const [update, setUpdate] = useState(false);
  const submitRef = useRef();
  const [state, setState] = useState(null);
  const [filter, setFilter] = useState({
    category: "",
    search: "",
    banner: "",
    page: 1,
  });

  const query = { page: filter.page, page_size: PAGE_SIZE };
  if (filter.category) {
    query.cat = filter.category;
  }

  if (filter.search.trim()) {
    query.search = filter.search.trim();
  }

  if (filter.banner) {
    query.banner = filter.banner;
  }

  const handleUpdate = () => {
    setUpdate(false);
  };
  const handleSusses = () => {
    setState("");
  };
  const handleImage = async (tourCode) => {
    await sendRequestTour(fetchSingleTour(tourCode));
  };

  useEffect(() => {
    if (tour) {
      setState(tour.data);
    }
  }, [tour]);

  useEffect(() => {
    sendRequest(fetchTours(query));
  }, [filter]);

  usePageTitle("Quản lý hình ảnh tour | Joya Travel");

  return (
    <>
      <AdminLayout>
        <div className="p-3 bg-dark text-light d-flex align-items-center justify-content-between">
          <h1 className="fs-5 m-0">Quản lý hình ảnh tour</h1>
          <button
            type="button"
            onClick={() => {
              if (submitRef.current) {
                setUpdate(true);
                submitRef.current.click();
              }
            }}
            className="btn btn-primary"
          >
            Cập nhật
          </button>
        </div>

        <div className="p-2">
          <Filter setFilter={setFilter} filter={filter} />

          {data && data.data.length > 0 && (
            <table className="table table-bordered ">
              <thead className="bg-dark text-light">
                <tr>
                  <th>
                    <div>STT</div>
                  </th>
                  <th>
                    <div>Mã tour</div>
                  </th>
                  <th>
                    <div>Tên tour</div>
                  </th>
                  <th>
                    <div>Danh mục</div>
                  </th>
                  <th>
                    <div>lộ trình</div>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-light">
                {data.data.map((item, index) => (
                  <tr key={item._id}>
                    <td>
                      <div className="text-center">
                        {(filter.page - 1) * PAGE_SIZE + index + 1}
                      </div>
                    </td>
                    <td>
                      <div>{item.code}</div>
                    </td>
                    <td>
                      <div
                        className={styles.tourName}
                        onClick={() => {
                          handleImage(item.code);
                        }}
                      >
                        {item.name}
                      </div>
                    </td>
                    <td>
                      <div>
                        {item.destinations.find(
                          (dest) => dest.continent === "europe"
                        )
                          ? "Tour châu Âu"
                          : "Tour trong nước"}
                      </div>
                    </td>
                    <td>
                      <div>{item.missingItineraryImages && checkMark}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {data && data.data.length > 0 && (
            <div className="pt-3 ps-1">
              <Pagination
                bgGreen
                current={filter.page}
                pageSize={PAGE_SIZE}
                total={data.metadata.total_count}
                onChange={(current, pageSize) => {
                  setFilter((prev) => ({ ...prev, page: current }));
                }}
              />
            </div>
          )}
          {state && !loadingTour && (
            <FormEditImage
              data={state}
              ref={submitRef}
              handleSusses={handleSusses}
              update={update}
              handleUpdate={handleUpdate}
            />
          )}
          {data && data.data.length === 0 && <h5>Không có tour nào</h5>}

          {error && <ErrorMessage msg={error.message} />}
        </div>
      </AdminLayout>
    </>
  );
}

export default TourImagesManager;
