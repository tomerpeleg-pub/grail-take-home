import Head from "next/head";
import styled from "styled-components";

const Container = styled.div`
  display: block;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

export const Layout = ({ title, metaDesecription, children }) => (
  <Container>
    <Head>
      <title>{title}</title>
      <meta name="description" content={metaDesecription} />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </Head>

    <header>
      <h1>{title}</h1>
    </header>

    <main>{children}</main>
  </Container>
);
