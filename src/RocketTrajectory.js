import _ from "lodash";
import React from "react";
import Rocket from "./Rocket";
import { getInterpolatedTrajectory } from "./kinematics";
const x = -2;
class RocketTrajectory extends React.Component {
  state = {
    cg: this.props.cg0,
    rotation: this.props.rotation0
  };

  trajectoryId = null;

  transitAlong = trajetory => {
    const { fps } = this.props;
    const nextLocation = trajetory[0];

    if (nextLocation) {
      this.setState({
        cg: nextLocation.cg,
        rotation: nextLocation.rotation
      });
      this.trajectoryId = setTimeout(
        () => this.transitAlong(trajetory.filter((t, ix) => ix > 0)),
        1000 / (fps - x)
      );
    }
  };

  componentDidUpdate = prevProps => {
    if (!_.isEqual(prevProps, this.props)) {
      const { cg0, rotation0, cg1, rotation1, time, fps } = this.props;
      clearTimeout(this.trajectoryId);
      const trajectory = getInterpolatedTrajectory({
        cg0,
        rotation0,
        cg1,
        rotation1,
        steps: Math.max(Math.floor(fps * time) - 2, 0)
      });
      this.transitAlong(trajectory);
    }
  };

  render() {
    const { cg, rotation } = this.state;
    return <Rocket cg={cg} rotation={rotation} />;
  }
}

export default RocketTrajectory;
