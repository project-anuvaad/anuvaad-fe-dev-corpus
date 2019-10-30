import React from "react";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import NewCorpusStyle from "../../../styles/web/Newcorpus";
import Typography from "@material-ui/core/Typography";
import StarRatingComponent from "react-star-rating-component";

class Grader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            names: ""
        };
    }

    componentDidMount() {
        this.setState({ showLoader: true });
    }

    onMeaningStarClick(nextValue, prevValue, name) {
        console.log(name);
        this.setState({ [name]: nextValue });
        console.log(this.state.meaning);
    }

    onStructureStarClick(nextValue, prevValue, name) {
        console.log(name);
        this.setState({ [name]: nextValue });
        console.log(this.state.meaning);
    }

    onVocabularyStarClick(nextValue, prevValue, name) {
        console.log(name);
        this.setState({ [name]: nextValue });
        console.log(this.state.meaning);
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <Grid container spacing={4} style={{ padding: "20px" }}>
                    <Grid item xs={12} sm={12} lg={12} xl={12} style={{}}>
                        <Typography variant="h6" color="inherit">
                            <b>
                                {this.props.title}
                            </b>
                        </Typography>
                    </Grid>

                    <Grid container>

                        <Grid item xs={12} sm={12} lg={9} xl={9} style={{ flex: 1, marginTop: "20px", marginBottom: "20px" }}>
                            <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
                                {this.props.description}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={3} xl={3}>
                        </Grid>
                    </Grid>


                    <Grid container>
                        <Grid item xs={12} sm={12} lg={8} xl={8} style={{ flex: 1 }}>
                            <Typography variant="h6" color="inherit" style={{ flex: 1, marginTop: "20px" }}>
                                Meaning of sentence:
                        </Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} lg={4} xl={4} style={{ flex: 1, textAlign: "right" }}>
                            <h1>
                                <StarRatingComponent name={this.props.meaning} starCount={5} value={this.state.meaning} onStarClick={this.onMeaningStarClick.bind(this)} />
                            </h1>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={12} sm={12} lg={8} xl={8} style={{ flex: 1 }}>
                            <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
                                Structure/Grammar of Sentence:
                        </Typography>
                        </Grid>


                        <Grid item xs={12} sm={12} lg={4} xl={4} style={{ flex: 1, textAlign: "right" }}>
                            <h1>
                                <StarRatingComponent name={this.props.structure} starCount={5} value={this.state.structure} onStarClick={this.onStructureStarClick.bind(this)} />
                            </h1>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={12} sm={12} lg={8} xl={8} style={{ flex: 1 }}>
                            <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
                                Vocabulary / Lexicon:
                        </Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} lg={4} xl={4} style={{ flex: 1, textAlign: "right" }}>
                            <h1>
                                <StarRatingComponent name={this.props.vocabulary} starCount={5} value={this.state.vocabulary} onStarClick={this.onVocabularyStarClick.bind(this)} />
                            </h1>
                        </Grid>
                    </Grid>

                </Grid>
            </div >
        );
    }
}

export default withRouter(
    withStyles(NewCorpusStyle)(
      (Grader)
    )
);
