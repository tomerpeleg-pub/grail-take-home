import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const ParticipantsTable = ({
  participants,
  onEditParticipantClick,
  onDeleteParticipantClick,
}) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Reference</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Phone Number</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>Postcode</TableCell>
          <TableCell>Date of BirTableCell</TableCell>
          <TableCell>Trial Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
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
            <TableRow key={id}>
              <TableCell component="th" scope="row">
                {id}
              </TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{phoneNumber}</TableCell>
              <TableCell>{address}</TableCell>
              <TableCell>{postcode}</TableCell>
              <TableCell>{dateOfBirth}</TableCell>
              <TableCell>{trialStatus}</TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  </TableContainer>
);
