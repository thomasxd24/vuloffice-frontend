import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid, withStyles, AppBar } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormImport from '../expedition/FormImport';
import FormOrder from '../expedition/FormOrder';
import ResultExpedition from '../expedition/ResultExpedition';
import { CSSTransition } from 'react-transition-group';
import ProblemAddress from '../expedition/ProblemAddress';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.primary,
  },
});

class Expedition extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    value: 0,
    shippingNumber:"",
    orderInfo: {}
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  goShip (data) {
    this.setState({ data: data });
  }

  goProblemAdd (address) {
    this.setState({ data: address });
  }

  goOrder () {
    this.setState({ data: null });
  }


    render() {
      const {value} = this.state

      var elementRender;
      if(this.state.data)
      {
        // if(this.state.data.trackingNumber) elementRender = <ResultExpedition  className="fade-enter fade-enter-active" detailOrder={this.state.data} onOrder={this.goOrder.bind(this)} />;
        if(this.state.data.trackingNumber) elementRender = <ProblemAddress className="fade-enter fade-enter-active" detailAddress={this.state.data} onOrder={this.goOrder.bind(this)} />
        
      }
      else
      {
        elementRender = 
<Grid container direction="column">
        
        <Grid item>
        <Typography component="h2" variant="display2">
        Expédition
        </Typography>
        </Grid>
        <Grid item>
        <AppBar position="static" style={{'margin-top':'10px'}}>
        <Tabs value={value} onChange={this.handleChange} >
            <Tab label="Commande" />
            <Tab label="Importer" />
          </Tabs>
        </AppBar>
        
        </Grid>
        <Grid item>
        {value === 0 && <FormOrder onShip={this.goShip.bind(this)}/>}
        {value === 1 && <FormImport  />}
        </Grid>
        </Grid>
        
      }

      return (<CSSTransition transitionName="fade" timeout={{ enter: 300, exit: 300 }}>{elementRender}</CSSTransition>);
      
    }
  }

  export default withStyles(styles)(Expedition)