import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Layout } from "../containers/Layout";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Participant } from "../components/Participant";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const transformParticipant = ({
  id,
  firstName,
  lastName,
  phoneNumber,
  address,
  postcode,
  dateOfBirth,
  trialStatus,
}) => ({
  id,
  firstName: firstName,
  lastName: lastName,
  name: `${firstName} ${lastName}`,
  phoneNumber: phoneNumber,
  address: address,
  postcode: postcode,
  dateOfBirth: dateOfBirth,
  trialStatus: trialStatus,
});

const getParticipants = (fields, { limit = 20, page = 0 }) => {
  const searchParams = new URLSearchParams();
  searchParams.append("limit", limit);
  searchParams.append("start", page * limit);

  Object.keys(fields).forEach((key) => {
    searchParams.append(key, fields[key]);
  });

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

const TableHeader = ({ field, children }) => {
  return <th>{children}</th>;
};

export default function Home() {
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState();
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [search, setSearch] = useState("");
  const [searchFields, setSearchFields] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState({});
  const [refresh, setRefresh] = useState(false);

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

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const onParticipantUpdateClick = () => {
    updateParticipant(selectedParticipant).then((newParticipant) => {
      // TODO: hacky
      setSelectedParticipant(newParticipant);
      setRefresh(!refresh);
    });
  };

  const onParticipanCreateClick = () => {
    createParticipant(selectedParticipant).then((newParticipant) => {
      // TODO: hacky
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
    <Layout
      title="New Beginnings Trial Admin"
      metaDesecription="New Beginnings trial admin interface"
    >
      <Dialog open={showEditModal} onClose={() => setShowEditModal(false)}>
        <DialogTitle>Update Participant</DialogTitle>
        <Box>
          <Participant
            onChange={onParticipantChange}
            participant={selectedParticipant}
          />
          <Button onClick={onParticipantUpdateClick}>Update</Button>
        </Box>
      </Dialog>

      <Dialog open={showCreateModal} onClose={() => setShowCreateModal(false)}>
        <DialogTitle>Update Participant</DialogTitle>
        <Box>
          <Participant
            onChange={onParticipantChange}
            participant={selectedParticipant}
          />
          <Button onClick={onParticipanCreateClick}>Create</Button>
        </Box>
      </Dialog>

      <div>
        <p>Total results: {totalResults}</p>
        <p>Page: {page}</p>
        <p>
          Pages: {pages} Results per page: {limit}
        </p>

        <label>
          Search all fields
          <input id="search" value={search} onChange={onSearchChange} />
        </label>

        <Button onClick={onOpenCreateModal}>Create new participant</Button>
      </div>

      <table>
        <thead>
          <tr>
            <TableHeader>Reference</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Phone Number</TableHeader>
            <TableHeader>Address</TableHeader>
            <TableHeader>Postcode</TableHeader>
            <TableHeader>Date of BirTableHeader</TableHeader>
            <TableHeader>Trial Status</TableHeader>
          </tr>
        </thead>

        <tbody>
          {participants.map(
            ({
              id,
              name,
              phoneNumber,
              address,
              postcode,
              dateOfBirth,
              trialStatus,
            }) => (
              <tr key={id}>
                <th>{id}</th>
                <td>{name}</td>
                <td>{phoneNumber}</td>
                <td>{address}</td>
                <td>{postcode}</td>
                <td>{dateOfBirth}</td>
                <td>{trialStatus}</td>
                <td>
                  <IconButton
                    aria-label="edit"
                    onClick={onEditParticipantClick(id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={onDeleteParticipantClick(id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <button onClick={prevPage} disabled={page === 0}>
        Prev
      </button>
      <button onClick={nextPage} disabled={page === pages}>
        Next
      </button>
    </Layout>
  );
}
