export const compress = async (file, width, height) => {
  return new Promise(function (resolve, reject) {
    const fileName = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const elem = document.createElement("canvas");
        //   if file size is already less then 800px then dont do anthing
        // if (img.width <= 800) {
        //   resolve(file);
        //   return;
        // }
        // const width = 230; //Math.min(800, img.width);
        // const scaleFactor = width / img.width;
        elem.width = width;
        elem.height = height;
        const ctx = elem.getContext("2d");
        ctx.drawImage(img, 0, 0, width, width);
        ctx.canvas.toBlob((blob) => {
          resolve(
            new File([blob], fileName, {
              type: "image/jpeg",
              lastModified: Date.now(),
            })
          );
        }, "image/jpeg");
      };
    };

    reader.onerror = (err) => reject(err);
  });
};
