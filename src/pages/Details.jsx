import { useParams } from "react-router-dom";
import DetailsContainer from "../components/DetailsContainer";
import useFetch from "../hooks/useFetch";
import Cast from "../components/Cast";
import VideoSection from "../components/VideoSection";
import Similar from "../components/carousels/Similar";
import Recommended from "../components/carousels/Recommended";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data, isLoading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, isLoading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );

  return (
    <div className="Details">
      <DetailsContainer video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideoSection data={data} loading={isLoading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommended mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
