import Chart from "./Chart";
import Overview from "./Overview";

export default function Index({ user, photos, linkViews, storyViews }) {
  const { followers } = user;
  const { following } = user;
  const posts = photos;
  return (
    <div className="analytics_container">
      <div className="overview_container">
        <Overview text={"Followers"} count={followers.length} />
        <Overview text={"Following"} count={following.length} />
        <Overview text={"Post"} count={photos.length} />
        <Overview text={"Story views"} count={storyViews.length} />
      </div>
      <div className="chart_container">
        <Chart posts={posts} linkViews={linkViews} />
      </div>
      {/* <Overview text={"Post"} /> */}
    </div>
  );
}
