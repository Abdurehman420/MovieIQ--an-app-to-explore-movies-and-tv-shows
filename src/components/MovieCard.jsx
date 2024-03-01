import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import Img from "./Img";
import PosterBackupPic from "../assets/no-poster.png";
import CircleRating from "./CircleRating";
import Genres from "./Genres";

function MovieCard({
  item,
  fromSearch,
  endpoint,
  posterBlockclassName,
  dateClassName,
}) {
  const { url } = useSelector((state) => state.home);
  const navigate = useNavigate();
  const posterUrl = item.poster_path
    ? url.poster + item.poster_path
    : PosterBackupPic;
  return (
    <div
      key={item.id}
      className={`carouselItem   shrink-0  cursor-pointer    w-36 md:w-40 lg:w-44 xl:w-48   `}
      onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}
    >
      <div
        className={`posterBlock w-full relative bg-cover bg-center flex items-end justify-between   mb-7 aspect-[1/1.5] ${posterBlockclassName}  `}
      >
        <Img src={posterUrl} className=" rounded-md" />
        {!fromSearch && (
          <>
            <CircleRating
              rating={item.vote_average.toFixed(1)}
              pathColor="green"
              className=" w-10 h-10 lg:w-12 lg:h-12 absolute  -bottom-5 left-3  bg-white"
            />
            <Genres
              data={item?.genre_ids?.slice(0, 2)}
              className="carouselGenre"
            />
          </>
        )}
      </div>
      <div className="text flex  flex-col space-y-3 ">
        <span className="text-md lg:text-xl whitespace-nowrap overflow-hidden text-ellipsis">
          {item.title || item.name}
        </span>
        <span className={` opacity-50 text-sm lg:text-md ${dateClassName}`}>
          {dayjs(item?.release_date || item?.first_air_date).format(
            "MMM D, YYYY"
          )}
        </span>
      </div>
    </div>
  );
}

export default MovieCard;
