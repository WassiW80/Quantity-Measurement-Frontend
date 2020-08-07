import React, {useEffect, useState} from "react";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

export default function Selector(props) {
    const [unit, setUnit] = useState('');
    const [subUnit, setSubUnit] = useState('');

    const handleChange = (event) => {
        setUnit(event.target.value);
        props.getSubUnit(event.target.value, props.name);
    };

    useEffect(() => {
        console.log(props.mainUnits);
    });

    return (
        <FormControl variant="outlined" className="main">
            <InputLabel htmlFor="outline-units-native-simple">{props.name}</InputLabel>
            <Select style={{width: props.width}}
                    value={unit}
                    onChange={handleChange}
                    inputProps={{
                        name: 'quantity',
                        id: 'units',
                    }}
            >
                {console.log("SubUnit1")}
                {console.log(props.mainUnits)}
                {console.log("SubUnit2")}
                {props.mainUnits.map((data) => (
                    <option key={data} value={data}>{data}</option>
                ))
                }
            </Select>
        </FormControl>

    );
}