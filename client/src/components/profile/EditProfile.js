import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { createProfile, getCurrentProfile } from '../../redux/actions/profileActions';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { FormControl, Input, InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class EditProfile extends Component {
 state = {
     handle: '',
     major: '',
     bio: '',
     classes: '',
     status: '',
     minor: '',
     errors: {}
 }

 componentDidMount() {
     this.props.getCurrentProfile();
 }

 componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
    if (nextProps.profile.profile) {
        const profile = nextProps.profile.profile;
        let profileClasses = profile.classes.toString();

        this.setState({
            handle: profile.handle,
            major: profile.major,
            bio: profile.bio,
            classes: profileClasses,
            status: profile.status,
        });
    }
 }

 onSubmit = e => {
     e.preventDefault();
     const { handle, bio, classes, major, minor, status } = this.state;

     const profileData = {
         handle,
         bio,
         classes,
         major, 
         minor,
         status
     }

     this.props.createProfile(profileData, this.props.history);
 }

 onChange = e => {
     this.setState({ [e.target.name]: e.target.value });
 }

render() {
    const { handle, bio, classes, major, status } = this.state;

    return (
      <div>
        <Grid container>
            <Grid item xs={12}>
                <Paper elevation={1}>
                    <Button component={Link} to="/dashboard">
                        Back to Dashboard
                    </Button>
                    <Typography variant="h4" component="h1">
                        Edit Your Profile
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Add your changes below
                    </Typography>
                    <form className={classes.root} onSubmit={this.onSubmit}>
                        <FormControl className={classes.formControl} margin="normal" required>
                            <InputLabel htmlFor="handle">Profile Handle</InputLabel>
                            <Input id="handle" name="handle" value={handle} onChange={this.onChange}>
                            </Input>
                        </FormControl>
                        <FormControl className={classes.formControl} margin="normal" required>
                            <InputLabel htmlFor="major">Major</InputLabel>
                            <Select value={major} onChange={this.onChange} inputProps={{
                                name: 'major',
                                id: 'major'
                            }}>
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                <MenuItem value={'Computer Science'}>Computer Science</MenuItem>
                                <MenuItem value={'Biology'}>Biology</MenuItem>
                                <MenuItem value={'Mathematics'}>Mathematics</MenuItem>
                  
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl} margin="normal" required>
                            <InputLabel htmlFor="classes">Classes</InputLabel>
                            <Input id="classes" name="classes" value={classes} onChange={this.onChange} placeholder="Add comma-separated classes...">
                            </Input>
                        </FormControl>
                        <FormControl className={classes.formControl} margin="normal" required>
                            <InputLabel htmlFor="major">Status</InputLabel>
                            <Select value={status} onChange={this.onChange} inputProps={{
                                name: 'status',
                                id: 'status'
                            }}>
                                <MenuItem value="">
                                <em>None</em>
                                </MenuItem>
                                <MenuItem value={'Freshman'}>Freshman</MenuItem>
                                <MenuItem value={'Sophomore'}>Sophomore</MenuItem>
                                <MenuItem value={'Junior'}>Junior</MenuItem>
                                <MenuItem value={'Senior'}>Senior</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl} margin="normal" fullWidth variant="outlined">
                            <InputLabel htmlFor="bui">Short Bio</InputLabel>
                            <Input type="text" id="bio" name="bio" value={bio} multiline fullWidth onChange={this.onChange}>
                            </Input>
                        </FormControl>
                        <Button type="submit" variant="outlined" color="inherit">Submit</Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
      </div>
    );
  }
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(withStyles(styles)(EditProfile)));