// const URL =
//   "https://master-7rqtwti-563mnnknl3h64.eu-4.platformsh.site/saveStats";
const URL = "http://localhost:8888/saveStats";

const postData = (username, setDataPosted, sessionHash, wpm) => {
  const body = { username, sessionHash, wpm };
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
    console.log("Skipping this request");
  }
};

// const randomRandom = () => {
//   if ( != null) {
//     fetch("http://localhost:8888/getPrompt", {
//       method: "POST",
//     }).then((res) => {
//       if (res.ok) {
//         const jsonInfo = res.json();
//         console.log("asdf", jsonInfo);
//         return jsonInfo;
//       } else {
//         throw new Error("Failed to send server data");
//       }
//     });
//     // .then((data) => return data);
//     .then((data) => setPythonWords(data));
//   }
// };

module.exports = { postData };
