import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "Not-Found";
  }, []);

  return (
    <div className="not_found_container">
      <div className="section">
        <p className="text">Not Found!</p>
      </div>
    </div>
  );
};

export default NotFound;
