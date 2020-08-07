import React, {useEffect, useState} from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Selector from "./Selector";
import TextField from "@material-ui/core/TextField";
import Axios from 'axios';

export default function QuantityMeasurement() {
    const [mainUnits, setMainUnits] = useState([]);
    const [subUnits, setSubUnits] = useState([]);
    const [unit, setUnit] = useState('');
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [subUnit1, setSubUnit1] = useState('');
    const [subUnit2, setSubUnit2] = useState('');

    const getUnit = () => {
        Axios.get("http://localhost:8080/unit/type").then((response) => {
             console.log(response);
            setMainUnits(response.data);
        }).catch((error) => {
            console.log(error);
        })
    };

    const getSubUnit = (event, name) => {
        if (name === "Unit") {
            Axios.get(`http://localhost:8080/unit/type/${event}`).then(response => {
                console.log(response);
                setSubUnits(response.data);
                setUnit(event);
            }).catch(error => {
                console.log(error);
            })
        } else if (name === "Sub Unit1") {
            setSubUnit1(event);
        } else if (name === "Sub Unit2") {
            setSubUnit2(event);
        }
    };

    const getValue1=(event)=>{
        setValue1(event.target.value);
        const myData1={
            value:event.target.value,
            firstUnitType:subUnit1,
            secondUnitType:subUnit2
        }
        Axios.post(`http://localhost:8080/unit/converter`,myData1).then(response=>{
            console.log(response);
            setValue2(response.data.value);
        }).catch(error=>{
            console.log(error)
        })
    };

    const getValue2=(event)=>{
        setValue2(event.target.value);
        const myData2={
            value:event.target.value,
            firstUnitType:subUnit2,
            secondUnitType:subUnit1
        };
        Axios.post(`http://localhost:8080/unit/converter`,myData2).then(response=>{
            console.log(response)
            setValue2(response.data.value);
        }).catch(error=>{
            console.log(error)
        })
    };

    useEffect(()=>{
        getUnit();
    },[]);

    return (
        <div>
            <h1>Quantity Measurement</h1>
            <Card className="card">
                <CardContent>
                    <Selector name="Unit" width="450px" getSubUnit={getSubUnit} mainUnits={mainUnits}/>
                    <div className="from">From</div>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignContent: "center",
                        marginTop: "2%"
                    }}>
                        <TextField label="Value" variant="outlined" value={value1} onChange={getValue1}/>
                        <Selector name="Sub Unit1" width="220px"
                                  getSubUnit={getSubUnit} mainUnits={subUnits} onChange={getValue2} />
                    </div>
                    <div className="to">
                        To
                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignContent: "center",
                        marginTop: "2%"
                    }}>
                        <TextField label="Value" variant="outlined" value={value2} onChange={getValue2}/>
                        <Selector name="Sub Unit2" width="220px"
                                  getSubUnit={getSubUnit} mainUnits={subUnits} onChange={{getValue1}}/>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}