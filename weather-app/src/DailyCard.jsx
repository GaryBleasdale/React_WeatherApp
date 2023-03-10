import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudRain, faSun } from '@fortawesome/free-solid-svg-icons'

export default function DailyCard(props) {



    let date;
    if (props.day === 0) {
        date = 'Today';
    }
    if (props.day === 1) {
        date = 'Tomorrow';
    }
    if (props.day === 2) {
        let daysMap = { 
            0: 'Tuesday', 
            1: 'Wednesday', 
            2: 'Thursday', 
            3: 'Friday', 
            4: 'Saturday',
            5: 'Sunday', 
            6: 'Monday',  };
        let todaysDate = new Date()
        let index = todaysDate.getDay()
        date = daysMap[index];
    }


    return (
        <div className='dailyCard card'>
            <h1 className='card-date'>{date}</h1>
            <div className='card-weather flex justify-center items-center my-4'>
                {props.rainProb > 50 ?
                    <FontAwesomeIcon icon={faCloudRain} className='card-icon card-icon--rain' />
                    : <FontAwesomeIcon icon={faSun} className='card-icon card-icon--sun' />
                }
                <div className='card-temperature'>
                    <h1 className='card-max'>MAX: <span className='card-temperature-value'>{props.maxTemperature}C</span></h1>
                    <h1 className='card-min'>MIN: <span className='card-temperature-value'>{props.minTemperature}C</span></h1>
                    <h1 className='card-rainProb'>Chance of Rain: <span className='card-rainProb-value'>{props.rainProb}%</span></h1>
                </div>
            </div>
        </div>
    );
}