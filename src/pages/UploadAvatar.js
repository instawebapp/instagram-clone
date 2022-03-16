import { useEffect, useState, useContext } from "react";
import EditAvatar from "../components/profile/EditAvatar";
import { VALID_IMAGE_FORMATS } from "../constants/const";
import Button from "../components/form/Button";
import { formatText } from "../helpers/formatText";
import UserContext from "../context/user";
import { GetUserById, updateProfile } from "../services/firebase";
import { useHistory } from "react-router-dom";
export default function UploadAvatar() {
  const { user } = useContext(UserContext);
  const [userName, setUserName] = useState("");
  const history = useHistory();
  useEffect(() => {
    async function fetchData() {
      const response = await GetUserById(user.uid);
      console.log(response);
      if (response) {
        setUserName(response?.username);
      }
    }
    if (user) {
      fetchData();
    }
  }, [user]);

  // const [isloading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [imageString, setImageString] = useState("");
  const [bio, setBio] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);
  const [uploadedFileAvatar, setUploadedFileAvatar] = useState(null);
  const isValidImageFile = (file) => {
    let size = Math.round(file.size / 1024);
    //5000kb ~ 5mb
    if (VALID_IMAGE_FORMATS.includes(file.type) && size <= 5000) {
      return true;
    }
    return false;
  };

  const uploadFile = (e) => {
    let f = null;
    e.preventDefault();
    if (e.dataTransfer) {
      f = e.dataTransfer.files[0];
      setFileName(f.name);
    } else if (e.target) {
      f = e.target.files[0];
      setFileName(f.name);
    } else {
      f = null;
    }
    if (f != null && isValidImageFile(f)) {
      setFile(f);
      console.log(f.name);
    } else {
      console.log("please select file having size less than 2mb");
    }
  };

  useEffect(() => {
    if (file != null) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageString(reader.result);
      };
      // setIsLoading(false);
    }
  }, [file]);

  if (imageString !== "") {
    console.log(fileName);
    return (
      <EditAvatar
        fileSrc={imageString}
        setImageString={setImageString}
        fileName={fileName}
      />
    );
  }

  const handleSumbit = (e, bioData) => {
    e.preventDefault();
    // prevent from resubmit
    if (isSubmitting) {
      return;
    }
    setisSubmitting(true);
    updateProfile(userName, bioData);
    history.push(`/p/${userName}`);
    setisSubmitting(false);
  };
  const handleSubmitKey = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
    }
  };
  const handleTextChange = (e) => {
    let res = e.target.value;
    setBio(res);
  };

  const handleSubmitClick = (e) => {
    let bioData = formatText(bio);
    handleSumbit(e, bioData);
  };
  return (
    <div className="upload_container">
      <div className="upload">
        <section className="upload_header">
          <h1>Edit a bio</h1>
          <p>It is very easy.</p>
        </section>
        <section className="upload_section">
          {uploadedFileAvatar !== null ? (
            <div className="fileBox">
              <p>file is uploading...</p>
            </div>
          ) : (
            <div className="fileBox">
              <p className="text">
                Drag a file here or browse file for a upload
              </p>
              <div className="fileInput">
                <input type="file" className="file" onChange={uploadFile} />
              </div>
            </div>
          )}

          <div className="textBox">
            <div className="caption_section">
              <textarea
                name=""
                rows={7}
                cols={52}
                placeholder="Write a bio"
                onChange={handleTextChange}
                className="caption_text"
              ></textarea>
            </div>
            <div className="btn_section">
              <Button
                btnType={"submit"}
                btnClass={"btn file_upload_btn"}
                btnTitle={"Submit"}
                icon={""}
                handleClick={handleSubmitClick}
                handleKey={handleSubmitKey}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
