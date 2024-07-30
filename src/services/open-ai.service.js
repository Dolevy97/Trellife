import axios from "axios";

export const openAiService = {
    onGetBoardFromGpt
}

async function onGetBoardFromGpt() {
    // const title = "Becoming the best music producer";
    // const title = "Trip to Australia";
    // const title = "Master fullstack programming";
    const title = prompt('Name the project you\'d like to create')

    const payload = { title };

    try {
      const res = await axios.post("http://localhost:3030/api/open-ai", payload);
      console.log(JSON.stringify(res.data));
    } catch (er) {
      console.error(er);
    }
  }