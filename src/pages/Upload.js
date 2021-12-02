import { useContext, useState } from "react";
import UserContext from "../context/user";
import { compress } from "../helpers/compress";
import { VALID_IMAGE_FORMATS } from "../constants/const";
import { uploadPost } from "../services/firebase";
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

  const handleChange = (e) => {
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

  return (
    <div className="container w-screen h-screen max-w-screen-lg flex justify-center items-center bg-gray-background">
      <div className="grid grid-cols-3 p-4 shadow-primary rounded  bg-white  min-w-sm min-h-xxl place-content-center">
        <div className="col-span-2 h-full w-full">
          <div className="relative  flex items-center">
            {isPostUploaded ? (
              <img
                src={`${uploadedFileAvatar}`}
                alt="dali"
                className="w-full h-96 object-cover"
              />
            ) : (
              <div className="w-full min-h-xl flex flex-col justify-center items-center border-1 border-gray-light p-1 rounded">
                <h3 className="text-2xl">Drag a file here</h3>
                <p className="mb-3  text-lg">or</p>
                <button className="bg-blue-light text-white px-2 py-1 rounded shadow-x cursor-pointer z-10">
                  select a file from your device
                </button>
              </div>
            )}
            <form className="absolute top-0 left-0 w-full h-full">
              <input
                type="file"
                name="file"
                className="w-full h-full opacity-0"
                onChange={handleChange}
              />
            </form>
          </div>
        </div>
        <div className="h-full w-full ml-4 flex flex-col justify-center items-center">
          <form>
            <textarea
              placeholder="write a caption"
              className="min-h-x p-2 focus:outline-none shadow-base"
              onChange={(e) => {
                setCaption(e.target.value);
                console.log(e.target.value);
              }}
            />
          </form>
          <button
            className="mt-4 shadow-base rounded font-bold text-gray-base  bg-blue-extraLight px-3 py-2"
            type="submit"
            onClick={handleSumbit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
