import Cropper from "react-cropper";
import { useEffect, useState, useContext } from "react";
import "cropperjs/dist/cropper.css";
import { Modal, Button } from "react-bootstrap";
import { updateUserAvatar } from "../services/firebase/updateDocuments/updateUserAvatar";
import UserContext from "../context/user";
import { compress } from "./compress";
import { GetUserById } from "../services/firebase";

export default function CropperFunction({ imgSrc, fileName }) {
  const {
    user: { uid: userId = "" },
  } = useContext(UserContext);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState(undefined);
  const [show, setShow] = useState(true);
  const [croppedImage, setCroppedImage] = useState(undefined);
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [username, setUserName] = useState("");
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  useEffect(() => {
    if (userId !== "" || userId !== null) {
      GetUserById(userId).then((response) => {
        setUserName(response.username);
      });
    }
  }, []);

  useEffect(() => {
    if (croppedImage !== undefined) {
      const name = croppedImage.name;
      const locationPath = `/users/avatars/${name}`;
      const collectionName = "users";
      if (isSubmitting) {
        updateUserAvatar(
          croppedImage,
          locationPath,
          name,
          userId,
          collectionName
        );
      }
      setIsSubmitting(false);
    }
  }, [croppedImage]);

  const getCroppedImageFile = (blob) => {
    let filename = username + ".jpeg";
    console.log(filename);
    let file = new File([blob], filename, {
      type: blob.type,
      lastModified: Date.now(),
    });
    // for user avatar
    const width = 230;
    const height = 230;
    compress(file, width, height).then((res) => {
      setCroppedImage(res);
    });
  };

  const getCropData = async () => {
    if (typeof cropper !== undefined) {
      let data = cropper.getCroppedCanvas().toDataURL();
      setCropData(data);
      let croppedCanvas = cropper.getCroppedCanvas();
      let roundCanvas = null;
      roundCanvas = getRoundedCanvas(croppedCanvas);
      if (data && roundCanvas !== null) {
        roundCanvas.toBlob((blob) => {
          getCroppedImageFile(blob);
        });
      }
    }
  };
  function getRoundedCanvas(sourceCanvas) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    var width = sourceCanvas.width;
    var height = sourceCanvas.height;
    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = false;
    context.imageSmoothingQuality = "medium";
    context.drawImage(sourceCanvas, 0, 0, width, height);
    context.globalCompositeOperation = "destination-in";
    context.beginPath();
    context.arc(
      width / 2,
      height / 2,
      Math.min(width, height) / 2,
      0,
      2 * Math.PI,
      true
    );
    context.fill();
    return canvas;
  }
  return (
    <div className="cropper_container">
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Header>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={getCropData}>
            Done
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Cropper
            dragMode="move"
            style={{ height: 400, borderRadius: "50%" }}
            zoomTo={1}
            initialAspectRatio={1}
            aspectRatio={1}
            preview=".img-preview"
            src={imgSrc}
            viewMode={3}
            background={false}
            responsive={true}
            autoCropArea={0.7}
            restore={false}
            center={false}
            highlight={false}
            checkOrientation={false}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            guides={false}
            cropBoxMovable={true}
            cropBoxResizable={false}
            zoomOnWheel={true}
            toggleDragModeOnDblclick={false}
            minCropBoxHeight={100} //280px
            minCropBoxWidth={100} // 280px
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
