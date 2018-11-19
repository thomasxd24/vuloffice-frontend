import React from "react";
import Typography from "@material-ui/core/Typography";
import { Grid, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class FormImport extends React.Component {
  state = {
    value: 0,
    files: ""
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.files
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container direction="column"  style={{ padding: 20 }}>
        <Grid item>
          <Typography variant="subheading">
            Sectionner un fichier pour charger{" "}
          </Typography>
        </Grid>{" "}
        <Grid item>
          <input
            accept="image/*"
            className={classes.input}
            id="raised-button-file"
            multiple
            type="file"
            onChange={this.handleChange("files")}
          />{" "}
          <label htmlFor="raised-button-file">
            <Button
              raised
              component="span"
              variant="contained"
              className={classes.button}
              color="secondary"
            >
              Parcourir{" "}
            </Button>{" "}
          </label>{" "}
          <Typography
            variant="overline"
            style={{
              display: "inline-block"
            }}
          >
            {" "}
            {this.state.files[0] ? this.state.files[0].name : ""}{" "}
          </Typography>{" "}
          <Typography variant="caption">
            Format accepté: * .xlsx * .csv{" "}
          </Typography>{" "}
        </Grid>{" "}
        <Grid item>
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            disabled={!this.state.files}
          >
            Charger{" "}
          </Button>{" "}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(FormImport);
