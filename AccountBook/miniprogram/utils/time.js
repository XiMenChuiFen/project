let time={
  'y': new Date().getFullYear(),
  'm': (new Date().getMonth() + 1) < 10 ? "0" +(new Date().getMonth() + 1) :(new Date().getMonth() + 1),
  'd': new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate(),
  'w':new Date().getDay(),
};



export default time; 