function LanguageToggleBtns({ currentLanguage, onToggle }) {
  const btnClasses = (btnValue) => {
    let classes = "btn btn-primary m-2 ";
    if (btnValue === currentLanguage) {
      classes += "active";
    }

    return classes;
  };
  return (
    <select
      className="p-2 mb-2"
      value={currentLanguage}
      onChange={(e) => onToggle(e.target.value)}
    >
      <option value="vi">Tiếng Việt</option>
      <option value="en">Tiếng Anh</option>
    </select>
  );
}

export default LanguageToggleBtns;
