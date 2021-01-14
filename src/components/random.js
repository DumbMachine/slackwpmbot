import data from "./data.json";

const randomRandom = (hash) => {
  // const item = data[Math.floor(Math.random() * data.length)];
  const item = data[hash];
  return item;
};

export { randomRandom };
