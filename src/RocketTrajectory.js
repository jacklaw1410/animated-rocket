import _ from "lodash";
import React from "react";
import Rocket from "./Rocket";
import { getInterpolatedTrajectory } from "./kinematics";

class RocketTrajectory extends React.Component {
  state = {
    cg: this.props.cg0,
    rotation: this.props.rotation0
  };

  trajectoryId = null;

  transitAlong = trajetory => {
    const { time, fps } = this.props;
    const nextLocation = trajetory.shift(0);
    // console.log("along", trajetory);
    // console.log("next", nextLocation);

    if (nextLocation) {
      this.setState({
        cg: nextLocation.cg,
        rotation: nextLocation.rotation
      });
      this.trajectoryId = setTimeout(
        () => this.transitAlong(trajetory),
        1000 / fps
      );
    }
  };

  componentDidUpdate = prevProps => {
    if (!_.isEqual(prevProps, this.props)) {
      const { cg0, rotation0, cg1, rotation1, time, fps } = this.props;
      clearTimeout(this.trajectoryId);
      // this.startTrajectory(this.props);
      const trajectory = getInterpolatedTrajectory({
        cg0,
        rotation0,
        cg1,
        rotation1,
        steps: Math.floor(fps * time) - 2
      });
      // console.log(Math.floor(fps * time) - 2, trajectory.length, trajectory);
      this.transitAlong(trajectory);
    }
  };

  render() {
    // const { cg0, rotation0, cg1, rotation1 } = this.props;
    const { cg, rotation } = this.state;
    return <Rocket cg={cg} rotation={rotation} />;
  }
}

export default RocketTrajectory;
