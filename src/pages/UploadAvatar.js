import { useEffect, useState } from "react";
import EditAvatar from "../components/profile/EditAvatar";
import { VALID_IMAGE_FORMATS } from "../constants/const";
export default function UploadAvatar() {
  // const [isloading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [imageString, setImageString] = useState("");

  const isValidImageFile = (file) => {
    let size = Math.round(file.size / 1024);
    //2000kb ~ 2mb
    if (VALID_IMAGE_FORMATS.includes(file.type) && size <= 2000) {
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
    return <EditAvatar fileSrc={imageString} fileName={fileName} />;
  } else {
    return (
      <div className="container">
        <input type="file" onChange={uploadFile} />
      </div>
    );
  }
}
