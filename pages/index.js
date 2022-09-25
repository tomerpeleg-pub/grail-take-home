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

const getParticipants = (fields, { limit = 20, page = 0 }) => {
  const searchParams = new URLSearchParams();
  searchParams.append("limit", limit);
  searchParams.append("start", page * limit);

  return fetch("/api/participants?" + searchParams.toString())
    .then((result) => result.json())
    .then(({ results, ...rest }) => ({
      ...rest,
      results: results.map(transformParticipant),
    }));
};

export default function Home() {
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState();
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const pages = Math.ceil(totalResults / limit);

  useEffect(() => {
    getParticipants({}, { page, limit })
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
  }, [page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <Layout
      title="New Beginnings Trial Admin"
      metaDesecription="New Beginnings trial admin interface"
    >
      <div>
        <p>Total results: {totalResults}</p>
        <p>Page: {page}</p>
        <p>
          Pages: {pages} Results per page: {limit}
        </p>
      </div>
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
              <tr key={id}>
                <th>{id}</th>
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

      <button onClick={prevPage} disabled={page === 0}>
        Prev
      </button>
      <button onClick={nextPage} disabled={page === pages}>
        Next
      </button>
    </Layout>
  );
}
