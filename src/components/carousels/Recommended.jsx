import useFetch from "../../hooks/useFetch";
import Carousel from "../Carousel";

function Recommended({ mediaType, id }) {
  const { data, isLoading } = useFetch(`/${mediaType}/${id}/recommendations`);

  return (
    <Carousel
      data={data?.results}
      loading={isLoading}
      title="Recommendations"
      endpoint={mediaType}
      className="!px-0"
    />
  );
}

export default Recommended;
