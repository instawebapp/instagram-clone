import Cropper from "react-cropper";
import { useEffect, useState, useContext } from "react";
import "cropperjs/dist/cropper.css";
import { Modal, Button } from "react-bootstrap";
import { updateUserAvatar } from "../services/firebase/updateDocuments/updateUserAvatar";
import UserContext from "../context/user";

export default function CropperFunction({ imgSrc, fileName }) {
  const {
    user: { uid: userId = "" },
  } = useContext(UserContext);

  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState(undefined);
  const [show, setShow] = useState(true);
  const [croppedImage, setCroppedImage] = useState(undefined);
  const [isSubmitting, setIsSubmitting] = useState(true);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  useEffect(() => {
    console.log(croppedImage);
    if (croppedImage !== undefined) {
      const extension = croppedImage.name.split(".").slice(-1)[0];
      let timestamp = new Date().getTime().toString();
      const locationPath = `/users/avatars/${timestamp}.${extension}`;
      const name = timestamp + "." + extension;
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
    let ex = blob.type.split("/")[1];
    let name = fileName.split(".")[0];
    let filename = name + "." + ex;

    let file = new File([blob], filename, {
      type: blob.type,
      lastModified: Date.now(),
    });
    setCroppedImage(file);
  };

  const getCropData = async () => {
    console.log("ennnn");
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
            style={{ height: 400 }}
            zoomTo={0.5}
            initialAspectRatio={1}
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
            cropBoxMovable={false}
            cropBoxResizable={false}
            zoomOnWheel={true}
            toggleDragModeOnDblclick={false}
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}
