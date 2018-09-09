import React from "react";
import Rocket from "./Rocket";

class RocketTrajectory extends React.Component {
  render() {
    const { cg0, rotation0, cg1, rotation1 } = this.props;
    console.log({ cg0, rotation0, cg1, rotation1 });
    return <Rocket cg={cg1} rotation={rotation1} />;
  }
}

export default RocketTrajectory;
