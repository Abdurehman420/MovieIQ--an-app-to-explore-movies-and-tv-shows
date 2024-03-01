import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import ContentWrapper from "./ContentWrapper";
import MovieCard from "./MovieCard";

function Carousel({ data, loading, endpoint, title, className }) {
  const carouselContainer = useRef();
  const [isScrolledLeft, setIsScrolledLeft] = useState(true);
  const [isScrolledRight, setIsScrolledRight] = useState(false);

  const navigation = (dir) => {
    const container = carouselContainer.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    console.log(container.scrollLeft);
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = carouselContainer.current;
    const handleScroll = () => {
      setIsScrolledLeft(container.scrollLeft === 0);
      setIsScrolledRight(
        container.scrollLeft + container.clientWidth === container.scrollWidth
      );
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const skItem = () => {
    return (
      <div className="skeletonItem  shrink-0  w-36 md:w-40 lg:w-44 xl:w-48">
        <div className="posterBlock w-full relative bg-cover bg-center flex items-end justify-between   mb-7 aspect-[1/1.5] skeleton"></div>
        <div className="text flex  flex-col  gap-[2px]">
          <div className="title text-md h-3 mb-3 lg:text-xl  rounded-xl skeleton"></div>
          <div className="date  opacity-50  h-2 w-[75%] rounded-xl text-sm lg:text-md skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className=" mb-12">
      <ContentWrapper className="relative">
        {title && <h2 className="text-3xl   mb-5 mt-10">{title}</h2>}
        {!isScrolledLeft && (
          <BsFillArrowLeftCircleFill
            className={`carouselLeftArrow absolute left-12 top-[35%] text-lightBlue z-10 cursor-pointer text-3xl opacity-70  hover:opacity-90 `}
            onClick={() => navigation("left")}
          />
        )}
        {!isScrolledRight && (
          <BsFillArrowRightCircleFill
            className={`carouselRightArrow absolute right-12 top-[35%] text-lightBlue z-10 cursor-pointer text-3xl opacity-70  hover:opacity-90  `}
            onClick={() => navigation("right")}
          />
        )}
        {!loading ? (
          <div
            ref={carouselContainer}
            className={`carouselItems flex    m-0 p-0  overflow-x-scroll md:overflow-y-hidden md:px-5   gap-[10px] lg:gap-5  ${className}`}
          >
            {data?.map((item) => {
              return (
                <MovieCard item={item} endpoint={endpoint} key={item.id} />
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton flex    m-0 p-0 overflow-hidden md:overflow-y-hidden md:px-5   gap-[10px] lg:gap-5">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
}

export default Carousel;
