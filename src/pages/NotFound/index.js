import AdminLayout from "../../layout/AdminLayout";
import usePageTitle from "../../hooks/usePageTitle";
import classes from "./NotFound.module.css";

function NotFound() {
  usePageTitle("Trang không tồn tại || Go Travel");
  return (
    <AdminLayout>
      <div className={classes.notFound}>
        <h1>Page Not Found</h1>
      </div>
    </AdminLayout>
  );
}

export default NotFound;
