import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ConditionItem from './ConditionItem';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';


// ===============================================================================
// MUI CUSTOM ACCORDION THEMES
// ===============================================================================

// -------- ACCORDION --------- //
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `0px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

// ----- ACCORDION SUMMARY ----- //
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  // backgroundColor:
  //   theme.palette.mode === 'dark'
  //     ? 'rgba(255, 255, 255, .05)'
  //     : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

// ----- ACCORDION DETAILS ----- //
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

// ===============================================================================
// FILTER PAGE
// ===============================================================================

function FilterPage() {

  const history = useHistory();
  const dispatch = useDispatch();
  const conditions = useSelector(store => store.conditions);
  const filterSelection = useSelector(store => store.filters.searchQueryReducer);

  const [expandedFilter1, setExpandedFilter1] = useState(false);
  const [expandedFilter2, setExpandedFilter2] = useState(false);
  const [expandedFilter3, setExpandedFilter3] = useState(false);
  const [expandedFilter4, setExpandedFilter4] = useState(true);

  const handleGoBack = () => {
    history.goBack();
  }

  const handleSearch = () => {
    dispatch({ type: 'FETCH_FILTERED_SEARCH' , payload: filterSelection });
    history.push('/home')
  }

  useEffect(() => {
    dispatch({ type: 'FETCH_CONDITIONS' })
  }, [])

  return (

    <div>
      <Typography variant="h5">Filters</Typography>
      <hr />
      {/* ===== FILTER SET =============================================================== */}
      <Accordion expanded={expandedFilter4}>
        <AccordionSummary 
          aria-controls="panel4d-content" 
          id="panel4d-header"
          onClick={() => setExpandedFilter4(!expandedFilter4)}
        >
          <Typography>Keyword</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField 
            variant="outlined" 
            placeholder="Enter Card Name" 
            fullWidth 
            value={filterSelection.card_name}
            autoComplete="off"
            onChange={e => dispatch({ type: 'SET_FILTER', payload: {property: 'card_name', value: e.target.value}})}
          />
        </AccordionDetails>
      </Accordion>

      {/* ===== FILTER SET =============================================================== */}
      <Accordion expanded={expandedFilter1}>
        <AccordionSummary 
          aria-controls="panel1d-content" 
          id="panel1d-header"
          onClick={() => setExpandedFilter1(!expandedFilter1)}
        >
          <Typography>Set</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField 
            variant="outlined" 
            placeholder="Enter Set Name..." 
            fullWidth 
            autoComplete="off"
            onChange={e => dispatch({ type: 'SET_FILTER', payload: {property: 'set', value:e.target.value}})}
          />
        </AccordionDetails>
      </Accordion>

      {/* ===== FILTER CONDITION =============================================================== */}
      <Accordion expanded={expandedFilter2}>
        <AccordionSummary 
          aria-controls="panel2d-content" 
          id="panel2d-header"
          onClick={() => setExpandedFilter2(!expandedFilter2)}
        >
          <Typography>Condition</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {conditions.map(condition => (
              <ConditionItem key={condition.id} condition={condition} />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion >

      {/* ===== FILTER PRICE =============================================================== */}
      <Accordion expanded={expandedFilter3}>
        <AccordionSummary 
          aria-controls="panel3d-content" 
          id="panel3d-header"
          onClick={() => setExpandedFilter3(!expandedFilter3)}
        >
          <Typography>Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container sx={{ mt: 1}}>
            <Grid item xs={5.5}>
              <FormControl fullWidth>
                <InputLabel htmlFor="min">Min</InputLabel>
                <OutlinedInput
                  id="min"
                  label="min"
                  type="number"
                  placeholder="0.00"
                  autoComplete="off"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  value={filterSelection.min_price}
                  onChange={e => dispatch({ type: 'SET_FILTER', payload: {property: 'min_price', value: e.target.value}})}
                />
              </FormControl>
            </Grid>
            <Grid item xs={1}>
              <Typography sx={{ textAlign: "center", mt: 1, fontSize: '24px' }}>-</Typography>
            </Grid>
            <Grid item xs={5.5}>
            <FormControl fullWidth>
                <InputLabel htmlFor="max">Max</InputLabel>
                <OutlinedInput
                  id="max"
                  label="max"
                  type="number"
                  placeholder="0.00"
                  autoComplete="off"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  value={filterSelection.max_price}
                  onChange={e => dispatch({ type: 'SET_FILTER', payload: {property: 'max_price', value: e.target.value}})}
                />
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* ===== SUBMIT BUTTONS ============================================================= */}
      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={6}>
          <Button 
            variant="outlined" 
            fullWidth
            onClick={handleGoBack}
          >
            Go Back
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button 
            variant="contained" 
            fullWidth
            onClick={handleSearch}
            >
              Search
          </Button>
        </Grid>
      </Grid>

    </div >

  );
}

// this allows us to use <App /> in index.js
export default FilterPage;
