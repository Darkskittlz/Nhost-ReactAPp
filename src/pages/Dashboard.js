import styles from '../styles/pages/Dashboard.module.css';
import { useUserData } from '@nhost/react'
import { Helmet } from 'react-helmet';
import { gql, useMutation, useQuery } from '@apollo/client';
import styled from 'styled-components';
import AddTodo from '../components/TodoInput';
import { ADD_NOTE, GET_NOTES, GET_TODOS, REMOVE_TODO, TOGGLE_COMPLETED } from "../graphql/queries";
import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import Todo from '../components/TodoInput';

const Header = styled.h1`
  font-size: 30px;
  font-weight: 800;
`

function Notes( id, content, created_at, completed ) {
  const { loading, error, data } = useQuery(GET_NOTES, {
    variables: { 
      id,
      content,
      created_at,
      completed
    }
  })

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Header>Fruits</Header>
      {data.NotesTable.map(( user, id, content, created_at, completed)  => (
        <FormGroup user={user} key={id} label="label">
          <FormControlLabel completed={TOGGLE_COMPLETED} control={<Checkbox />} label={user.content} />
        </FormGroup>
      ))}
    </>
  );
}

// Event Triggers store their data in the underlying database and hence different 
// instances acting on the same data can cause undefined behaviour during run-time. 
// This should not be a problem if the Hasura instances have the same metadata.


const Dashboard = ({ todo }) => { 
  const user = useUserData();

  return (
    <>
      <Helmet>
        <title>Dashboard - Nhost</title>
      </Helmet>

      <div>
        <h2 className={styles.title}>Dashboard</h2>

        <p className={styles['welcome-text']}>
          Welcome, {user?.metadata?.firstName || 'stranger'}{' '}
          <span role="img" alt="hello">
            👋
          </span>
        </p>
      </div>

      <Notes />
      <Todo />
    </>
  );
};

export default Dashboard;