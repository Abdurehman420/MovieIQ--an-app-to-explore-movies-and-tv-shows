import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utilities/api";
import { SyncLoader } from "react-spinners";
import ContentWrapper from "../components/ContentWrapper";
import MovieCard from "../components/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";

const SearchResults = () => {
  const [data, setdata] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  const { query } = useParams();

  const fetchInitialData = () => {
    setIsLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setdata(res);
        setPageNum((prev) => prev + 1);
        setIsLoading(false);
      }
    );
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setdata({
            ...data,
            results: [...data.results, ...res.results],
          });
        } else {
          setdata(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };
  console.log(data);

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className=" searchResultsPage pt-24">
      {isLoading && (
        <div className="spinner flex justify-center items-center h-[70vh]">
          <SyncLoader color=" #00BFFF" size={25} />
        </div>
      )}
      {!isLoading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle text-2xl">
                {`Search ${data.total_results > 1 ? "Results" : "Result"}
                results of '${query}'`}
              </div>
              <InfiniteScroll
                className=" content flex flex-wrap justify-center   gap-[10px] md:gap-5 mt-10 "
                dataLength={data?.results.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={
                  <div className="spinner flex justify-center items-center w-full py-5">
                    <SyncLoader color=" #00BFFF" size={25} />
                  </div>
                }
              >
                {data?.results.map((item) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard
                      item={item}
                      key={item.id}
                      posterBlockclassName="mb-[10px]"
                      dateClassName="!mt-[2px]"
                      fromSearch={true}
                    />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className=" text-2xl">Sorry, Results not found!</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default SearchResults;
