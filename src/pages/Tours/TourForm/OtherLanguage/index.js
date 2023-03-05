import { FieldArray, ErrorMessage, Field } from "formik";
import { Tabs, Tab } from "react-bootstrap";
import FormGroup from "../FormGroup";
import ItineraryForm from "../ItineraryForm";
import ImagesCaption from "./ImagesCaption";

function EnglishTour({ formik }) {
  return (
    <Tabs defaultActiveKey="overview" className="mb-0 border-0">
      <Tab eventKey="overview" title={<div>Tổng quan </div>}>
        <div className="mb-4">
          <FormGroup
            isRequired
            label="Tên tour"
            component="input"
            name="en.name"
            formik={formik}
          />
        </div>

        <div className="mb-4">
          <FormGroup
            label="Lộ trình"
            isRequired
            component="textarea"
            name="en.journey"
            formik={formik}
          />
        </div>

        <div className="mb-4">
          <FormGroup
            isRequired
            label="Mô tả"
            component="textarea"
            name="en.description"
            formik={formik}
          />
        </div>

        <div className="mb-4">
          <FormGroup
            isRequired
            label="Điểm nổi bật"
            type="editor"
            formik={formik}
            name="en.highlights"
          />
        </div>
      </Tab>

      {/* ----------------------- price policies ------------------------  */}
      <Tab eventKey="price" title="Bảng giá">
        <div className="mb-4">
          <FormGroup
            isRequired
            label="Giá bao gồm"
            name="en.price_policies.includes"
            type="editor"
            formik={formik}
          />
        </div>

        <div className="mb-4">
          <FormGroup
            isRequired
            label="Giá không bao gồm"
            name="en.price_policies.excludes"
            type="editor"
            formik={formik}
          />
        </div>

        <div className="mb-4">
          <FormGroup
            isRequired
            label="Giá trẻ em và phụ thu"
            name="en.price_policies.other"
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
            name="en.terms.registration"
            type="editor"
            formik={formik}
          />
        </div>

        <div className="mb-4">
          <FormGroup
            isRequired
            label="Điều kiện hoàn hủy"
            name="en.terms.cancellation"
            type="editor"
            formik={formik}
          />
        </div>

        <div className="mb-4">
          <FormGroup
            isRequired
            label="Phương thức thanh toán"
            name="en.terms.payment"
            type="editor"
            formik={formik}
          />
        </div>

        <div className="mb-4">
          <FormGroup
            label="Lưu ý"
            name="en.terms.notes"
            type="editor"
            formik={formik}
          />
        </div>
      </Tab>

      {/* ----------------------- itinerary ------------------------  */}
      <Tab eventKey="itinerary" title="Lộ trình">
        <ItineraryForm
          itinerary={formik.values.en.itinerary}
          formik={formik}
          language="en"
          name="en.itinerary"
        />
      </Tab>

      <Tab eventKey="itineraryImages" title="Chú thích ảnh lộ trình">
        <ImagesCaption values={formik.values} />
      </Tab>
    </Tabs>
  );
}

export default EnglishTour;
