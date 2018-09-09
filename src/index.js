import React from "react";
import ReactDOM from "react-dom";
import RocketTrajectroy from "./RocketTrajectory";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { getParametersAfterDrift } from "./kinematics";
import "./styles.css";

const DPS = 1;
const FPS = 60;

const CG0 = {
  x: 400 - 23,
  y: 40
};
const ROTATION0 = 0;

const INIT_STATE = {
  cg0: CG0,
  rotation0: ROTATION0,
  cg1: CG0,
  rotation1: ROTATION0
};

const speedMapping = {
  nil: 0,
  l: 5,
  m: 10,
  h: 50,
  insane: 1000
};

const rotationMapping = {
  nil: 0,
  l: 5,
  m: 15,
  h: 90,
  insane: 180
};

class App extends React.Component {
  state = {
    ...INIT_STATE,
    speedLevel: "m",
    rotationLevel: "m"
  };

  driftId = null;

  drift = () => {
    this.setState(
      ({ cg1: cg0, rotation1: rotation0, speedLevel, rotationLevel }) => {
        const speed = speedMapping[speedLevel] / DPS;
        const rotationAmplitude = rotationMapping[rotationLevel] / DPS;

        const { cg1, rotation1 } = getParametersAfterDrift({
          cg0,
          rotation0,
          speed,
          rotationAmplitude
        });

        return {
          cg0,
          rotation0,
          cg1,
          rotation1
        };
      }
    );
    this.driftId = setTimeout(this.drift, 1000 / DPS);
  };

  launch = () => this.drift();

  stop = () => {
    clearTimeout(this.driftId);
    this.driftId = null;
    this.setState({});
  };

  reset = () => {
    this.stop();
    this.setState(INIT_STATE);
  };

  handleLevelChange = name => event => {
    const { target } = event;
    this.setState({
      [name]: target.value
    });
  };
  render() {
    const {
      cg0,
      rotation0,
      cg1,
      rotation1,
      speedLevel,
      rotationLevel
    } = this.state;
    return (
      <Grid container direction="column" spacing={40} style={{ width: 800 }}>
        <Grid item container spacing={16}>
          <Grid item>
            <TextField
              label="Speed"
              select
              value={speedLevel}
              onChange={this.handleLevelChange("speedLevel")}
            >
              <MenuItem value="nil">Freezeeeeee</MenuItem>
              <MenuItem value="l">Low</MenuItem>
              <MenuItem value="m">Middle</MenuItem>
              <MenuItem value="h">High</MenuItem>
              <MenuItem value="insane">Let's rock!</MenuItem>
            </TextField>
          </Grid>
          <Grid item>
            <TextField
              label="Drifting"
              select
              value={rotationLevel}
              onChange={this.handleLevelChange("rotationLevel")}
            >
              <MenuItem value="nil">Freezeeeeee</MenuItem>
              <MenuItem value="l">Low</MenuItem>
              <MenuItem value="m">Middle</MenuItem>
              <MenuItem value="h">High</MenuItem>
              <MenuItem value="insane">Let's rock!</MenuItem>
            </TextField>
          </Grid>
          <Grid item>
            {this.driftId ? (
              <Button variant="contained" onClick={this.stop}>
                Stop {this.driftId}
              </Button>
            ) : (
              <Button variant="contained" onClick={this.launch}>
                Launch
              </Button>
            )}
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={this.reset}>
              Reset
            </Button>
          </Grid>
        </Grid>

        <Grid
          item
          container
          style={{
            position: "relative",
            border: "solid 2px #c7c7c7",
            height: 300
          }}
        >
          <RocketTrajectroy
            cg0={cg0}
            rotation0={rotation0}
            cg1={cg1}
            rotation1={rotation1}
            time={1 / DPS}
            fps={FPS}
          />
        </Grid>
      </Grid>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
