// TODO: move into mocks, this file should be generic so it can be used unmodified
import mockData from "./trial_participants.json";

const participants = [...mockData];

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
