// main
import { Link } from "react-router-dom";

// components
import AdminLayout from "../../layout/AdminLayout";
import TopBar from "../../components/TopBar";

// hooks
import useAxios from "../../hooks/useAxios";
import { fetchVisas, deleteVisaProduct } from "../../services/apis";

// css
import { useEffect, useState } from "react";
import SpinnerModal from "../../components/SpinnerModal";
import useFetchVisaCountries from "./visaHooks/useFetchVisasCountries";

function Visas() {
  const [sendRequest, isLoading, data, error] = useAxios();
  const [startDeleting, isDeleting, deleted, deletingError] = useAxios();
  const { continents, countries, getCountries, getCountryName } =
    useFetchVisaCountries();
  const [filter, setFilter] = useState({
    country: "",
  });

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete this visa product?")) {
      startDeleting(deleteVisaProduct(id));
    }
  };

  useEffect(() => {
    sendRequest(fetchVisas(filter));
  }, [filter]);

  useEffect(() => {
    if (deleted) {
      alert("Deleted");
      sendRequest(fetchVisas(filter));
    }
  }, [deleted]);

  useEffect(() => {
    if (deletingError) {
      alert(`Failed to delete: ${deletingError.message.vi}`);
    }
  }, [deletingError]);

  return (
    <>
      <SpinnerModal show={isLoading || isDeleting} />
      <AdminLayout
        title="Sản phẩm visa"
        path="/add-visa-product"
        text="New Visa "
      >
        <TopBar title="Dịch vụ visa">
          <Link className="btn btn-primary" to="/add-visa-product">
            Tạo sản phẩm visa
          </Link>
        </TopBar>

        <div className="p-2">
          <select
            className="p-2 mb-2 me-2"
            onChange={(e) => {
              setFilter((prev) => ({
                ...prev,
                country: getCountries(e.target.value),
              }));
            }}
          >
            <option value="">Châu lục</option>
            {continents &&
              continents.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
          </select>

          <select
            className="p-2 mb-2"
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, country: e.target.value }))
            }
          >
            <option value="">Nước</option>
            {countries &&
              countries.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
          </select>

          {data && data.data.length > 0 && (
            <table className="table table-bordered">
              <thead className="bg-dark text-light">
                <tr>
                  <th>
                    <div>STT</div>
                  </th>
                  <th>
                    <div>ID</div>
                  </th>
                  <th>
                    <div>Name</div>
                  </th>
                  <th>
                    <div>Country</div>
                  </th>
                  <th>
                    <div>Price</div>
                  </th>
                  <th>
                    <div>Action Buttons</div>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-light">
                {data.data.map((visa, index) => (
                  <tr key={visa._id}>
                    <td>
                      <div>{index + 1}</div>
                    </td>
                    <td>
                      <div>{visa._id}</div>
                    </td>
                    <td>
                      <div>{visa.name}</div>
                    </td>
                    <td>
                      <div>{getCountryName(visa.country)}</div>
                    </td>
                    <td>
                      <div>{visa.price}</div>
                    </td>
                    <td>
                      <div>
                        <Link
                          className="btn btn-warning me-2"
                          to={`/edit-visa-product/${visa._id}`}
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger me-2"
                          onClick={() => deleteHandler(visa._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {data && data.data.length === 0 && <h5>No visa products</h5>}
        </div>
      </AdminLayout>
    </>
  );
}

export default Visas;
