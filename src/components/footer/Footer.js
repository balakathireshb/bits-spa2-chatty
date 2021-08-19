/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';



// eslint-disable-next-line import/no-unresolved
import WaveBorder from 'src/components/WaveBorder';





const styles = (theme) => ({
  footerInner: {
    backgroundColor: theme.palette.common.darkBlack,
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(10),
      paddingLeft: theme.spacing(16),
      paddingRight: theme.spacing(16),
      paddingBottom: theme.spacing(10)
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
      paddingBottom: theme.spacing(2)
    }
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400,
    color: theme.palette.common.white
  },
  footerLinks: {
    marginTop: theme.spacing(2.5),
    marginBot: theme.spacing(1.5),
    color: theme.palette.common.white
  },
  infoIcon: {
    color: `${theme.palette.common.white} !important`,
    backgroundColor: '#33383b !important'
  },
  socialIcon: {
    fill: theme.palette.common.white,
    backgroundColor: '#33383b',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    }
  },
  link: {
    cursor: 'Pointer',
    color: theme.palette.common.white,
    transition: theme.transitions.create(['color'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeIn
    }),
    '&:hover': {
      color: theme.palette.primary.light
    }
  },
  whiteBg: {
    backgroundColor: theme.palette.common.white
  }
});

function Footer(props) {
  const { classes, theme, width } = props;
  return (
    <footer className="lg-p-top">
      <WaveBorder
        upperColor="#FFFFFF"
        lowerColor={theme.palette.common.darkBlack}
        animationNegativeDelay={4}
      />
      <div className={classes.footerInner}>
        <Grid container spacing={8}>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6" paragraph className="text-white">
              About the Group
            </Typography>
            <Typography style={{ color: '#8f9296' }} paragraph>
              Balakathiresh B - 2019AB04047
            </Typography>
            <Typography style={{ color: '#8f9296' }} paragraph>
              Alkesh - 2019AD04082
            </Typography>
            <Typography style={{ color: '#8f9296' }} paragraph>
              Harsh - 2019AD04086
            </Typography>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired
};

export default withStyles(styles, { withTheme: true })(Footer);
