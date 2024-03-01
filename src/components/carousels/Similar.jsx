import useFetch from "../../hooks/useFetch";
import Carousel from "../Carousel";

function Similar({ mediaType, id }) {
  const { data, isLoading } = useFetch(`/${mediaType}/${id}/similar`);
  const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

  return (
    <Carousel
      data={data?.results}
      loading={isLoading}
      title={title}
      endpoint={mediaType}
      className="!px-0"
    />
  );
}

export default Similar;
