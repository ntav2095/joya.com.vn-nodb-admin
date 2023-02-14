import { useEffect, useRef, useState } from "react";

function CardAddImage({ callback, index, arr, name }) {
  const [file, setFile] = useState("");
  const reffile = useRef();
  const handleClick = (e) => {
    reffile.current.click();
  };
  useEffect(() => {
    if (file) {
      arr ? callback(index, file) : callback(name, file);
    }
  }, [file]);
  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        padding: "20px",
        justifyContent: "center",
        display: "inline-block",
      }}
      onClick={(e) => handleClick(e)}
    >
      <input
        type={"file"}
        hidden
        ref={reffile}
        onChange={(e) => setFile(e.target.files[0])}
      />
      <i
        className="fa-solid fa-plus"
        style={{ width: "50px", fontSize: "50px" }}
      ></i>
    </div>
  );
}
export default CardAddImage;
