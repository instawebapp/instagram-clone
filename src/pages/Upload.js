export default function Upload(avatar) {
  console.log(avatar);
  return (
    <div className="container w-screen h-screen">
      <div
        className="min-h-xl w-96"
        style={{ background: `url(${avatar}) center center/cover no-repeat` }}
      >
        {/* <img src={avatar} alt="img" className="w-full h-full" /> */}
      </div>
    </div>
  );
}
