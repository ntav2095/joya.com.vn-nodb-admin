import { useEffect, useRef, useState } from "react";
import styles from "./AddImageCard.module.css";

function AddImageCard({ callback, index, arr, name }) {
  const [file, setFile] = useState("");
  const fileRef = useRef();

  const handleClick = () => {
    fileRef.current.click();
  };

  const changeFileHandler = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (file) {
      arr ? callback(index, file) : callback(name, file);
    }
  }, [file]);

  return (
    <div className={styles.container} onClick={handleClick}>
      <input type="file" hidden ref={fileRef} onChange={changeFileHandler} />
      <i className="fa-solid fa-plus" />
    </div>
  );
}
export default AddImageCard;
