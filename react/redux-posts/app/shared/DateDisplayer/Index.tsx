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
    renderedDate = `Today, ${dateOfEvent.toLocaleTimeString(
      undefined,
      {hour: "2-digit", minute: "2-digit"}
      )}`;
  } else if (timestampOfEvent - (startOfDay - day) >= 0) {
    renderedDate = `Yesterday, ${dateOfEvent.toLocaleTimeString(
      undefined,
      {hour: "2-digit", minute: "2-digit"}
    )}`
  } else {
    renderedDate = dateOfEvent.toLocaleString(
      undefined,
      {year: "numeric", month: "long", day: "2-digit", hour: "2-digit", minute: "2-digit"}
    );
  }

  return (
    <div>{renderedDate}</div>
  )
}

export default DateDisplayer