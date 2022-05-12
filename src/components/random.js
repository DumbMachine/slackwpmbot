import data from "./data.json";

const randomRandom = () => {
  const item = data[Math.floor(Math.random() * data.length)];
  // const item = data[item];
  return item;
};

export { randomRandom };
