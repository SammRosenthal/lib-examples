import type { NextApiRequest, NextApiResponse } from "next";
import mockData from "../../data/table_data.json";

const mockDataStore = mockData;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(mockDataStore);
  }

  return res.status(404).json({ error: "Not Implemented", code: 404 });
}
