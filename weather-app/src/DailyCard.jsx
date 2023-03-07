export default function DailyCard(props){
    return (
    <div className='dailyCard'>
        <h1>MAX: {props.maxTemperature}C</h1>
        <h1>MIN: {props.minTemperature}C</h1>
        <h1>Chance of Rain: {props.rainProb}%</h1>
    </div>
    )
}