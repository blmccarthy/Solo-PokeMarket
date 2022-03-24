import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';


import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


export default function ConditionItem({condition}) {

    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState(true)

    useEffect(() => {
        dispatch({type: 'SET_FILTER', payload: {property: `search_${condition.code}`, value: isChecked}})
    }, [])

    return (
        <FormControlLabel
            value={condition.id}
            control={<Checkbox checked={isChecked}/>}
            label={condition.description}
            onChange={e => dispatch({ type: 'SET_FILTER', payload: {property: `search_${condition.code}`, value: !isChecked}})}
            onClick={() => setIsChecked(!isChecked)}
        />
    )
}