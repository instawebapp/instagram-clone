import { useContext, useState } from "react";
import UserContext from "../context/user";
import { compress } from "../helpers/compress";
import { VALID_IMAGE_FORMATS } from "../constants/const";
import { uploadPost } from "../services/firebase";
import Button from "../components/form/Button";
import FileInput from "../components/form/FileInput";
export default function Upload(avatar) {
  const {
    user: { uid: userId },
  } = useContext(UserContext);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [isPostUploaded, setIsPostUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFileAvatar, setUploadedFileAvatar] = useState(null);
  const [caption, setCaption] = useState("");
  const isValidImageFile = (file) => {
    if (VALID_IMAGE_FORMATS.includes(file.type) && file.size <= 5e6) {
      return true;
    }
    return false;
  };

  const compressAndUpload = () => {
    compress(uploadedFile).then((f) => {
      const extension = f.name.split(".").slice(-1)[0];
      let timestamp = new Date().getTime().toString();
      const filepath = `posts/${timestamp}.${extension}`;
      uploadPost(f, filepath, userId, Number(timestamp), caption);
    });
  };

  const handleUploadFile = (e) => {
    e.preventDefault();
    const [file] = e.target.files;
    if (file && isValidImageFile(file)) {
      setIsPostUploaded(true);
      setUploadedFile(file);
      setUploadedFileAvatar(URL.createObjectURL(file));
    }
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    // prevent from resubmit
    if (isSubmitting) {
      return;
    }
    setisSubmitting(true);
    compressAndUpload();
    setisSubmitting(false);
  };
  const handleUploadClick = (e) => {
    console.log("upload", e);
  };
  const handleUploadKey = (e) => {
    if (e.key === "Enter") {
      console.log("upload", e);
    }
  };
  const handleSubmitClick = (e) => {
    handleSumbit(e);
    console.log("Submit", e);
  };
  const handleSubmitKey = (e) => {
    if (e.key === "Enter") {
      handleSumbit(e);
      console.log("Submit", e);
    }
  };
  return (
    <div className="upload">
      <div className="upload_section">
        <div className="upload_file_section">
          <div className="file">
            {isPostUploaded ? (
              <img src={`${uploadedFileAvatar}`} alt="dali" />
            ) : (
              <div className="upload_file_selection">
                <h3 className="title">Drag a file here</h3>
                <p className="subtitle">or</p>
                <Button
                  btnType={"button"}
                  btnClass={"btn file_upload_btn"}
                  btnTitle={"select a file from your device"}
                  icon={""}
                  handleClick={handleUploadClick}
                  handleKey={handleUploadKey}
                />
                <form className="upload_file_form">
                  <FileInput
                    inputClass={"input upload_file_input"}
                    ariaLable={"Upload a File"}
                    handleChange={handleUploadFile}
                  />
                </form>
              </div>
            )}
          </div>
        </div>
        <div className="caption_section">
          <form className="caption_form">
            <textarea
              placeholder="write a caption"
              className="caption_text"
              onChange={(e) => {
                setCaption(e.target.value);
                console.log(e.target.value);
              }}
            />
          </form>
          <Button
            btnType={"submit"}
            btnClass={"btn submit_btn"}
            btnTitle={"Submit"}
            icon={""}
            handleClick={handleSubmitClick}
            handleKey={handleSubmitKey}
          />
        </div>
      </div>
    </div>
  );
}
