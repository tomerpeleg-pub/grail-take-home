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

const transformParticipant = ({
  id,
  first_name,
  last_name,
  phone_numer,
  address,
  postcode,
  date_of_birth,
  trial_status,
}) => ({
  id,
  firstName: first_name,
  lastName: last_name,
  name: `${first_name} ${last_name}`,
  phoneNumber: phone_numer,
  address: address,
  postcode: postcode,
  dateOfBirth: date_of_birth,
  trialStatus: trial_status,
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
  const [showParticipantModal, setShowParticipantModal] = useState(false);
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
      setRefresh(true);
    });
  };

  const onSearchChange = ({ target }) => {
    setSearch(target.value);
  };

  const modifyParticipant = (participantId) => () => {
    setShowParticipantModal(true);
    setSelectedParticipant(participants.find(({ id }) => id === participantId));
  };

  const onParticipantChange =
    (prop) =>
    ({ target }) => {
      setSelectedParticipant({ ...selectedParticipant, [prop]: target.value });
    };

  return (
    <Layout
      title="New Beginnings Trial Admin"
      metaDesecription="New Beginnings trial admin interface"
    >
      <Dialog
        open={showParticipantModal}
        onClose={() => setShowParticipantModal(false)}
      >
        <DialogTitle>Update Participant</DialogTitle>
        <Box>
          <TextField
            fullWidth
            margin="normal"
            id="participant_id"
            label="Reference"
            value={selectedParticipant.id}
            onChange={onParticipantChange("id")}
            disabled
          />
          <TextField
            fullWidth
            margin="normal"
            id="participant_first_name"
            label="First Name"
            value={selectedParticipant.firstName}
            onChange={onParticipantChange("firstName")}
          />
          <TextField
            fullWidth
            margin="normal"
            id="participant_last_name"
            label="Surname"
            value={selectedParticipant.lastName}
            onChange={onParticipantChange("lastName")}
          />
          <TextField
            fullWidth
            margin="normal"
            id="participant_address"
            label="Address"
            value={selectedParticipant.address}
            onChange={onParticipantChange("address")}
          />
          <TextField
            fullWidth
            margin="normal"
            id="participant_postcode"
            label="Postcode"
            value={selectedParticipant.postcode}
            onChange={onParticipantChange("postcode")}
          />
          <TextField
            fullWidth
            margin="normal"
            id="participant_dob"
            label="Date of Birth"
            value={selectedParticipant.dateOfBirth}
            onChange={onParticipantChange("dateOfBirth")}
          />
          <TextField
            fullWidth
            margin="normal"
            id="participant_trial_status"
            label="Trial Status"
            value={selectedParticipant.trialStatus}
            onChange={onParticipantChange("trialStatus")}
          />
          <Button onClick={onParticipantUpdateClick}>Update</Button>
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
                  <button onClick={modifyParticipant(id)}>Edit</button>
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
