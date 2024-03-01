import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function CircleRating({ rating, className, pathColor }) {
  return (
    <div className={`circleRating   ${className}`}>
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={rating}
        styles={buildStyles({
          pathColor:
            rating < 5 ? "red" : rating < 7 ? "orange" : `${pathColor}`,
        })}
      />
    </div>
  );
}

export default CircleRating;
