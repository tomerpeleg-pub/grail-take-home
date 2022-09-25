import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Layout } from "../containers/Layout";

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
  name: `${first_name} ${last_name}`,
  phoneNumber: phone_numer,
  address: address,
  postcode: postcode,
  dateOfBirth: date_of_birth,
  trialStatus: trial_status,
});

export default function Home() {
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    fetch("/api/participants")
      .then((result) => result.json())
      .then(({ results }) => results.map(transformParticipant))
      .then((results) => setParticipants(results))
      .catch(({ error, errorCode }) => {
        console.log("[ERROR] error fetching participants", {
          error,
          errorCode,
        });
      });
  }, []);

  return (
    <Layout
      title="New Beginnings Trial Admin"
      metaDesecription="New Beginnings trial admin interface"
    >
      <table>
        <thead>
          <tr>
            <th>Reference</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Postcode</th>
            <th>Date of Birth</th>
            <th>Trial Status</th>
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
              <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{phoneNumber}</td>
                <td>{address}</td>
                <td>{postcode}</td>
                <td>{dateOfBirth}</td>
                <td>{trialStatus}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </Layout>
  );
}
