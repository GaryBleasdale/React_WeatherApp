export default function DailyCard(props){
    return (
    <>
        <h1>{props.maxTemperature}</h1>
        <h1>{props.minTemperature}</h1>
        <h1>{props.rainProb}</h1>
    </>
    )
}