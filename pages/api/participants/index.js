// TODO: move into mocks, this file should be generic so it can be used unmodified
import mockData from "../../../mocks/trial_participants.json";

const getParticipants = (fields = {}, limit = 20, start = 0) => {
  const keys = Object.keys(fields);

  return mockData
    .filter((participant) =>
      keys.every((key) =>
        participant[key]?.toLowerCase().includes(fields[key]?.toLowerCase())
      )
    )
    .slice(start, start + limit);
};

/**
 * Get the participants for the trial.
 */
export default async function handler(req, res) {
  const { limit = "20", start = "0", ...fields } = req.query;
  // TODO: validation, caching, tests, etc.

  const limitNum = parseInt(limit);
  const startNum = parseInt(start);

  try {
    const searchResults = await getParticipants(fields, limitNum, startNum);

    res.status(200).json({
      metadata: {
        limit: limitNum,
        start: startNum,
      },
      results: searchResults,
    });
  } catch (e) {
    res.status(500).json({
      errorCode: "SEARCH_FAILURE",
      error: "There was an error performing the search",
      // TODO: other standard error fields
    });

    // TODO: proper error logging
    console.log("[ERROR]", e);
  }
}
