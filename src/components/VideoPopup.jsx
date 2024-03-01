import ReactPlayer from "react-player";

function VideoPopup({ show, setShow, videoId, setVideoId }) {
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };

  return (
    <div
      className={`videoPopup flex justify-center items-center w-full h-full fixed top-0 left-0 opacity-0 invisible  z-[50000]  ${
        show ? "visible" : ""
      }`}
    >
      <div
        className="opacityLayer absolute top-0 left-0 w-full h-full  bg-black/10 backdrop-blur-sm opacity-0  duration-300 "
        onClick={hidePopup}
      ></div>
      <div className="videoPlayer relative w-[800px] aspect-[16/9]  scale-[.2] duration-200 p-5 md:p-0">
        <span
          className="closeBtn absolute -top-3 md:-top-8  right-4  md:right-0   text-xl text-white cursor-pointer"
          onClick={hidePopup}
        >
          Close
        </span>
        <ReactPlayer
          controls
          width="100%"
          height="100%"
          url={`https://www.youtube.com/watch?v=${videoId}  `}
        />
      </div>
    </div>
  );
}

export default VideoPopup;
