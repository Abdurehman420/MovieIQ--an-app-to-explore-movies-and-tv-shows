import { useState } from "react";
import ContentWrapper from "./ContentWrapper";
import SwitchTabs from "./SwitchTabs";
import useFetch from "../hooks/useFetch";
import Carousel from "./Carousel";

const TopRated = () => {
  const [apiEndPoint, setApiEndPoint] = useState("movie");

  const { data, isLoading } = useFetch(`/${apiEndPoint}/top_rated`);

  const onTabChange = (tab) => {
    setApiEndPoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className=" mb-20">
      <ContentWrapper className=" flex  flex-col sm:flex-row justify-between items-center mb-5">
        <span className="text-3xl mb-5 sm:mb-0 font-light ">Top Rated</span>
        <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel
        data={data?.results}
        loading={isLoading}
        endpoint={apiEndPoint}
      />
    </div>
  );
};

export default TopRated;
