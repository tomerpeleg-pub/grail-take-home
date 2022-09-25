import mockData from "./trial_participants.json";
const participants = [...mockData];

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const randLetters = (n) =>
  new Array(n)
    .fill(0)
    .map(() => LETTERS[Math.floor(Math.random() * LETTERS.length)])
    .join("");

const randNumbers = (n) =>
  new Array(n)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10))
    .join("");

export const generateId = () => `${randLetters(3)}-${randNumbers(3)}`;

export const getParticipants = ({ q, ...fields } = {}) => {
  const keys = Object.keys(fields);

  return participants.filter((participant) => {
    const matchesAllFields = keys.every((key) =>
      participant[key]?.toLowerCase().includes(fields[key]?.toLowerCase())
    );

    if (!q) {
      return matchesAllFields;
    }

    const matchesGeneralSearch = Object.values(participant).some((value) =>
      value?.toLowerCase().includes(q.toLowerCase())
    );

    return matchesAllFields && matchesGeneralSearch;
  });
};

export const updatParticipant = (participantId, fields) => {
  const participant = participants.find(({ id }) => id === participantId);

  if (!participant) {
    throw new Error("No participant found with that ID");
  }

  Object.keys(fields).forEach((key) => {
    participant[key] = fields[key];
  });

  return participant;
};

export const createParticipant = (participant) => {
  const newParticipant = { ...participant, id: generateId() };
  participants.push(newParticipant);
  return newParticipant;
};
