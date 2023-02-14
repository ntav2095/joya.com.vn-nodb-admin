import { useEffect, useRef, useState } from "react";
import { brokenImage } from "../../../../assets/images";
import { xMark as closeSVG } from "../../../../assets/svgs";
import styles from "./ImageCard.module.css";

function ImageCard({
  src,
  handleClose,
  close,
  index,
  handleChange,
  arr,
  name,
}) {
  const [file, setFile] = useState("");
  const [err, setErr] = useState(false);
  const fileRef = useRef();

  const handleClick = () => {
    fileRef.current.click();
  };

  const changeFileHander = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    if (file) {
      arr && handleClose(index);
      arr ? handleChange(index, file) : handleChange(name, file);
      setErr(false);
    }
  }, [file]);

  return (
    <div className={styles.container}>
      {!err ? (
        <img
          src={typeof src === "string" ? src : URL.createObjectURL(src)}
          onClick={handleClick}
          onError={() => setErr(!err)}
        />
      ) : (
        <img src={brokenImage} onClick={handleClick} />
      )}

      <input type="file" hidden ref={fileRef} onChange={changeFileHander} />

      {close && !err && (
        <button
          type="button"
          className={styles.btnclose}
          onClick={() => handleClose(index)}
        >
          {closeSVG}
        </button>
      )}
    </div>
  );
}
export default ImageCard;
