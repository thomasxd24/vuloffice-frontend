import React,{ Component } from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Picker from "react-month-picker";
import fileDownload from 'js-file-download';
import SnackBar from '../util/SnackBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
    alignItems: 'left',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class FormRapport extends React.Component {
  state = {
    value: 0,
    year: "2018",
    month: "11",
    site: "toutdeco",
    isLoading: false,
  };


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  

  handleSubmit = () => {
    fetch("/api/rapports/send?siteName=toutdeco&month=11&year=2018")
    .then(response => response.blob())
    .then(blob => fileDownload(blob, 'test.xlsx'))
    .then(() => this.handleDoneLoading());
    this.handleLoading();
  }

  handleLoading = () => {
    this.setState(
      {
        isLoading : true
      }
    )
  }

  handleDoneLoading = () => {
    this.setState(
      {
        isLoading : false
      },this.child.handleClick("Génération de rapport avec succes","success")
    )
  }


  render() {
    const { classes } = this.props;
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const year = [2018,2019,2020,2021,2022,2023];
    return (
      <Grid container direction="column" style={{ padding: 20 }}>
      <SnackBar onRef={ref => (this.child = ref)} />
        <Grid item>
          <TextField
            id="site"
            select
            label="Site"
            className={classes.textField}
            value={this.state.site}
            onChange={this.handleChange("site")}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            margin="normal"
          >
            <MenuItem key="0" value="toutdeco">
              Toutdeco
            </MenuItem>
            <MenuItem key="1" value="destockage">
              Destockage - Discount
            </MenuItem>
            <MenuItem key="1" value="amazon">
              Amazon
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            id="month"
            select
            label="Mois"
            className={classes.textField}
            value={this.state.month}
            onChange={this.handleChange("month")}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            margin="normal"
          >
          {months.map((item,index) => (
            <MenuItem key={index+1} value={index+1}>
            {item}
            </MenuItem>
          ))}
            
            
          </TextField>
        </Grid>{" "}
        <Grid item>
          <TextField
            id="year"
            select
            label="Mois"
            className={classes.textField}
            value={this.state.year}
            onChange={this.handleChange("year")}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            margin="normal"
          >
          {year.map((item,index) => (
            <MenuItem key={index} value={item}>
            {item}
            </MenuItem>
          ))}
            
            
          </TextField>
        </Grid>{" "}
        <Grid item>
        <div className={classes.root}>
        <div className={classes.wrapper}>
        <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
            disabled={this.state.isLoading}
            onClick={this.handleSubmit}
          >
            Générer
            
          </Button>{" "}
          {this.state.isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
        </div>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(FormRapport);
