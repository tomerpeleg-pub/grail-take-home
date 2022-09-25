import { useEffect, useState } from "react";
import { Layout } from "../containers/Layout";
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Participant } from "../components/Participant";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ParticipantsTable } from "../components/ParticipantsTable";
import { Pagination } from "../components/Pagination";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const theme = createTheme();

const transformParticipant = (participant) => ({
  ...participant,
  name: `${participant.firstName} ${participant.lastName}`,
});

const getParticipants = (fields, { limit = 20, page = 0 }) => {
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

const updateParticipant = (participant) => {
  const params = new URLSearchParams(participant);

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

const createParticipant = (participant) => {
  const params = new URLSearchParams(participant);

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

const deleteParticipant = (participantId) => {
  const params = new URLSearchParams(participantId);

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: participantId }),
  };

  return fetch("/api/participants/delete", options).then((result) =>
    result.json()
  );
};

export default function Home() {
  const [participants, setParticipants] = useState([]);
  const limit = 20; // TODO: add method for changings results on the page
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [search, setSearch] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState({});
  const [refresh, setRefresh] = useState(false); // TODO: hacky way to get react to re-render. Should be updating the local state instead.

  const pages = Math.floor(totalResults / limit);

  useEffect(() => {
    getParticipants({ q: search }, { page, limit })
      .then(({ results, metadata }) => {
        setTotalResults(metadata.total);
        setParticipants(results);
      })
      .catch(({ error, errorCode }) => {
        console.log("[ERROR] error fetching participants", {
          error,
          errorCode,
        });
      });
  }, [page, search, refresh]);

  const onParticipantUpdateClick = () => {
    updateParticipant(selectedParticipant).then((newParticipant) => {
      setSelectedParticipant(newParticipant);
      setRefresh(!refresh);
    });
  };

  const onParticipanCreateClick = () => {
    createParticipant(selectedParticipant).then((newParticipant) => {
      setSelectedParticipant(newParticipant);
      setRefresh(!refresh);
    });
  };

  const onSearchChange = ({ target }) => {
    setSearch(target.value);
  };

  const onEditParticipantClick = (participantId) => () => {
    setShowEditModal(true);
    setSelectedParticipant(participants.find(({ id }) => id === participantId));
  };

  const onDeleteParticipantClick = (participantId) => () => {
    deleteParticipant(participantId);
    setRefresh(!refresh);
  };

  const onParticipantChange =
    (prop) =>
    ({ target }) => {
      setSelectedParticipant({ ...selectedParticipant, [prop]: target.value });
    };

  const onOpenCreateModal = () => {
    setSelectedParticipant({});
    setShowCreateModal(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Layout
        title="New Beginnings Trial Admin"
        metaDesecription="New Beginnings trial admin interface"
      >
        <Dialog open={showEditModal} onClose={() => setShowEditModal(false)}>
          <DialogTitle>Update Participant</DialogTitle>
          <Box p={2}>
            <Participant
              onChange={onParticipantChange}
              participant={selectedParticipant}
            />
            <Button variant="contained" onClick={onParticipantUpdateClick}>
              Update
            </Button>
          </Box>
        </Dialog>

        <Dialog
          open={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        >
          <DialogTitle>Create new Participant</DialogTitle>
          <Box p={2}>
            <Participant
              onChange={onParticipantChange}
              participant={selectedParticipant}
            />
            <Button variant="contained" onClick={onParticipanCreateClick}>
              Create
            </Button>
          </Box>
        </Dialog>

        <Button variant="contained" onClick={onOpenCreateModal}>
          Create new participant
        </Button>

        <TextField
          label="Search"
          id="search"
          value={search}
          fullWidth
          margin="normal"
          onChange={onSearchChange}
        />

        <Pagination
          onNextClicked={() => {
            setPage(page + 1);
          }}
          onPrevClicked={() => {
            setPage(page - 1);
          }}
          page={page}
          totalPages={pages}
          totalResults={totalResults}
          limit={limit}
        />

        <ParticipantsTable
          participants={participants}
          onEditParticipantClick={onEditParticipantClick}
          onDeleteParticipantClick={onDeleteParticipantClick}
        />
      </Layout>
    </ThemeProvider>
  );
}
