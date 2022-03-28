import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

import './AboutPage.css'

import react_logo from './_About-Icons/react.png';
import redux_logo from './_About-Icons/redux.png';
import javascript_logo from './_About-Icons/javascript.png';
import node_logo from './_About-Icons/node.png';
import express_logo from './_About-Icons/express.png';
import sql_logo from './_About-Icons/SQL.png';
import mui_logo from './_About-Icons/MUI.png';




function AboutPage() {

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ mb: 1 }}>Technologies Used</Typography>
            <Box sx={{ ml: '30%'}}>
                <Box sx={{ display: 'flex' }}>
                    <img src={react_logo} alt="react logo" className="about-logo"/>
                    <Typography>React</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <img src={redux_logo} alt="react logo" className="about-logo"/>
                    <Typography>Redux</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <img src={javascript_logo} alt="react logo" className="about-logo"/>
                    <Typography>Javascript</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <img src={node_logo} alt="react logo" className="about-logo"/>
                    <Typography>Node</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <img src={express_logo} alt="react logo" className="about-logo"/>
                    <Typography>Express JS</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <img src={sql_logo} alt="react logo" className="about-logo"/>
                    <Typography>SQL</Typography>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <img src={mui_logo} alt="react logo" className="about-logo"/>
                    <Typography>Google Material UI</Typography>
                </Box>
            </Box>
            <br /><hr /><br />

            <Typography variant="h5" sx={{ mb: 1 }}>Biggest Challenge</Typography>
            <Typography>Dynamic Filtering</Typography>

            <br /><hr /><br />

            <Typography variant="h5" sx={{ mb: 1 }}>Upcoming Features</Typography>
            <Typography>TCGPlayer Market Price API Integration</Typography>
            <Typography>Photo File Upload</Typography>

            <br /><hr /><br />

            <Typography variant="h5" sx={{ mb: 1 }}>Special Thanks</Typography>
            <Typography>Prime Academy</Typography>
            <Typography>Instructors: Liz, Dane, Matt, & Kris</Typography>
            <Typography>Adams Cohort</Typography>
        </Box>
    )
}

export default AboutPage;