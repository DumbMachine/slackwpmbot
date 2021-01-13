import React, { useEffect, useState } from "react";
import { Navbar, NavItem, NavLink, NavbarBrand, Nav } from "reactstrap";
import Input from "./components/Input";
import Timer from "./components/Timer";
import Stats from "./components/Stats";
import Chart from "./components/Chart";
import { postData } from "./requests";
function App() {
  const TIME = 1;
  const [dataPosted, setDataPosted] = useState({});
  const [time, setTime] = useState(TIME);
  const [startTimer, setStartTimer] = useState(false);
  const [stats, setStats] = useState([]);
  const [modalIsOpen, modalToggle] = useState(false);
  const [data, setData] = useState([]);
  const startCountdown = async (startTime) => {
    for (let i = startTime; i >= 0; i--) {
      await new Promise((r) => setTimeout(r, 1000));
      setTime(i);
    }
    setStartTimer(false);
  };

  useEffect(() => {
    if (time === 0) {
      //display modal with stats when time runs out
      modalToggle(true);

      //on closing it, reset time
      setTime(TIME);
    }
  }, [time]);

  // useEffect(() => {
  //   //retrieve data
  //   getData(setData);
  // }, []);

  useEffect(() => {
    //stats only updated at end of a session, send data to backend
    if (stats !== []) {
      const wpm = stats[0];
      const sessionHash = window.location.href;
      postData(setDataPosted, sessionHash, wpm);
    }
  }, [stats]);

  return (
    <React.Fragment>
      <Navbar color="dark">
        <NavbarBrand>Type Type</NavbarBrand>
      </Navbar>
      <p
        style={{
          textAlign: "center",
          textTransform: "uppercase",
          color: "grey",
          marginTop: "10px",
        }}
      >
        Typing speed test
      </p>
      <h2 style={{ textAlign: "center" }}>Test your typing skills ⚡</h2>
      <Timer>{time}</Timer>
      <Input
        signalStart={() => {
          if (!startTimer) {
            setStartTimer(true);
            startCountdown(time);
          }
        }}
        time={time}
        setStats={setStats}
      />
      <Stats
        isOpen={modalIsOpen}
        toggle={async () => {
          modalToggle(false);
        }}
        stats={stats}
        dataPosted={dataPosted}
      />
      {/* <Chart data={data} /> */}
    </React.Fragment>
  );
}

export default App;
