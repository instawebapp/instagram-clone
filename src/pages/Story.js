import { useParams, Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import * as ROUTES from "../constants/routes";
import { Fragment, useEffect, useState } from "react";
import { getAllStories } from "../services/firebase";
export default function Story() {
  const [selectedStory, setSelectedStory] = useState(null);
  let { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      let response = await getAllStories();
      if (response) {
        let [res] = response.filter((item) => item.start === Number(id));
        if (res) {
          setSelectedStory(res);
        }
      }
    }
    fetchData();
  }, [id]);
  return (
    <div className="h-screen relative bg-black-light p-0 m-0">
      {selectedStory !== null ? (
        <>
          <div className="absolute top-4 right-0 bg-black-light flex items-center justify-center w-16 text-gray-primary z-10 text-4xl font-bold">
            <Link to={ROUTES.DASHBOARD}>
              <div className="">
                <IoClose />
              </div>
            </Link>
          </div>
          <div className="flex h-5/6 w-full items-center justify-center rounded-lg">
            <div className="h-full w-1/4 z-10  border border-gray-base mt-28">
              <img
                src={selectedStory.url}
                alt="story"
                className="w-full h-full"
              />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
