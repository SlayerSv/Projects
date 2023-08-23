function DateDisplayer({date} : {date: string}) {
  const startOfDay = new Date().setHours(0, 0, 0, 0);
  const dateOfEvent = new Date(date);
  const timestampOfEvent = dateOfEvent.getTime();


  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  let renderedDate;

  if (timestampOfEvent - startOfDay >= 0) {
    renderedDate = ` Today, ${dateOfEvent.toLocaleTimeString()}`;
  } else if (timestampOfEvent - (startOfDay - day) >= 0) {
    renderedDate = ` Yesterday, ${dateOfEvent.toLocaleTimeString()}`
  } else {
    renderedDate = " " + dateOfEvent.toLocaleString();
  }

  return (
    <div>{renderedDate}</div>
  )
}

export default DateDisplayer