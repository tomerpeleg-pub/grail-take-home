import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export const Participant = ({ participant, onChange }) => (
  <Box>
    <TextField
      fullWidth
      margin="normal"
      id="participant_id"
      label="Reference"
      value={participant.id}
      onChange={onChange("id")}
      disabled
    />
    <TextField
      fullWidth
      margin="normal"
      id="participant_firstName"
      label="First Name"
      value={participant.firstName}
      onChange={onChange("firstName")}
    />
    <TextField
      fullWidth
      margin="normal"
      id="participant_lastName"
      label="Surname"
      value={participant.lastName}
      onChange={onChange("lastName")}
    />
    <TextField
      fullWidth
      margin="normal"
      id="participant_address"
      label="Address"
      value={participant.address}
      onChange={onChange("address")}
    />
    <TextField
      fullWidth
      margin="normal"
      id="participant_postcode"
      label="Postcode"
      value={participant.postcode}
      onChange={onChange("postcode")}
    />
    <TextField
      fullWidth
      margin="normal"
      id="participant_dob"
      label="Date of Birth"
      value={participant.dateOfBirth}
      onChange={onChange("dateOfBirth")}
    />
    <TextField
      fullWidth
      margin="normal"
      id="participant_trialStatus"
      label="Trial Status"
      value={participant.trialStatus}
      onChange={onChange("trialStatus")}
    />
  </Box>
);
