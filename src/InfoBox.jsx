import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./InfoBox.css";
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import LightModeIcon from '@mui/icons-material/LightMode';
import AcUnitIcon from '@mui/icons-material/AcUnit';


export default function InfoBox({info}){
    const INIT_URL = import.meta.env.VITE_INIT_URL;
    const HOT_URL = import.meta.env.VITE_HOT_URL;
    const COLD_URL = import.meta.env.VITE_COLD_URL;
    const RAIN_URL = import.meta.env.VITE_RAIN_URL;

    return(
        <div className='InfoBox'>
            <div className='cardContainer'>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={
                            info.humidity > 80
                            ? RAIN_URL
                            : info.temp > 15
                            ? HOT_URL
                            :COLD_URL
                        }
                        title="weather"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {info.city}
                            {
                                info.humidity > 80
                                ? <ThunderstormIcon/>
                                : info.temp > 15
                                ? <LightModeIcon/>
                                : <AcUnitIcon/>
                            }
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
                            <p>Temperature: {info.temp}&deg;C</p>
                            <p>Humidity: {info.humidity}</p>
                            <p>Max Temp: {info.tempMax}&deg;C</p>
                            <p>Min Temp: {info.tempMin}&deg;C</p>
                            <p>Weather feels like {info.feelsLike}&deg;C</p>
                            <p>Weather prediction is for <i>{info.weather}</i></p>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}