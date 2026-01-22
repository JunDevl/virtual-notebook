interface Props {
  date: {selectedDate: Date, setSelectedDate: React.Dispatch<React.SetStateAction<Date>>}
}

const DateBar = ({date}: Props) => {
  const {selectedDate, setSelectedDate} = date;

  return (
    <nav id='date-bar'></nav>
  )
}

export default DateBar