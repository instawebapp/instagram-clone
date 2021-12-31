export default function FileInput({ inputClass, ariaLable, handleChange }) {
  return (
    <div className="input_section">
      <input
        aria-label={ariaLable}
        className={`file_input ${inputClass}`}
        type="file"
        onChange={handleChange}
      />
    </div>
  );
}
