import { deleteParticipant } from "./mocks";

export default async function handler(req, res) {
  const { id } = req.body;

  const result = deleteParticipant(id);
  res.status(200).json(result);
}
