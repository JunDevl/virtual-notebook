import { useEffect, useState } from "react";
import "./datebar.css"

interface Props {
  date: {selectedDate: Date, setSelectedDate: React.Dispatch<React.SetStateAction<Date>>}
}

const DateBar = ({date}: Props) => {
  const MILISECONDS_IN_A_DAY = 86400000;

  const generateViewedDates = () => {
    let dates = [];

    dates.push(selectedDate);
    for (let i = 1; i <= 2; i++) {
      dates.unshift(new Date(Number(selectedDate) - (MILISECONDS_IN_A_DAY * i)));
      dates.push(new Date(Number(selectedDate) + (MILISECONDS_IN_A_DAY * i)))
    }

    return dates;
  }

  const {selectedDate, setSelectedDate} = date;
  const [viewedDates, setViewedDates] = useState<Date[]>(generateViewedDates())

  useEffect(() => setViewedDates(generateViewedDates()), [selectedDate])

  return (
    <nav id='date-bar'>
      {viewedDates.map(date => 
      <div onClick={() => setSelectedDate(date)}>
        {date.toLocaleDateString()}
      </div>)}
    </nav>
  )
}

export default DateBar