import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({updateInfo}){

    let [city, setCity] = useState("");
    let [error, setError] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;

    let getWeatherInfo = async () => {
        try{
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();

            let result = {
                city: jsonResponse.name,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description
            };
            console.log(result);
            return result;
        }catch(err){
            throw err;
        }
        
    }

    let handleChange = (evt) => {
        setCity(evt.target.value);
    }

    let handleSubmit = async(evt) => {
        try{
            evt.preventDefault();
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
            console.log(city);
            setCity("");
        }catch(err){
            setError(true);
        }
    }

    return(
        <div className='SearchBox'>
            <i><h3>Search for Weather</h3></i>
            <form onSubmit={handleSubmit}>
                <TextField id="city" label="Choose City" variant="outlined" required value={city} onChange={handleChange} />
                <br/> <br/>
                <Button variant="contained" type="submit"> Search </Button>
                {error && <p style={{color:"red"}}>Data doesn't exist!</p>}
            </form>
        </div>
    )
}