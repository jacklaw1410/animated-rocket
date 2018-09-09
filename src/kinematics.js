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
    rotation1: rotation0 + rotationAmplitude * randomNumber
  };
};
