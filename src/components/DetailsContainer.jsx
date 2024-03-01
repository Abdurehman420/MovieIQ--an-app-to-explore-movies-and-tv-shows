import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Img from "../components/Img";
import ContentWrapper from "../components/ContentWrapper";
import { useDispatch, useSelector } from "react-redux";
import PosterFallBack from "../assets/no-poster.png";
import dayjs from "dayjs";
import Genres from "./Genres";
import CircleRating from "./CircleRating";
import PlayBtn from "./PlayBtn";
import VideoPopup from "./VideoPopup";
import { useEffect, useState } from "react";
import { IoMdHeart } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { addFavorite, removeFavorite } from "../store/FavoritesSlice";

function DetailsContainer({ video, crew }) {
  const { url } = useSelector((state) => state.home);
  const { favorites } = useSelector((state) => state.favorites);
  const { mediaType, id } = useParams();
  const { data, isLoading } = useFetch(`/${mediaType}/${id}`);
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [liked, setLiked] = useState(false);
  const _genres = data?.genres?.map((g) => g.id);

  const dispatch = useDispatch();
  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`;
  };

  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const handleClick = (data) => {
    toast(liked === true ? "Removed from favorites!" : "Added to favorites!", {
      duration: 2000,

      position: "top-center",
    });

    dispatch(liked === true ? removeFavorite(data.id) : addFavorite(data));
  };

  console.log(data);

  useEffect(() => {
    setLiked(favorites.map((f) => f.id).includes(data?.id));
  }, [favorites, data?.id]);

  return (
    <div>
      {!isLoading ? (
        <>
          {data && (
            <>
              <div className="DetailsContainer w-full bg-veryDarkPink pt-20 md:pt-32 mb-12 md:mb-0">
                <div className="backImg w-[100%] h-[100%] xl:w-full xl:h-full  absolute top-0 left-0 bottom-0 right-0 opacity-10 overflow-hidden  ">
                  <Img src={url.backdrop + data?.backdrop_path} />
                </div>
              </div>
              <div className="opacity-layer w-full h-[250px] absolute bottom-0 left-0"></div>
              <ContentWrapper className="z-10 relative">
                <div className="content flex  flex-col md:flex-row gap-5 md:gap-12 ">
                  <div className="left shrink-0 mb-5 md:mb-0 ">
                    {data?.poster_path ? (
                      <Img
                        className="posterImg rounded-md w-full md:max-w-[350px] lg:max-w-[400px]   "
                        src={url.backdrop + data?.poster_path}
                      />
                    ) : (
                      <Img
                        className="posterFallback rounded-md w-full md:max-w-[350px]"
                        src={PosterFallBack}
                      />
                    )}
                  </div>
                  <div className="right relative">
                    <h1 className="title text-3xl lg:text-4xl  mb-3">
                      {" "}
                      {`${data?.title || data?.name} (${dayjs(
                        data?.release_date || data?.first_air_date
                      ).format("YYYY")})`}
                    </h1>
                    <div
                      className={`tooltip bookmark absolute top-0 right-0 cursor-pointer  `}
                      onClick={() => handleClick(data)}
                    >
                      <Toaster containerStyle={{ top: "80px" }} />
                      <IoMdHeart
                        size={40}
                        fill={liked === true ? "#00BFFF " : "white"}
                      />
                    </div>

                    <h3 className="subTitle  opacity-80 lg:text-lg ">
                      {data?.tagline}
                    </h3>
                    <Genres
                      data={_genres}
                      className=" flex gap-3  child:bg-lightBlue/95 my-6 child:rounded-md "
                    />
                    <div className="row flex  gap-5 items-center">
                      <CircleRating
                        rating={data?.vote_average?.toFixed(1)}
                        className=" h-16 w-16  "
                        pathColor="#4ade80"
                      />
                      <div
                        className="playbtn flex gap-3 items-center cursor-pointer"
                        onClick={() => {
                          setVideoId(video.key);
                          setShow(true);
                        }}
                      >
                        <PlayBtn />
                        <span className="text">Watch Trailer</span>
                      </div>
                    </div>
                    <div className="overview my-5">
                      <h3 className="text-3xl mb-3">Overview</h3>
                      <p>{data.overview}</p>
                    </div>
                    <div className="info flex    gap-5 sm:gap-8  flex-wrap border-b-[1px] border-white/30 pb-5">
                      {data.status && (
                        <div className="item flex gap-1  text-lg flex-col">
                          <span className=" font-bold">Status:</span>
                          <span className=" opacity-75">{data.status}</span>
                        </div>
                      )}
                      {data.release_date && (
                        <div className="item flex gap-1  text-lg flex-col">
                          <span className=" font-bold"> Release Date:</span>
                          <span className=" opacity-75">
                            {dayjs(data?.release_date).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data.runtime && (
                        <div className="item flex gap-1  text-lg flex-col">
                          <span className=" font-bold"> Runtime:</span>
                          <span className=" opacity-75">
                            {toHoursAndMinutes(data.runtime)}
                          </span>
                        </div>
                      )}
                    </div>
                    {director?.length > 0 && (
                      <div className="info  my-5 border-b-[1px] border-white/30 pb-5">
                        <span className=" font-bold">Director: </span>
                        <span className=" opacity-75">
                          {" "}
                          {director?.map((d) => d.name).join(" , ")}
                        </span>
                      </div>
                    )}
                    {writer?.length > 0 && (
                      <div className="info  my-5 border-b-[1px] border-white/30 pb-5">
                        <span className=" font-bold">Writer: </span>
                        <span className=" opacity-75">
                          {" "}
                          {writer?.map((w) => w.name).join(" , ")}
                        </span>
                      </div>
                    )}
                    {data?.created_by?.length > 0 && (
                      <div className="info  my-5 border-b-[1px] border-white/30 pb-5">
                        <span className=" font-bold">Creator: </span>
                        <span className=" opacity-75">
                          {" "}
                          {data?.created_by?.map((c) => c.name).join(" , ")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </ContentWrapper>
              <VideoPopup
                videoId={videoId}
                setVideoId={setVideoId}
                show={show}
                setShow={setShow}
              />
            </>
          )}
        </>
      ) : (
        <div className="detailsContainerSkeleton flex flex-col md:flex-row relative gap-5 md:gap-12 pt-24 md:pt-32">
          <ContentWrapper className="flex gap-12">
            <div className="left   shrink-0 w-full block rounded-md aspect-[1/1.5]   md:max-w-96 skeleton"></div>
            <div className="right w-full child:w-full child:h-5 child:mb-5 child:rounded-3xl">
              <div className="row skeleton"></div>
              <div className="row skeleton !w-[75%] !mb-12"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton !w-1/2 !mb-12"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
}

export default DetailsContainer;
