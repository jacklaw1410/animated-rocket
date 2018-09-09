import React from "react";
import rocket from "./rocket.png";

export default props => {
  const {
    cg: { x, y },
    rotation,
    fps
  } = props;

  return (
    <img
      src={rocket}
      style={{
        width: "auto",
        height: 80,
        position: "absolute",
        bottom: -40 + y,
        left: 0 + x,
        transform: `rotate(${rotation}deg)`,
        // transition: `all ${1 / fps}s linear`
        // transform: `rotate(${rotation}deg) translate(${x}px, ${300 - y}px)`,
        // transition: `transform 1s linear, bottom ${1 / fps}s linear, left ${1 /
        //   fps}s linear`
        transition: `all ${1 / fps}s linear`
      }}
      alt="rocket"
    />
  );
};
