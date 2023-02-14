import { useEffect, useRef, useState } from "react";
import { brokenImage } from "../../../../assets/images";
import { xMark as closeSVG } from "../../../../assets/svgs";
import styles from "./cardImage.module.css";

function CardImage({
  src,
  handleClose,
  close,
  index,
  handleChange,
  arr,
  name,
}) {
  const [file, setFile] = useState("");
  const [errr, setErr] = useState(false);
  const reffile = useRef();
  const handleClick = () => {
    reffile.current.click();
  };
  useEffect(() => {
    if (file) {
      arr && handleClose(index);
      arr ? handleChange(index, file) : handleChange(name, file);
      setErr(false);
    }
  }, [file]);

  return (
    <div className={styles.containner__image}>
      {!errr ? (
        <img
          src={typeof src === "string" ? src : URL.createObjectURL(src)}
          onClick={() => handleClick()}
          onError={() => setErr(!errr)}
        />
      ) : (
        <img src={brokenImage} onClick={() => handleClick()} />
      )}

      <input
        type={"file"}
        hidden
        ref={reffile}
        onChange={(e) => setFile(e.target.files[0])}
      />
      {close && !errr && (
        <button className={styles.btnclose} onClick={() => handleClose(index)}>
          {closeSVG}
        </button>
      )}
    </div>
  );
}
export default CardImage;
