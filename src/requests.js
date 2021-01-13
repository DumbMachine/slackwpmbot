const URL = "http://127.0.0.1:5000/saveStats";

const postData = (setDataPosted, sessionHash, wpm) => {
  const body = { sessionHash, wpm };
  if (wpm != null) {
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      "X-Requested-With": "fetch",
    })
      .then((res) => {
        if (res.ok) {
          const jsonInfo = res.json();
          return jsonInfo;
        } else {
          throw new Error("Failed to send server data");
        }
      })
      .then((data) => setDataPosted(data));
  } else {
    console.log("skipping this request");
  }
};

const randomRandom = (hash) => {
  if (hash != null) {
    fetch("https://api.quotable.io/random", {
      method: "GET",
    }).then((res) => {
      console.log(res.data, " this is the things that");
      return res.json();
    });
  }
};

module.exports = { postData, randomRandom };
