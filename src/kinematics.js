export const getParametersAfterDrift = ({
  cg0,
  rotation0,
  speed,
  rotationAmplitude
}) => {
  const randomNumber = 2 * Math.random() - 1;
  return {
    cg1: {
      x: cg0.x + speed * Math.sin((rotation0 / 180) * Math.PI),
      y: cg0.y + speed * Math.cos((rotation0 / 180) * Math.PI)
    },
    rotation1: (rotation0 + rotationAmplitude * randomNumber) % 360
  };
};

export const getInterpolatedTrajectory = ({
  cg0,
  rotation0,
  cg1,
  rotation1,
  steps = 0
}) => {
  return [
    {
      cg: cg0,
      rotation: rotation0
    },
    ...Array.from(Array(steps).keys()).map(ix => {
      const factor = (ix + 1) / (steps + 1);
      return {
        cg: {
          x: cg0.x + (cg1.x - cg0.x) * factor,
          y: cg0.y + (cg1.y - cg0.y) * factor
        },
        rotation: rotation0 + (rotation1 - rotation0) * factor
      };
    }),
    {
      cg: cg1,
      rotation: rotation1
    }
  ];
};
