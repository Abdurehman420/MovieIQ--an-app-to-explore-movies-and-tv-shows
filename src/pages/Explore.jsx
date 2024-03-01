import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../utilities/api";
import ContentWrapper from "../components/ContentWrapper";
import Select from "react-select";
import { SyncLoader } from "react-spinners";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../components/MovieCard";

let filters = {};

const soryByData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  { value: "primary_release_date.desc", label: "Release Date Descending" },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
  const [data, setdata] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [genre, setGenre] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const { mediaType } = useParams();

  const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

  const fetchInitialData = () => {
    setIsLoading(true);
    fetchDataFromApi(`/discover/${mediaType}`, filters).then((res) => {
      setdata(res);
      setPageNum((prev) => prev + 1);
      setIsLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`, filters).then(
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

  useEffect(() => {
    filters = {};
    setdata(null);
    setSortBy(null);
    setGenre(null);
    setPageNum(1);
    fetchInitialData();
  }, [mediaType]);

  const onChange = (selectedItems, action) => {
    if (action.name === "sortby") {
      setSortBy(selectedItems);
      if (action.action !== "clear") {
        filters.sort_by = selectedItems.value;
      } else {
        delete filters.sort_by;
      }
    }

    if (action.name === "genres") {
      setGenre(selectedItems);
      if (action.action !== "clear") {
        let genreId = selectedItems.map((g) => g.id);
        genreId = JSON.stringify(genreId).slice(1, -1);
        filters.with_genres = genreId;
      } else {
        delete filters.with_genres;
      }
    }
    setPageNum(1);
    fetchInitialData();
  };

  return (
    <div className="explorePage pt-24">
      <ContentWrapper>
        <div className="pageHeader flex flex-col md:flex-row md:justify-between md:items-center ">
          <h2 className=" text-2xl  mb-5 md:mb-0">
            {mediaType === "tv" ? "Explore TV Shows" : "Explore Movies"}
          </h2>
          <div className="filters  flex  flex-col md:flex-row  md:items-center gap-3">
            <Select
              isMulti
              name="genres"
              value={genre}
              closeMenuOnSelect={false}
              options={genresData?.genres}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              onChange={onChange}
              placeholder="Select Genres"
              className="react-select-container genresS w-full md:max-w-[500px]  md:min-w-[250px]"
              classNamePrefix="react-select"
            />
            <Select
              name="sortby"
              value={sortBy}
              closeMenuOnSelect={false}
              options={soryByData}
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.id}
              onChange={onChange}
              placeholder="Sort by"
              className="react-select-container  sortbyS w-full shrink-0  md:w-[250px]"
              classNamePrefix="react-select"
            />
          </div>
        </div>
        {isLoading && (
          <div className="spinner flex justify-center items-center h-[70vh]">
            <SyncLoader color=" #00BFFF" size={25} />
          </div>
        )}
        {!isLoading && (
          <>
            {data?.results?.length > 0 ? (
              <InfiniteScroll
                className=" content flex flex-wrap    gap-[10px] md:gap-5 mt-10 "
                dataLength={data?.results.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= data?.total_pages}
                loader={
                  <div className="spinner flex justify-center items-center w-full py-5">
                    <SyncLoader color=" #00BFFF" size={25} />
                  </div>
                }
              >
                {data?.results?.map((item, i) => {
                  if (item.media_type === "person") return;
                  return (
                    <MovieCard
                      item={item}
                      endpoint={mediaType}
                      key={i}
                      fromSearch={false}
                    />
                  );
                })}
              </InfiniteScroll>
            ) : (
              <h2 className="text-2xl text-center">No result found</h2>
            )}
          </>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Explore;
