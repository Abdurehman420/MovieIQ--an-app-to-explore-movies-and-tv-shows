import { useState } from "react";
import ContentWrapper from "./ContentWrapper";
import SwitchTabs from "./SwitchTabs";
import useFetch from "../hooks/useFetch";
import Carousel from "./Carousel";

const Popular = () => {
  const [apiEndPoint, setApiEndPoint] = useState("movie");

  const { data, isLoading } = useFetch(`/${apiEndPoint}/popular`);

  const onTabChange = (tab) => {
    setApiEndPoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className=" mb-20">
      <ContentWrapper className=" flex justify-between items-center mb-5">
        <span className="text-3xl  font-light ">What's Popular</span>
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

export default Popular;
