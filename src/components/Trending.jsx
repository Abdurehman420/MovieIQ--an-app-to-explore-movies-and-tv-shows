import { useState } from "react";
import ContentWrapper from "./ContentWrapper";
import SwitchTabs from "./SwitchTabs";
import useFetch from "../hooks/useFetch";
import Carousel from "./Carousel";

const Trending = () => {
  const [apiEndPoint, setApiEndPoint] = useState("day");

  const { data, isLoading } = useFetch(`/trending/all/${apiEndPoint}`);

  const onTabChange = (tab) => {
    setApiEndPoint(tab === "Day" ? "day" : "week");
  };
  return (
    <div className=" mb-20">
      <ContentWrapper className=" flex justify-between items-center mb-5">
        <span className="text-3xl  font-light ">Trending</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={isLoading} />
    </div>
  );
};

export default Trending;
