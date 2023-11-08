import "./ContactButton.css";
export const ContactButton = ({ username, logo, color, url }) => {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <button
        className="Btn"
        style={{
          backgroundColor: color,
        }}
      >
        <img src={logo} height={"1.2rem"} />
        <span
          className="tooltip"
          style={{
            backgroundColor: color,
          }}
        >
          {username}
        </span>
      </button>
    </a>
  );
};
