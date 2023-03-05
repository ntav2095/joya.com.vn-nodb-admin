import { Tabs, Tab } from "react-bootstrap";
import FormGroup from "../FormGroup";
import ItineraryForm from "../ItineraryForm";
import Destinations from "./Destinations";
import TourRating from "./TourRating";
import TourImages from "./TourImages";
import StartAt from "./StartAt";
import DepartureDates from "./DepartureDates";

function Vietnamese({ formik, destinations }) {
  let eu_countries =
    destinations?.places.filter((item) => {
      return item.continent === "europe";
    }) || [];

  let vn_provinces =
    destinations?.places.filter((item) => {
      return item.region;
    }) || [];

  return (
    <Tabs defaultActiveKey="overview" className=" mb-0 border-0 ">
      <Tab eventKey="overview" title="Tổng quan">
        <div className=" rounded-0">
          <div className="row mb-4">
            <div className="col-12 col-sm-4">
              <FormGroup
                isRequired
                label="Mã tour"
                component="input"
                name="code"
              />
            </div>

            <div className={"col-12 col-sm-8"}>
              <FormGroup
                isRequired
                label="Tên tour"
                component="input"
                name="name"
              />
            </div>
          </div>

          <div className="mb-4">
            <FormGroup
              isRequired
              label="Lộ trình"
              component="textarea"
              name="journey"
            />
          </div>

          <div className="mb-4">
            <FormGroup
              isRequired
              label="Mô tả"
              component="textarea"
              name="description"
            />
          </div>

          <div className="mb-4">
            <FormGroup
              isRequired
              label="Điểm nổi bật"
              type="editor"
              name="highlights"
              formik={formik}
            />
          </div>

          <div className="mb-4">
            <StartAt
              isRequired
              label="Điểm khởi hành"
              name="start_at"
              type="start_at"
              formik={formik}
              places={vn_provinces}
            />
          </div>

          {/* ----------------------- Ngày khởi hành ------------------------  */}
          <div className="mb-4">
            <DepartureDates formik={formik} />
          </div>

          <div className="row mb-4">
            <div className="col-4">
              <FormGroup
                isRequired
                label="Số ngày"
                type="Number"
                name="duration.days"
              />
            </div>

            <div className="col-4">
              <FormGroup
                label="Số đêm"
                type="Number"
                name="duration.nights"
                isRequired
              />
            </div>

            <div className="col-4">
              <FormGroup
                isRequired
                label="Giá"
                note="(vnd)"
                type="locale-number"
                name="price"
                formik={formik}
              />
            </div>
          </div>
        </div>
      </Tab>

      {/* ----------------------- price policies ------------------------  */}
      <Tab eventKey="price" title="Bảng giá">
        <div className="mb-4">
          <FormGroup
            isRequired
            label="Giá bao gồm"
            name="price_policies.includes"
            type="editor"
            formik={formik}
          />
        </div>

        <div className="mb-4">
          <FormGroup
            isRequired
            label="Giá không bao gồm"
            name="price_policies.excludes"
            type="editor"
            formik={formik}
          />
        </div>

        <div className="mb-4">
          <FormGroup
            isRequired
            label="Giá trẻ em và phụ thu"
            name="price_policies.other"
            type="editor"
            formik={formik}
          />
        </div>
      </Tab>

      {/* ----------------------- terms ------------------------  */}
      <Tab eventKey="terms" title="Điều khoản">
        <div className="mb-4">
          <FormGroup
            isRequired
            label="Điều kiện đăng ký"
            name="terms.registration"
            type="editor"
            formik={formik}
          />
        </div>

        <div className="mb-4">
          <FormGroup
            isRequired
            label="Điều kiện hoàn hủy"
            name="terms.cancellation"
            type="editor"
            formik={formik}
          />
        </div>

        <div className="mb-4">
          <FormGroup
            isRequired
            label="Phương thức thanh toán"
            name="terms.payment"
            type="editor"
            formik={formik}
          />
        </div>

        <div className="mb-4">
          <FormGroup
            label="Lưu ý"
            name="terms.notes"
            type="editor"
            formik={formik}
          />
        </div>
      </Tab>

      {/* ----------------------- điểm đến ------------------------  */}

      <Tab eventKey="destinations" title="Điểm đến">
        <div className="row">
          <div className="col-12 col-md-6  border-end">
            <Destinations
              title="Tour trong nước"
              places={vn_provinces}
              formik={formik}
            />
          </div>

          <div className="col-12 col-md-6">
            <Destinations
              title="Tour châu Âu"
              places={eu_countries}
              formik={formik}
            />
          </div>
        </div>
      </Tab>

      {/* ----------------------- lộ trình ------------------------  */}
      <Tab eventKey="itinerary" title="Lộ trình">
        <ItineraryForm
          itinerary={formik.values.itinerary}
          formik={formik}
          name="itinerary"
        />
      </Tab>

      {/* ----------------------- hình ảnh: thumbnail, banner, lộ trình ------------------------  */}
      <Tab eventKey="images" title="Hình ảnh">
        <div className="border-bottom row pb-4">
          <div className="col-6">
            <FormGroup
              isRequired
              label="Ảnh thumbnail"
              name="thumb"
              type="file"
              formik={formik}
            />
          </div>

          <div className="col-6">
            <FormGroup
              isRequired
              label="Ảnh banner"
              name="banner"
              type="file"
              formik={formik}
            />
          </div>
        </div>

        <div className="pt-3">
          <TourImages formik={formik} />
        </div>
      </Tab>

      {/* ----------------------- rating ------------------------  */}
      <Tab eventKey="rating" title="Đánh giá">
        <div className="border-bottom row">
          <TourRating
            rating={formik.values.rating}
            name="rating"
            formik={formik}
          />
        </div>
      </Tab>
    </Tabs>
  );
}

export default Vietnamese;
