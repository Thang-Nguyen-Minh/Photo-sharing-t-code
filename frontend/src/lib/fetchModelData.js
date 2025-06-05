import axios from "axios";
export default async function fetchModel(url) {
  try {
    const response = await axios.get(`http://localhost:8080${url}`);
    return response.data;
  } catch (err) {
    console.log("❌ Fetch error: ", err);
    return null;
  }
}
