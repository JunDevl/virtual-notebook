import { useEffect, useState, useRef } from "react";
import "./datebar.css"

interface Props {
  date: {selectedDate: Date, setSelectedDate: React.Dispatch<React.SetStateAction<Date>>}
}

const DateBar = ({date}: Props) => {
  const MILISECONDS_IN_A_DAY = 86400000;

  const generateViewedDates = () => {
    let dates = [];

    dates.push(selectedDate);
    for (let i = 1; i <= adjacentDatesQuantity; i++) {
      dates.unshift(new Date(Number(selectedDate) - (MILISECONDS_IN_A_DAY * i)));
      dates.push(new Date(Number(selectedDate) + (MILISECONDS_IN_A_DAY * i)))
    }
    
    return dates;
  }

  const {selectedDate, setSelectedDate} = date;
  const [adjacentDatesQuantity, setAdjacentDatesQuantity] = useState<number>(3);
  const [viewedDates, setViewedDates] = useState<Date[]>(generateViewedDates());
  const [transformPosition, setTransformPosition] = useState<number>(0); // percentage

  const dateBar = useRef<HTMLDivElement>(null);

  useEffect(() => setViewedDates(generateViewedDates()), [selectedDate])

  useEffect(() => {
    /*
    let isFirstTrigger = true;

    const observer = new IntersectionObserver(([element]) => {
      if (isFirstTrigger) {
        isFirstTrigger = false;
        return;
      }

      console.log(element);

      if (dateBar.current?.firstChild === element.target) {
        //element.target.remove();
        setViewedDates(() => {
          if (viewedDates.length <= 3) return viewedDates;

          const temp = [...viewedDates];
          temp.shift();

          temp.push(new Date());

          return temp;
        })
        return;
      }

    },{
      root: dateBar.current,
      threshold: 0
    })

    const cards = document.querySelectorAll<HTMLDivElement>(".date-card");

    cards.forEach(element => observer.observe(element))

    //observer.observe(dateBar.current!);

    */
  }, [])

  const handleMouseWheel = (e: React.WheelEvent<HTMLElement>) => {
    const cards = document.querySelectorAll<HTMLDivElement>(".date-card");
    
    if (e.deltaY > 0) {
      //setTransformPosition(transformPosition-100);

      //cards.forEach(card => card.style.transform = `translateX(${transformPosition-100}%)`);

      setViewedDates(() => {
        if (viewedDates.length <= 3) return viewedDates;

        const temp = [...viewedDates];
        temp.shift();

        temp.push(new Date(Number(viewedDates[viewedDates.length - 1]) + MILISECONDS_IN_A_DAY));

        return temp;
      })

      return;
    }
    //wheel up
    //setTransformPosition(transformPosition+100);
    //cards.forEach(card => card.style.transform = `translateX(${transformPosition+100}%)`)

    setViewedDates(() => {
      if (viewedDates.length <= 3) return viewedDates;

      const temp = [...viewedDates];
      temp.pop();

      temp.unshift(new Date(Number(viewedDates[0]) - MILISECONDS_IN_A_DAY));

      return temp;
    })
  }

  return (
    <nav id='date-bar' ref={dateBar} onWheel={e => handleMouseWheel(e)}>
      {viewedDates.map(date => 
      <div 
        onClick={() => setSelectedDate(date)}
        className={`date-card${Number(selectedDate) === Number(date) ? " selected" : ""}`}
      >
        {date.toISOString()}
      </div>)}
    </nav>
  )
}

export default DateBar