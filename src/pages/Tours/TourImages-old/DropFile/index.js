import { useDropzone } from "react-dropzone";
import styles from "./DropFile.module.css";

function DropFile({ callback, index }) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },

    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((item, index1) => {
        callback(index + index1, item);
      });
    },
  });

  return (
    <div className={styles.container} title="Nhấn chọn hình hoặc kéo thả">
      <div className={styles.dropArea} {...getRootProps()}>
        <input {...getInputProps()} />
        <i className="fa-solid fa-plus" />
      </div>
    </div>
  );
}
export default DropFile;
