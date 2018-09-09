import React from "react";
import ReactDOM from "react-dom";
import Rocket from "./Rocket";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { getParametersAfterDrift } from "./kinematics";
import "./styles.css";

const FPS = 5;
const INIT_STATE = {
  cg: {
    x: 400 - 56,
    y: 40
  },
  rotation: 0,
  speedLevel: "m",
  rotationLevel: "m"
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
  l: 10,
  m: 60,
  h: 90,
  insane: 180
};

class App extends React.Component {
  state = INIT_STATE;

  driftId = null;

  drift = () => {
    this.setState(({ cg, rotation, speedLevel, rotationLevel }) => {
      const params = getParametersAfterDrift({
        cg,
        rotation,
        speed: speedMapping[speedLevel],
        rotationAmplitude:
          rotationMapping[rotationLevel] * (this.driftId % FPS === 0)
      });

      // console.log(params);
      return params;
    });
    this.driftId = setTimeout(this.drift, 1000 / FPS);
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
    const { cg, rotation, speedLevel, rotationLevel } = this.state;
    return (
      <Grid contatiner direction="column" spacing={40} style={{ width: 800 }}>
        <Grid
          item
          container
          spacing={16}
          style={{ marginTop: 32, marginBottom: 32 }}
        >
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
          <Rocket cg={cg} rotation={rotation} fps={FPS} />
        </Grid>
      </Grid>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
