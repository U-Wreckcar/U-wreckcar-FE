import { isWithinInterval } from 'date-fns';
export const DataTest = () => {
  const data = [
    { date: new Date('2022.01.01'), value: 10 },
    { date: new Date('2022.01.05'), value: 20 },
    { date: new Date('2022.01.10'), value: 30 },
    { date: new Date('2022.02.01'), value: 40 },
  ];

  const startDate = new Date('2022.01.01');
  const endDate = new Date('2022.01.31');
  console.log(startDate);
  const filteredData = data?.filter((item) =>
    isWithinInterval(item.date, { start: startDate, end: endDate })
  );

  //   const output =

  return (
    <>
      {filteredData?.map((item, i) => {
        return <div key={i}>{item.value}</div>;
      })}
    </>
  );
};
