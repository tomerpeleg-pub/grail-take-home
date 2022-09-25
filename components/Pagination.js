import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export const Pagination = ({
  onPrevClicked,
  onNextClicked,
  page,
  totalPages,
  totalResults,
  limit,
}) => (
  <Box>
    <Button onClick={onPrevClicked} disabled={page === 0}>
      Prev
    </Button>
    {page} / {totalPages}
    <Button onClick={onNextClicked} disabled={page === totalPages}>
      Next
    </Button>
    Showing {limit} out of {totalResults}
  </Box>
);
