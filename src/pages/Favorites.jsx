import { useDispatch, useSelector } from "react-redux";
import ContentWrapper from "../components/ContentWrapper";
import MovieCard from "../components/MovieCard";
import { IoMdCloseCircle } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { removeFavorite } from "../store/FavoritesSlice";

function Favorites() {
  const { favorites } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const handleClick = (data) => {
    toast("Removed from favorites!", {
      duration: 2000,
      position: "top-center",
    });

    dispatch(removeFavorite(data));
  };
  return (
    <div className="favoritesPage pt-20 ">
      <ContentWrapper>
        <h2 className=" text-2xl  mt-2">My Favorites</h2>

        <div className=" flex flex-wrap    gap-[10px] md:gap-5 mt-8 ">
          {favorites?.map((item) => (
            <div className="relative" key={item.id}>
              <MovieCard
                item={item}
                endpoint={item.release_date ? "movie" : "tv"}
                fromSearch={true}
              />
              <div
                className="removeFromFavorite cursor-pointer absolute  top-2 right-2  rounded-full bg-white hover:bg-black duration-200  w-4 h-4 md:w-6 md:h-6 "
                onClick={() => handleClick(item.id)}
              >
                <IoMdCloseCircle
                  // size={32}
                  className=" duration-200  text-lightBlue absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6   md:w-8 md:h-8 "
                />
                <Toaster containerStyle={{ top: "80px" }} />
              </div>
            </div>
          ))}
        </div>
      </ContentWrapper>
    </div>
  );
}

export default Favorites;
