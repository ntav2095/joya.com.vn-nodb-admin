import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
// import styles from "./drop.module.css";

function Dropfile({ callback, index }) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "16px",
  };

  const drop = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: "2px",
    borderRadius: "2px",
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };
  const thumb = {
    display: "inline-flex",
    borderRadius: "2px",
    border: "1px solid #eaeaea",
    marginBottom: "8px",
    marginRight: "8px",
    width: "150px",
    height: "95px",
    padding: "4px",
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: "0px",
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };
  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));
  const handleUpdate = () => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
    files.forEach((item, index1) => {
      callback(index + index1, item);
    });
    setFiles([]);
    alert("sussec");
  };

  return (
    <section className="container">
      <div
        style={{
          border: "0.5px solid black",
          padding: "20px",
          margin: "8px auto",
        }}
      >
        {files.length == 0 ? (
          <div style={drop} {...getRootProps()}>
            <input {...getInputProps()} />
            {/* {'' ? (
          <p>Kéo ảnh vào đây để update ảnh</p>
        ) : ( */}
            <p>Thả ảnh vào đây để update ảnh</p>
            {/* )} */}
          </div>
        ) : (
          <>
            <div style={thumbsContainer}>{thumbs}</div>
            <div style={{ textAlign: "right" }}>
              <Button onClick={handleUpdate}>update image</Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
export default Dropfile;
