import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Navbar, NavItem, NavLink, NavbarBrand, Nav, Button } from "reactstrap";
import Cookies from "universal-cookie";

import Input from "./components/Input";
import Timer from "./components/Timer";
import Stats from "./components/Stats";
// import Chart from "./components/Chart";
import { postData } from "./requests";

function App() {
  const TIME = 10;
  const cookies = new Cookies();
  const [userName, setUserName] = useState("default");
  const [dataPosted, setDataPosted] = useState({});
  const [time, setTime] = useState(TIME);
  const [startTimer, setStartTimer] = useState(false);
  const [stats, setStats] = useState([]);
  const [modalIsOpen, modalToggle] = useState(false);
  const startCountdown = async (startTime) => {
    for (let i = startTime; i >= 0; i--) {
      await new Promise((r) => setTimeout(r, 1000));
      setTime(i);
    }
    setStartTimer(false);
  };

  const changeUserName = () => {
    const username = prompt("Please enter your slack-username");
    cookies.set("slack-wpm-pltfrm-bot", username, {
      expires: new Date(Date.now() + 5 * 60 * 1000),
    });
    setUserName(username);
  };

  useEffect(() => {
    let username = cookies.get("slack-wpm-pltfrm-bot");
    if (username == null) {
      username = prompt("Please enter your slack-username");
      cookies.set("slack-wpm-pltfrm-bot", username, {
        expires: new Date(Date.now() + 5 * 60 * 1000),
      });
    }
    setUserName(username);
  });

  useEffect(() => {
    if (time === 0) {
      //display modal with stats when time runs out
      modalToggle(true);

      //on closing it, reset time
      setTime(TIME);
    }
  }, [time]);

  useEffect(() => {
    //stats only updated at end of a session, send data to backend
    if (stats !== []) {
      const wpm = stats[0];
      const sessionHash = window.location.href;
      postData(userName, setDataPosted, sessionHash, wpm);
    }
  }, [stats]);

  return (
    <React.Fragment>
      <Navbar color="dark">
        <NavbarBrand>Type</NavbarBrand>
        <NavbarBrand onClick={changeUserName}>Change username</NavbarBrand>
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
        hash={window.location.href}
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
