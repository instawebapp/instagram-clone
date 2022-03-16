import CropperFunction from "../../helpers/Cropper";
export default function EditAvatar(props) {
  return (
    <div className="editAvatar_container">
      <section className="img_section">
        <div className="cropper">
          <CropperFunction
            imgSrc={props.fileSrc}
            setImageString={props.setImageString}
            fileName={props.fileName}
          />
        </div>
      </section>
    </div>
  );
}
