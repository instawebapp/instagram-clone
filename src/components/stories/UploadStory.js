import { Modal, Button } from "react-bootstrap";
import { VALID_IMAGE_FORMATS } from "../../constants/const";
import { useContext, useEffect, useState, useRef } from "react";
import { compress } from "../../helpers/compress";
import {
  uploadStories,
  getUploadedStory,
  GetUserById,
} from "../../services/firebase";
import UserContext from "../../context/user";
import { Link } from "react-router-dom";
import FileInput from "../form/FileInput";
import { DEFAULT_IMAGE_PATH } from "../../constants/img_paths";
export default function UploadStory() {
  const {
    user: { uid: userId },
  } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [avatar, setAvatar] = useState(null);
  // uploaded story
  const [storyAvailable, setStoryAvailable] = useState(false);
  const [uploadedStory, setUploadedStory] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarIsChanged, setAvatarIsChanged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const compressAndUpload = () => {
    const width = 540;
    const height = 360;
    compress(avatarFile, width, height).then((f) => {
      const extension = f.name.split(".").slice(-1)[0];
      let timestamp = new Date().getTime().toString();
      const filepath = `images/${timestamp}.${extension}`;
      // timestamp - story duration starting time
      uploadStories(f, filepath, userId, Number(timestamp));
      setAvatarIsChanged(true);
    });
  };
  if (uploadedStory) {
    // const { url } = uploadedStory.uploadedStory;
    // console.log("yess", url);
  }
  const handleSubmit = (e) => {
    handleClose();
    if (isSubmitting) {
      //  prevent from resubmitting
      return;
    }
    setIsSubmitting(true);
    compressAndUpload();
    setIsSubmitting(false);
  };

  function handleUpload(e) {
    e.preventDefault();
    const [file] = e.target.files;
    if (file && isValidImageFile(file)) {
      setAvatar(URL.createObjectURL(file));
      setAvatarFile(file);
      setTimeout(() => {
        handleShow();
      }, 2000);
    }
  }

  const isValidImageFile = (file) => {
    if (VALID_IMAGE_FORMATS.includes(file.type) && file.size <= 5e6) {
      return true;
    }
    return false;
  };
  let _componentStatus = useRef(true);
  useEffect(() => {
    async function fetchData() {
      const response = await getUploadedStory(userId);
      if (response) {
        setUploadedStory(response);
        setStoryAvailable(true);
      }
    }
    if (_componentStatus) {
      fetchData();
    }
    return () => {
      _componentStatus.current = false;
    };
  }, [userId, storyAvailable]);

  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await GetUserById(userId);
      console.log(response);
      if (response) {
        setUserAvatar(response?.avatar?.avatarURL);
      }
    }
    if (userId) {
      fetchData();
    }
  }, [userId]);

  return (
    <div>
      {storyAvailable && uploadedStory ? (
        <div className="uploaded_story_section">
          <div className="uploaded_story">
            <Link to={`/stories/${uploadedStory.start}`}>
              <img src={uploadedStory.url} alt="khjhj" />
            </Link>
          </div>
          <h3 className="story_title">user</h3>
        </div>
      ) : (
        <div>
          <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Body
              style={{
                background: `url(${avatar}) center center/cover no-repeat`,
                width: "100%",
                objectFit: "cover",
                minHeight: "488px",
              }}
            ></Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Done
              </Button>
            </Modal.Footer>
          </Modal>
          <div className="upload_story_section">
            <div className="upload_story">
              <img src={userAvatar || DEFAULT_IMAGE_PATH} alt="jay" />
              <div className="file">
                <input type="file" onChange={handleUpload} />
                {/* <FileInput
                    inputClass=""
                    ariaLable="Upload Story"
                    handleChange={handleUpload}
                    className="input_file"
                  /> */}
              </div>
            </div>
            {avatarIsChanged ? (
              <h3 className="story_title">story</h3>
            ) : (
              <h3 className="story_title">Upload</h3>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
