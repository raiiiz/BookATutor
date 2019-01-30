import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createProfile, getCurrentProfile } from '../../redux/actions/profileActions';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { FormControl, Input, InputLabel } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import classList from '../common/ClassList';
import './profile.css';

class EditProfile extends Component {
 state = {
     major: '',
     bio: '',
     minor: '',
     availability: '',
     courses: [],
     errors: {}
 }

 componentDidMount() {
     this.props.getCurrentProfile();
 }

 componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
    if (nextProps.profile.profile) {
        const profile = nextProps.profile.profile;

        this.setState({
            major: profile.major,
            minor: profile.minor,
            bio: profile.bio,
            availability: profile.availability
        });
    }
 }

 addCourse = (e) => {
    this.setState((prevState) => ({
      courses: [...prevState.courses, {courseId: "", courseName: "", courseNumber: ""}],
    }));
 }

 removeCourse = (i) => {
   let courses = [...this.state.courses];
   // remove course at index i
 }

 onSubmit = e => {
     e.preventDefault();
     const { bio, major, minor, availability, courses } = this.state;

     const profileData = {
         bio,
         major, 
         minor,
         availability
     }

     this.props.createProfile(profileData, this.props.history);
     // do proper call to add courses to user
 }

 onChange = e => {
    if (["courseId", "courseNumber", "courseName"].includes(e.target.id)) {
      let courses = [...this.state.courses];
      let i = e.target.name.charAt(e.target.name.length - 1);
      courses[i][e.target.id] = e.target.value;
      this.setState({ [courses]: courses });
    }
    else {
     this.setState({ [e.target.name]: e.target.value });
    }
 }

// on cancel go back to dashboard to eliminate need for extra button
render() {
    const majors = classList.classList.majors;
    const minors = classList.classList.minors;

    const { bio, major, minor, availability, courses } = this.state;

    const majorMenuItems =  majors.map((major, i) =>
            <MenuItem key={i} value={major}>{major}</MenuItem>
    );
    const minorMenuItems = minors.map((minor, i) =>
            <MenuItem key={i} value={minor}>{minor}</MenuItem>
    );

    const courseItems = courses.map((course, i) => {
            let courseNumber = "courseNumber-" + i;
            let courseId = "courseId-" + i;
            let courseName = "courseName-" + i; 

            return  (
              <Grid item xs={12} sm={6} md={4} key={i}>
               <Card className="card" elevation={0}>
                  <CardContent>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor={courseId}>Course Identifier</InputLabel>
                        <Select value={course.courseId} onChange={this.onChange} variant="outlined" name={courseId} id="courseId">
                            <MenuItem value=""></MenuItem>
                            {majorMenuItems}
                        </Select>
                    </FormControl>
                    <FormControl margin="normal" required maxLength="3" fullWidth>
                          <InputLabel htmlFor={courseNumber}>Course Number</InputLabel>
                          <Input id="courseNumber" name={courseNumber} value={course.courseNumber} onChange={this.onChange} type="number">
                          </Input>
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor={courseName}>Course Name</InputLabel>
                        <Input id="courseName" name={courseName} value={course.courseName} onChange={this.onChange}>
                        </Input>
                    </FormControl>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={this.removeCourse(i)}>Remove Course</Button>
                  </CardActions>
                </Card>
             </Grid> 
           )});  

    return (
      <div className="padding20">
            <Typography variant="h4" component="h1" align="center">
                Edit Profile
            </Typography>
             <form onSubmit={this.onSubmit}>    
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6} md={6}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="major">Major(s)</InputLabel>
                            <Select value={major} onChange={this.onChange} variant="outlined" inputProps={{
                                name: 'major',
                                id: 'major'
                            }}>
                                <MenuItem value=""></MenuItem>
                                {majorMenuItems}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="minor">Minor(s)</InputLabel>
                            <Select value={minor || ''} onChange={this.onChange} inputProps={{
                                name: 'minor',
                                id: 'minor'
                            }}>
                                <MenuItem value=""></MenuItem>
                                {minorMenuItems}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl margin="normal" fullWidth>
                          <InputLabel htmlFor="bio">Short Bio</InputLabel>
                          <Input type="text" id="bio" name="bio" value={bio} multiline fullWidth onChange={this.onChange}>
                          </Input>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl margin="normal" fullWidth>
                          <InputLabel htmlFor="availability">Availablity</InputLabel>
                          <Input type="text" id="availability" name="availability" value={availability} multiline fullWidth onChange={this.onChange}>
                          </Input>
                        </FormControl>
                    </Grid>
                 </Grid>
                 <Grid container spacing={24}>
                   <Grid item xs={12}>
                       <div className="courses"></div>
                   </Grid>
                   {courseItems}
                   <Grid item xs={12}>
                       <Button aria-label="Add Course" variant="outlined" onClick={this.addCourse}>
                          Add a Course 
                       </Button>
                   </Grid>
                </Grid>  
                <Grid container justify="flex-end" spacing={24}>
                    <Grid item>
                        <Button align="right" type="cancel" className="button">Cancel</Button>
                    </Grid> 
                    <Grid item>   
                        <Button align="right" type="submit" variant="outlined" color="inherit" className="button">Submit</Button>
                    </Grid>
                </Grid>
            </form>
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

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
