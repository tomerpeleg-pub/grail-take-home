import { getParticipants } from "../../../mocks";

/**
 * Get the participants for the trial.
 */
export default async function handler(req, res) {
  const { limit = "20", start = "0", ...fields } = req.query;
  // TODO: validation, caching, tests, etc.

  const limitNum = parseInt(limit);
  const startNum = parseInt(start);

  try {
    const searchResults = await getParticipants(fields);
    const totalResults = searchResults.length;
    const paginatedResults = searchResults.slice(startNum, startNum + limitNum);

    res.status(200).json({
      metadata: {
        limit: limitNum,
        start: startNum,
        total: totalResults,
        pages: Math.ceil(searchResults.length / paginatedResults.length),
      },
      results: paginatedResults,
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
