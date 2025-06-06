import axios from "axios";
export default async function fetchModel(url) {
  try {
    const response = await axios.get(`https://8zns8f-8080.csb.app${url}`);
    return response.data;
  } catch (err) {
    console.log("❌ Fetch error: ", err);
    return null;
  }
}
