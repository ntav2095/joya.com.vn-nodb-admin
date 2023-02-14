import Editor from "../../../containers/Editor";

function TermTab({ initialValue, onChange }) {
  const changeHandler = (delta) => {
    onChange(delta);
  };

  return (
    <div className="bg-light">
      <Editor
        placeholder="Nhập nội dung..."
        initialValue={initialValue}
        onChange={changeHandler}
      />
    </div>
  );
}

export default TermTab;
