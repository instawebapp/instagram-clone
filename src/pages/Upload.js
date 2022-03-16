import { useContext, useRef, useState } from "react";
import UserContext from "../context/user";
import { compress } from "../helpers/compress";
import { VALID_IMAGE_FORMATS } from "../constants/const";
import { uploadPost } from "../services/firebase";
import Button from "../components/form/Button";
import { BsPlusSquareFill } from "react-icons/bs";
import { formatText } from "../helpers/formatText";
export default function Upload(avatar) {
  const {
    user: { uid: userId },
  } = useContext(UserContext);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFileAvatar, setUploadedFileAvatar] = useState(null);
  const [caption, setCaption] = useState("");
  const [captionText, setCaptionText] = useState("");
  const [hashtagText, setHashtagText] = useState(false);
  const [linkTagArray, setLinkTagArray] = useState([]);
  const [singleLinkText, setSingleLinkText] = useState("");
  const [totalLinks, setTotalLinks] = useState([]);
  const [links, setLinks] = useState([]);
  const [linkTagCounter, setLinkTagCounter] = useState(0);
  const isValidImageFile = (file) => {
    if (VALID_IMAGE_FORMATS.includes(file.type) && file.size <= 5e6) {
      return true;
    }
    return false;
  };

  const compressAndUpload = (captionData, linksData) => {
    const width = 540;
    const height = 800;
    console.log("pic");
    compress(uploadedFile, width, height).then((f) => {
      console.log(f);
      const extension = f.name.split(".").slice(-1)[0];
      let timestamp = new Date().getTime().toString();
      const filepath = `posts/${timestamp}.${extension}`;
      console.log(captionData, linksData);
      uploadPost(
        f,
        filepath,
        userId,
        Number(timestamp),
        captionData,
        linksData
      );
    });
  };

  const handleUploadFile = (e) => {
    e.preventDefault();
    const [file] = e.target.files;
    console.log(file);
    if (file && isValidImageFile(file)) {
      setUploadedFile(file);
      setUploadedFileAvatar(URL.createObjectURL(file));
    }
  };

  const handleSumbit = (e, captionData, linksData) => {
    e.preventDefault();
    // prevent from resubmit
    if (isSubmitting) {
      return;
    }
    setisSubmitting(true);
    compressAndUpload(captionData, linksData);
    setisSubmitting(false);
  };

  function collectLinks() {
    let res = totalLinks.map((item) => item);
    if (singleLinkText !== "") {
      res.push(singleLinkText);
      setTotalLinks(res);
    }
    return res;
  }
  const AddLinkTag = () => {
    if (
      linkTagCounter == 0 ||
      (linkTagCounter !== 0 && singleLinkText !== "")
    ) {
      // link tag counter
      let counter = linkTagCounter;
      counter++;
      setLinkTagCounter(counter);
      // add link tag in UI
      let val = linkTagArray.map((item) => item);
      val.push(1);
      setLinkTagArray(val);
      collectLinks();
    } else {
      console.log("please write link");
    }
    setSingleLinkText("");
  };

  const handleTextChange = (e) => {
    let res = e.target.value;
    setCaptionText(res);
  };

  const handleLinkChange = (e) => {
    setSingleLinkText(e.target.value);
  };

  const handleSubmitClick = (e) => {
    // handleSumbit(e);
    //for the last link text , we don't press + button so AddLinkTag can'nt called, we can't get last links text by totalLinks in the submit method , so we return the list in which last link text also added bcoz yet singleLinkText contains some data
    let linksData = collectLinks();
    setSingleLinkText("");
    let captionData = formatText(captionText);
    setCaption(captionData);
    setLinks(linksData);
    // handleSumbit(e, captionData, linksData);
    console.log(uploadedFile);
    console.log(captionData);
    console.log(linksData);
  };

  const handleSubmitKey = (e) => {
    if (e.key === "Enter") {
      // handleSumbit(e);
      console.log("Submit", e);
    }
  };

  return (
    <div className="upload_container">
      <div className="upload">
        <section className="upload_header">
          <h1>Upload a file</h1>
          <p>It is very easy.</p>
        </section>
        <section className="upload_section">
          {uploadedFileAvatar !== null ? (
            <div className="fileBox">
              <img
                src={uploadedFileAvatar}
                alt="postAvatar"
                className="fileAvatar"
              />
            </div>
          ) : (
            <div className="fileBox">
              <p className="text">
                Drag a file here or browse file for a upload
              </p>
              <div className="fileInput">
                <input
                  type="file"
                  className="file"
                  onChange={handleUploadFile}
                />
              </div>
            </div>
          )}

          <div className="textBox">
            <div className="caption_section">
              <textarea
                name=""
                rows={7}
                cols={52}
                placeholder="Write a caption"
                className={`${hashtagText ? "caption_text" : "caption_text"}`}
                onChange={handleTextChange}
              ></textarea>
            </div>
            <h1 className="link_header">
              Add links
              <span onClick={AddLinkTag} className="icon">
                <BsPlusSquareFill />
              </span>
            </h1>
            <div className="links_section">
              {linkTagArray.length > 0 &&
                linkTagArray.map((item, index) => {
                  return (
                    <div key={index} className="input_tag">
                      <input
                        type="text"
                        className="input"
                        onChange={handleLinkChange}
                      />
                    </div>
                  );
                })}
            </div>
            <div className="btn_section">
              <Button
                btnType={"submit"}
                btnClass={"btn file_upload_btn"}
                btnTitle={"Post"}
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
