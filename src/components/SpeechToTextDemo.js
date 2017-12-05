import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import SpeechToText from 'speech-to-text';

const styles = theme => ({
  root: {
    paddingTop: 65
  },
  paper: theme.mixins.gutters({
    paddingTop: 22,
    paddingBottom: 22
  })
});

class SpeechToTextDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      interimText: '',
      finalisedText: [],
      listening: false
    };
  }

  componentDidMount() {
    const onAnythingSaid = text => {
      console.log('heard text', text);
      this.setState({ interimText: text });
    };

    const onFinalised = text => {
      console.log('finalised text', text);
      this.setState({ finalisedText: this.state.finalisedText.concat(text) });
    };

    const onFinishedListening = () => {
      console.log('finished listening..');
      this.setState({ listening: false });
    };

    try {
      this.listener = new SpeechToText(
        onAnythingSaid,
        onFinalised,
        onFinishedListening
      );
      this.startListening();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  startListening = () => {
    this.listener.startListening();
    this.setState({ listening: true });
  };

  render() {
    const { error, interimText, finalisedText, listening } = this.state;

    let content;
    if (error) {
      content = (
        <Paper className={this.props.classes.paper}>
          <Typography type="headline" gutterBottom>
            {error}
          </Typography>
        </Paper>
      );
    } else {
      let buttonForListening;

      if (listening) {
        buttonForListening = (
          <Button
            raised
            color="primary"
            onClick={() => this.listener.stopListening()}
          >
            Stop Listening
          </Button>
        );
      } else {
        buttonForListening = (
          <Button raised color="primary" onClick={() => this.startListening()}>
            Start Listening
          </Button>
        );
      }
      content = (
        <Grid container>
          <Grid item xs={12} sm={5}>
            <Paper className={this.props.classes.paper}>
              <Typography type="headline" gutterBottom>
                Status: {listening ? 'listening...' : 'finished listening'}
              </Typography>
              {buttonForListening}
            </Paper>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Paper className={this.props.classes.paper}>
              <Typography type="headline" gutterBottom>
                Current utterances
              </Typography>
              <Typography gutterBottom>{interimText}</Typography>
              <Typography type="headline" gutterBottom>
                Finalised text
              </Typography>
              <Typography gutterBottom>
                <ul>
                  {finalisedText.map((str, index) => (
                    <li key={index}>{str}</li>
                  ))}
                </ul>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      );
    }

    return (
      <Grid container justify="center" className={this.props.classes.root}>
        <Grid item xs={8}>
          <Grid container>
            <Grid item xs={12}>
              <Typography type="display3" gutterBottom>
                Speech To Text Demo
              </Typography>
              <Typography type="subheading" gutterBottom>
                This is a demo for the{' '}
                <a href="https://www.npmjs.com/package/speech-to-text">
                  speech-to-text module on npm
                </a>.
              </Typography>
            </Grid>
          </Grid>
          {content}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SpeechToTextDemo);
