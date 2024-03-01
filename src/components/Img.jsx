import LazyLoad from "react-lazy-load";

const Img = ({ src, className }) => {
  return (
    <LazyLoad>
      <img
        src={src}
        className={` w-full h-full object-cover object-center ${className} `}
        alt=""
      />
    </LazyLoad>
  );
};

export default Img;
