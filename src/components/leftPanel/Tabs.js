import { GrHomeRounded } from "react-icons/gr";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { BsFilePerson } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
export default function Tabs() {
  return (
    <section className="tabs_section">
      <ul className="tabs_list">
        <Link>
          <li>
            <div className="link">
              <span className="icon">
                <GrHomeRounded />
              </span>
              <span className="link">Home</span>
            </div>
            <div className="notification">
              <span className="number">0</span>
            </div>
          </li>
        </Link>
        <li>
          <div className="link">
            <span className="icon">
              <BsFilePerson />
            </span>
            <span className="link">People</span>
          </div>
          <div className="notification">
            <span className="number">0</span>
          </div>
        </li>
        <li>
          <div className="link">
            <span className="icon">
              <MdOutlinePhotoSizeSelectActual />
            </span>
            <span className="link">Photos</span>
          </div>
          <div className="notification">
            <span className="number">0</span>
          </div>
        </li>
        <li>
          <div className="link">
            <span className="icon">
              <BiUser />
            </span>
            <span className="link">Profile</span>
          </div>
          <div className="notification">
            <span className="number">0</span>
          </div>
        </li>
        <li>
          <div className="link">
            <span className="icon">
              <FiSettings />
            </span>
            <span className="link">Settings</span>
          </div>
          <div className="notification">
            <span className="number">0</span>
          </div>
        </li>
      </ul>
    </section>
  );
}
