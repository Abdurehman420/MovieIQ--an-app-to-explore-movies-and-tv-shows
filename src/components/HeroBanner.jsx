import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useSelector } from "react-redux";
import Img from "./Img";
import ContentWrapper from "./ContentWrapper";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const { url } = useSelector((state) => state.home);

  const navigate = useNavigate();

  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  console.log(query);
  return (
    <div className="heroBanner  w-full  h-[480px] flex items-center relative  md:h-[700px]">
      {!loading && (
        <div className="back-img w-full   h-full absolute top-0 left-0 right-0 bottom-0 -z-20 overflow-hidden opacity-50">
          {" "}
          <Img src={background} />{" "}
        </div>
      )}
      <div className="opacity-layer w-full h-[350px]  absolute  left-0 bottom-0  -z-10 "></div>
      <ContentWrapper>
        <div className="heroContent flex flex-col  items-center space-y-8 my-40 w-full">
          <h1 className=" text-5xl font-semibold leading-[0px] md:text-7xl">
            Welcome.
          </h1>
          <p className=" text-center text-md md:text-2xl">
            Millions of movies, TV shows and people to discover. Explore now.
          </p>
          <div className=" flex justify-center  w-2/3  ">
            <input
              type="text"
              className=" border-none px-6 py-2 bg-white outline-none flex-1 text-lg  rounded-l-sm text-gray-600"
              placeholder="Search for a movie"
              onKeyUp={searchQueryHandler}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              onClick={() => navigate(`/search/${query}`)}
              className=" bg-lightBlue  text-slate-100 px-6 py-2 rounded-sm rounded-l-none border-none text-lg  hover:bg-lightBlue/90  duration-200 cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
