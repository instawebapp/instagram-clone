import { GrHomeRounded } from "react-icons/gr";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { BsFilePerson } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { MdOutlineAnalytics } from "react-icons/md";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import UserContext from "../../context/user";
import { GetUserById } from "../../services/firebase";
export default function Tabs({ userName }) {
  return (
    <section className="tabs_section">
      <ul className="tabs_list">
        <Link to={ROUTES.DASHBOARD}>
          <li>
            <div className="link">
              <span className="icon">
                <GrHomeRounded />
              </span>
              <span className="link">Home</span>
            </div>
            <div className="invisible notification">
              <span className="number">0</span>
            </div>
          </li>
        </Link>
        <li className="hide_tab">
          <div className="link">
            <span className="icon">
              <BsFilePerson />
            </span>
            <span className="link">People</span>
          </div>
          <div className="invisible notification">
            <span className=" number">0</span>
          </div>
        </li>
        <li className="hide_tab">
          <div className="link">
            <span className="icon">
              <MdOutlinePhotoSizeSelectActual />
            </span>
            <span className="link">Photos</span>
          </div>
          <div className="invisible notification">
            <span className="number">0</span>
          </div>
        </li>
        <Link to={`/p/${userName}`}>
          <li className="hide_tab">
            <div className="link">
              <span className="icon">
                <BiUser />
              </span>
              <span className="link">Profile</span>
            </div>
            <div className="invisible notification">
              <span className="number">0</span>
            </div>
          </li>
        </Link>
        <li className="hide_tab">
          <div className="link">
            <span className="icon">
              <MdOutlineAnalytics />
            </span>
            <span className="link">Analytics</span>
          </div>
          <div className="invisible notification">
            <span className="number">0</span>
          </div>
        </li>
      </ul>
    </section>
  );
}
