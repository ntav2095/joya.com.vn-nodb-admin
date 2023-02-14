import styles from "./form.module.css";

function FormContent({
  field,
  container,
  title,
  label,
  type,
  placeholder,
  errmess,
  setFieldValue,
}) {
  const { name, onBlur } = field;
  return (
    <div
      className={
        container ? styles.form__content__small : styles.form__content__big
      }
    >
      {title && <p className={styles.titles}>{title}</p>}
      {label && <label>{label}</label>}
      <input
        name={name}
        onChange={(e) => {
          return setFieldValue(name, e.target.files[0]);
        }}
        onBlur={onBlur}
        type={type}
        placeholder={placeholder}
      />
      {errmess && <p className={styles.err}>{errmess}</p>}
    </div>
  );
}
export default FormContent;
