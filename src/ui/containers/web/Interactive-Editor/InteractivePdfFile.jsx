import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import APITransport from "../../../../flux/actions/apitransport/apitransport";
import { withRouter } from "react-router-dom";
import SourceView from "./PdfFileEditor";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
class Preview extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
       
        return (
            <Grid container spacing={16} style={{ padding: "0 24px 0px 24px" }}>
                <Grid item xs={12} sm={6} lg={4} xl={4} className="GridFileDetails">
               
                <SourceView/>
                
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={4} className="GridFileDetails">
                
               <SourceView/>
               
               </Grid>
               </Grid>
              
            
        );
    }
}

const mapStateToProps = state => ({
    fetchPdfSentence: state.fetchPdfSentence
  });
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        APITransport
      },
      dispatch
    );
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Preview));
