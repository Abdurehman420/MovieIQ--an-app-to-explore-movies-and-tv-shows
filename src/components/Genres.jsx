import { useSelector } from "react-redux";

function Genres({ data, className }) {
  const genres = useSelector((state) => state.home.genres);

  return (
    <div className={`genres  ${className}`}>
      {data?.map((item) => {
        if (!genres[item]?.name) return null;
        return (
          <div
            className="genre bg-pink-800  py-1 px-[5px] text-[12px] rounded-sm whitespace-nowrap   "
            key={item}
          >
            {genres[item]?.name}
          </div>
        );
      })}
    </div>
  );
}

export default Genres;
