const transformParticipant = (participant) => ({
  ...participant,
  name: `${participant.firstName} ${participant.lastName}`,
});

export const getParticipants = (fields, { limit = 20, page = 0 }) => {
  const searchParams = new URLSearchParams(fields);
  searchParams.append("limit", limit);
  searchParams.append("start", page * limit);

  return fetch("/api/participants?" + searchParams.toString())
    .then((result) => result.json())
    .then(({ results, ...rest }) => ({
      ...rest,
      results: results.map(transformParticipant),
    }));
};

export const updateParticipant = (participant) => {
  const options = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(participant),
  };

  return fetch("/api/participants/update", options).then((result) =>
    result.json()
  );
};

export const createParticipant = (participant) => {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(participant),
  };

  return fetch("/api/participants/create", options).then((result) =>
    result.json()
  );
};

export const deleteParticipant = (participantId) => {
  const options = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: participantId }), // TODO: should be url/search param
  };

  return fetch("/api/participants/delete", options).then((result) =>
    result.json()
  );
};
