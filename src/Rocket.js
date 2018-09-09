import React from "react";
import rocket from "./rocket.png";

export default props => {
  const {
    cg: { x, y },
    rotation
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
        transform: `rotate(${rotation}deg)`
      }}
      alt="rocket"
    />
  );
};
