import React from "react";
import Iframe from "react-iframe";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import CopyText from "react-copy-text";

function DetailItem(props) {
  return (
    <ListItemText>
      <Grid
        direction="row"
        container
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item xs={4}>
          {props.name}
        </Grid>
        <Grid item xs={8}>
          {props.value}
        </Grid>
      </Grid>
    </ListItemText>
  );
}

export default class ResultExpedition extends React.Component {
  state = {
    shippingNumber: this.props.detailOrder.trackingNumber, //this.props.detailOrder.shippingNumber
    site: this.props.detailOrder.site, //this.props.detailOrder.data.site
    orderID:  this.props.detailOrder.orderID, //this.props.detailOrder.orcerID
    source:"Amazon", //this.props.detailOrder.source
    nbColi:"3", //this.props.detailOrder.nbColi
    cout:"8", //this.props.detailOrder.cout
    pdfBase64:`data:application/pdf;base64,`+ this.props.detailOrder.pdfBase64,

  };

  copyText(text) {
    this.setState({ copyText: this.state.shippingNumber });
  }


  render() {
    return (
      <Grid
        container
        spacing={24}
        direction="row"
        justify="space-around"
        alignItems="stretch"
        style={{ height: "80vh" }}
      >
        <Grid item xs>
          <Paper>
            <Grid style={{ padding: 50 }} container direction="column">
              <Grid item style={{ "padding-bottom": 10 }}>
                <Button variant="fab" color="primary" onClick={this.props.onOrder}>
                  <KeyboardArrowLeft />
                </Button>
              </Grid>
              <Grid item>
                <Typography variant="headline">
                  Détail de l'expedition
                </Typography>
              </Grid>
              <List>
                <ListItem divider>
                  <DetailItem name="Site" value="Toutdeco" />
                </ListItem>
                <ListItem divider>
                  <DetailItem
                    name="Numéro de la commande"
                    value={<a href="http://google.com">{this.state.orderID}</a>}
                  />
                </ListItem>
                <ListItem divider>
                  <DetailItem
                    name="Source"
                    value={this.state.source}
                  />
                </ListItem>
                <ListItem divider>
                  <DetailItem name="Nombre de Coli" value={this.state.nbColi} />
                </ListItem>
                <ListItem divider>
                  <DetailItem name="Cout Total" value={this.state.cout} />
                </ListItem>
                <ListItem style={{whiteSpace: 'normal'}}>
                  <DetailItem
                    name="Numéro de suivi"
                    value={this.state.shippingNumber}
                  />
                  <ListItemSecondaryAction>
                    <div>
                      <Button variant="contained"
                        onClick={() =>
                          this.setState({ copyText: this.state.shippingNumber })
                        }
                      >
                        Copier
                      </Button>
                      <CopyText text={this.state.copyText} />
                    </div>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs>
          <Iframe
            url={this.state.pdfBase64}
            width="100%"
            height="100%"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
            allowFullScreen
          />
        </Grid>
      </Grid>
    );
  }
}

//   <Typography paragraph>
//   Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
//   facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
//   tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
//   consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
//   vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
//   hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
//   tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
//   nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
//   accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
// </Typography>
