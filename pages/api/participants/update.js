import { updatParticipant } from "../../../mocks";

export default async function handler(req, res) {
  const { id, ...fields } = req.body;

  const newParticipant = updatParticipant(id, fields);
  res.status(200).json(newParticipant);
}
