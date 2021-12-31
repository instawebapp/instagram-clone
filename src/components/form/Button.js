export default function Button({
  btnType,
  btnClass,
  btnTitle,
  icon,
  handleClick,
  handleKey,
}) {
  return (
    <button
      className={btnClass}
      type={btnType}
      onClick={handleClick}
      onKeyDown={handleKey}
    >
      {btnTitle === "" ? <div className="icon">{icon}</div> : btnTitle}
    </button>
  );
}
