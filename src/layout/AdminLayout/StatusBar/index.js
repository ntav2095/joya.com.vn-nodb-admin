import styles from "./StatusBar.module.css";
import { useSelector } from "react-redux";

function StatusBar({ children, title }) {
  const sidebarIsShow = useSelector((state) => state.layout.sidebar.isShow);
  let classes = styles.statusBar;
  if (!sidebarIsShow) {
    classes += " " + styles.hide;
  }

  return (
    <div className={classes}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.children}>{children}</div>
    </div>
  );
}

export default StatusBar;
