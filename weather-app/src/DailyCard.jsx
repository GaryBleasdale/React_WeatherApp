export default function DailyCard(props){
    
    let date;
    if (props.day == 0){
        date = 'Today'
    }
    if (props.day == 1){
        date = 'Tomorrow'
    }
    if (props.day == 2){
        date = 'Day after tomorrow'
    }

    return (
    <div className='dailyCard'>
        <h1> {date}</h1>
        <h1>MAX: {props.maxTemperature}C</h1>
        <h1>MIN: {props.minTemperature}C</h1>
        <h1>Chance of Rain: {props.rainProb}%</h1>
    </div>
    )
}