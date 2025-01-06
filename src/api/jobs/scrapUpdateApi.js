import axios from "axios";
import { Scrap } from "../api";

export const scrapUpdateApi = async (postIdx) => {
  await axios.post(Scrap.UpdateScrap, { postIdx: postIdx });
};
