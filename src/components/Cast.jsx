import { useSelector } from "react-redux";
import ContentWrapper from "./ContentWrapper";
import Img from "./Img";
import avatar from "../assets/avatar.png";

function Cast({ data, loading }) {
  const { url } = useSelector((state) => state.home);

  const skeleton = () => {
    return (
      <div className="skeletonItem  shrink-0  w-36 md:w-40 lg:w-44 xl:w-48 space-y-3 ">
        <div className="circle w-[125px] h-[125px] md:w-[175px] md:h-[175px] rounded-full skeleton"></div>
        <div className="row  w-full h-5 rounded-xl skeleton"></div>
        <div className="row2 w-[75%] h-5 rounded-xl skeleton"></div>
      </div>
    );
  };

  return (
    <div className="castSection  z-50  relative mt-8">
      <ContentWrapper>
        <h3 className="text-3xl mb-5">Top Cast</h3>
        {!loading ? (
          <div className="listItems flex  overflow-y-hidden gap-5 -mx-5 px-5 md:px-0  md:mx-0">
            {data?.map((item) => {
              let imgUrl = item.profile_path
                ? url.profile + item.profile_path
                : avatar;
              return (
                <div
                  className="listItemmmm text-center   text-white"
                  key={item.id}
                >
                  <div className="profileImage  mb-3 w-[125px] h-[125px] md:w-[175px] md:h-[175px]  overflow-hidden  rounded-full  ">
                    <Img src={imgUrl} className="   object-top  block    " />
                  </div>
                  <span className="text-sm font-semibold md:text-lg block">
                    {item.name}
                  </span>
                  <span className="text-sm md:text-lg opacity-80">
                    {" "}
                    {item.character}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton flex gap-8 overflow-y-hidden  mb-8 -mx-5 px-5 md:px-0  md:mx-0">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}

            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
}

export default Cast;
