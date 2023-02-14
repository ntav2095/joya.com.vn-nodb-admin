import styles from "../Tours.module.css";
import { PAGE_SIZE } from "../../../services/constants";
import { Link } from "react-router-dom";
import {
  exclamation as exclamationSVG,
  check as checkSVG,
} from "../../../assets/svgs";

function TourList({ tours, onDelete, page }) {
  const getCategoryText = (tour) => {
    return tour.is_vn_tour ? "Trong nước" : tour.is_eu_tour ? "Châu Âu" : "";
  };

  const available = <span className="text-success">{checkSVG}</span>;
  const missing = <span className="text-danger">{exclamationSVG}</span>;
  return (
    <table className={styles.table + " table table-bordered "}>
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
            <div>Thumbnail</div>
          </th>
          <th>
            <div>Banner</div>
          </th>
          <th>
            <div>Ảnh lộ trình</div>
          </th>
          <th>
            <div className="text-center">Chức năng</div>
          </th>
        </tr>
      </thead>

      <tbody className="bg-light">
        {tours.map((tour, index) => (
          <tr key={tour.code}>
            <td>
              <div className="text-center">
                {(page - 1) * PAGE_SIZE + index + 1}
              </div>
            </td>
            <td>
              <div>{tour.code}</div>
            </td>
            <td>
              <div>
                <div id={tour.code}>
                  <Link to={`/tours/cap-nhat/${tour.code}`}>{tour.name}</Link>
                </div>
              </div>
            </td>
            <td>
              <div>{getCategoryText(tour)}</div>
            </td>

            <td>
              <div className="d-flex justify-content-center">
                {tour.thumb ? available : missing}
              </div>
            </td>
            <td>
              <div className="d-flex justify-content-center">
                {tour.banner ? available : missing}
              </div>
            </td>
            <td>
              <div className="d-flex justify-content-center">
                {tour.missingItineraryImages ? missing : available}
              </div>
            </td>
            <td>
              <div>
                <button
                  className="btn btn-danger "
                  onClick={() => onDelete(tour.code)}
                >
                  Xóa
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TourList;
