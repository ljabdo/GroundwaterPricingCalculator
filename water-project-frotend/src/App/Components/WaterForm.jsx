import { useEffect, useState } from "react";
import { Stack , Box , Paper, FormControl } from "@mui/material";
import {   
  Navigate,
  useNavigate
} from "react-router-dom"

import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  styled,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

const TextFieldNew = styled(TextField)(() => ({
    width: "100%",
    marginBottom: "16px",
  }));

const BoxNew = styled(Box)(() => ({
    // width: "100%",
    marginBottom: "16px",
    padding: 50
  }));

export const WaterForm = () => {
    const [state, setState] = useState(
      { 
        time: 0,
        season: "",
        soil: "",
        evapo: 0,
        rainfall: 0,
        acreage: 0,
        gw: 0,
        vine: "",
        irrigation: 0
      });

      const navigate = useNavigate();

      const {
        time,
        season,
        soil,
        evapo,
        rainfall,
        acreage,
        gw,
        vine,
        irrigation,
      } = state;
  
    const handleSubmit = async (event) => {
      event.preventDefault()
      fetch('http://localhost:3001/api', {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(state)
      })
      .then((response) => response.json())
      .then((result) =>
      {
          console.log(result)
          navigate("/results", {state:result})  
      })
    };
  
    const handleChange = (event) => {
      //event.persist();
      setState({ ...state, [event.target.name]: event.target.value });
    };

    return (
      <Box>
        <form sx={{ width: '100%' }} onSubmit={handleSubmit}>
            <BoxNew>
                <Stack spacing={3}>
                    <TextFieldNew
                        id="waterform-select-time"
                        select
                        label="Time of watering"
                        defaultValue={0}
                        onChange={handleChange}
                        name="time"
                        helperText="Please select the time of watering"
                        >
                            <MenuItem value={7 || ""}>Morning</MenuItem>
                            <MenuItem value={10 || ""}>Day</MenuItem>
                            <MenuItem value={5 || ""}>Evening</MenuItem>
                            <MenuItem value={3 || ""}>Night</MenuItem>
                    </TextFieldNew>

                    <TextFieldNew
                            id="waterform-select-season"
                            select
                            name="season"
                            label="Season of watering"
                            defaultValue={0}
                            onChange={handleChange}
                            helperText="Please select the season of watering"
                            >
                            <MenuItem value={5}>Fall</MenuItem>
                            <MenuItem value={3}>Winter</MenuItem>
                            <MenuItem value={4}>Spring</MenuItem>
                            <MenuItem value={6}>Summer</MenuItem>
                    </TextFieldNew>

                    <TextFieldNew
                            type="number"
                            name="soil"
                            label="Soil health 1-4 scale"
                            onChange={handleChange} 
                            value={soil || ""}
                            validators={["required", "minFloat:0", "maxFloat:4", "isFloat"]}
                    />

                    <TextFieldNew
                    type="number"
                    name="evapo"
                    label="Evapotranspiration Inches"
                    onChange={handleChange}
                    value={evapo || ""}
                    validators={["required"]}
                    />

                    <TextFieldNew
                    type="number"
                    name="rainfall"
                    label="Local rainfall inches"
                    onChange={handleChange}
                    value={rainfall || ""}
                    validators={["required"]}
                    />                   

                    <TextFieldNew
                    type="number"
                    name="acreage"
                    label="Acreage irrigated"
                    onChange={handleChange}
                    value={acreage || ""}
                    validators={["required"]}
                    />

                    {/* <TextFieldNew
                    type="number"
                    name="gw"
                    label="Actual groudwater consumption (acre/ft)"
                    onChange={handleChange}
                    value={gw || ""}
                    validators={["required"]}
                    /> */}

                    <TextFieldNew
                    id="waterform-select-vineage"
                    select
                    name="vine"
                    label="Age of vine"
                    defaultValue={0}
                    onChange={handleChange}
                    helperText="Please select the age of vine"
                    >
                    <MenuItem value={9.5}>Young</MenuItem>
                    <MenuItem value={13.5}>Mature</MenuItem>
                    </TextFieldNew>

                    <TextFieldNew
                    id="waterform-select-irrigationtype"
                    select
                    name="irrigation"
                    label="Type of irrigation"
                    defaultValue={0}
                    onChange={handleChange}
                    helperText="Please select the type of irrigation"
                    >
                    <MenuItem value={7}>Drip</MenuItem>
                    <MenuItem value={11.5}>Other</MenuItem>
                    </TextFieldNew>
                </Stack>

                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </BoxNew>
        </form>
        </Box>
    )
}