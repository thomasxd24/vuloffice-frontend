import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import SnackBar from '../util/SnackBar';



const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
      },
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

class ProblemAddress extends React.Component {
  state = {
    value: 0,
    orderID: "",
    site: "toutdeco",
    loading: false,
    petitColi: false,
      noPrep: false,
      comment:""
  };


  handleButtonClick = () => {
    var state = this.state
    var query = {
      siteName:state.site,
      orderID:state.orderID,
      comment:state.comment,
      petitColi:state.petitColi,
      noPrep:state.noPrep
    }
    if (!this.state.loading) {
      var options = "";
      this.setState(
        {
          success: false,
          loading: true,
        },
        () => {
          if(query.petitColi) options = options + "&petitColi=true"
          if(query.noPrep) options = options + "&noPrep=true"
          fetch(`/api/expedition/send?siteName=${query.siteName}&orderID=${query.orderID}&comment=${query.comment}${options}`)
      .then(response => response.json())
      .then((json) => {
        if(!json.error)
        {
          this.setState(
            {
              success: true,
              loading: false,
            });
          console.log(json.data);
          this.props.onShip(json.data)
        }
        else
        {
          this.setState(
            {
              success: false,
              loading: false,
            },this.child.handleClick("Une erreur est survenue: "+json.data,"error"));
            
        }
        
      });
        },
      );
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleCheckboxChange = name => event => {
    this.setState({
      [name.name]: !name.value
    });
  };

  render() {
    const { loading, success } = this.state;
    const { classes } = this.props;
    return (
      <Grid container direction="column" style={{ padding: 20 }}>
        <Grid item>
        <Typography component="h2" variant="display2">
        Expédition
        </Typography>
        </Grid>
        <Grid item>
          <TextField
            id="orderID"
            label="Numéro de la commande"
            className={classes.textField}
            value={this.state.orderID}
            onChange={this.handleChange("orderID")}
            margin="normal"
            autoComplete="off"
          />
        </Grid>
        <Grid item>
          <TextField
            id="comment"
            label="Commentaire"
            multiline
            rows="4"
            className={classes.textField}
            onChange={this.handleChange("comment")}
            margin="normal"
          />
        </Grid>{" "}
        <Grid item>
          <FormControlLabel
            value="left"
            control={
              <Checkbox
                checked={this.state.petitColi}
                onChange={this.handleCheckboxChange({name:"petitColi",value:this.state.petitColi})}
                value="true"
                color="primary"
              />
            }
            label="Forcer Petit Coli"
            labelPlacement="left"
          />
        </Grid>{" "}
        <Grid item>
          <FormControlLabel
            value="left"
            control={
              <Checkbox
                checked={this.state.noPrep}
                onChange={this.handleCheckboxChange({name: "noPrep", value: this.state.noPrep})}
                value="true"
                color="primary"
              />
            }
            label="Ne pas mettre en Preparation en cours (Dev mode)"
            labelPlacement="left"
          />
        </Grid>{" "}
        <Grid item>
        <div className={classes.root}>
        <div className={classes.wrapper}>
        <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
            disabled={loading}
            onClick={this.handleButtonClick}
          >
            Générer
            
          </Button>{" "}
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
        </div>
        
          
        </Grid>{" "}
      </Grid>
    );
  }
}

export default withStyles(styles)(ProblemAddress);
