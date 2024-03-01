import { useState } from "react";
import ContentWrapper from "./ContentWrapper";
import VideoPopup from "./VideoPopup";
import Img from "./Img";
import PlayBtn from "./PlayBtn";

function VideoSection({ data, loading }) {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const skeleton = () => {
    return (
      <div className="skeletonItem  shrink-0   space-y-3 ">
        <div className="circle w-[150px] h-[100px] md:w-[200px] md:h-[175px] rounded-md skeleton"></div>
        <div className="row  w-full md:md:w-[200px] h-5 rounded-xl skeleton"></div>
      </div>
    );
  };

  return (
    <div className="videoSection  z-50  relative mt-8">
      <ContentWrapper>
        {data?.results?.length > 0 && (
          <h3 className="text-3xl mb-5">Official Videos</h3>
        )}
        {!loading ? (
          <div className="videos flex  gap-3 overflow-x-auto md:gap-5  -mx-5 px-5 md:px-0  md:mx-0">
            {data?.results?.map((item) => {
              return (
                <div
                  className="videoItem w-[150px] shrink-0 md:w-[25%]"
                  key={item.id}
                  onClick={() => {
                    setVideoId(item.key);
                    setShow(true);
                  }}
                >
                  <div className="videoThumbnail relative mb-5">
                    <Img
                      src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`}
                      className="rounded-md"
                    />
                    <PlayBtn className="playbtn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12" />
                  </div>
                  <div className="title text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.name}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="videoSkeleton flex gap-8 overflow-y-hidden  mb-8 -mx-5 px-5 md:px-0  md:mx-0">
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
      <VideoPopup
        videoId={videoId}
        setVideoId={setVideoId}
        show={show}
        setShow={setShow}
      />
    </div>
  );
}

export default VideoSection;
