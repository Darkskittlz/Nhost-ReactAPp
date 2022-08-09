import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { ADD_NOTE, GET_NOTES } from "../graphql/queries";
import "../styles/components/Task.module.css"

const updateCache = (cache, { data }) => {
  const existingNotes = cache.readQuery({
    query: GET_NOTES,
  });

  const newNote = data.insert_todos_one;
  cache.writeQuery({
    query: GET_NOTES,
    data: { todos: [...existingNotes.notes, newNote] },
  });
};

const CREATE_FRUIT_MUTATION = gql`
    mutation CreateFruit(
        $input: content!) {
        content(input: $input) {
            fruit
            content 
            id
        }
    }
`




// By nesting we have room at the top level of `input`
// to add fields like `password`, or metadata fields like
// `clientMutationId` for Relay. We could also deprecate
// `person` in the future to use another top level field
// like `partialPerson`.
// The `id` field represents who we want to update.
// The `patch` field represents what we want to update.

// const CREATE_FRUIT_MUTATION = gql`
// mutation upsert_fruit(
//   $objects: [ Name ],
//   $on_conflict: Name
// ) {...}
// `;





export default function Todo ({isPublic = false}) {
  let input;
  const [fruit, setFruit] = useState("");

  const updateCache = (cache, {data}) => {
    // If this is for the public feed, do nothing
    if (isPublic) {
      return null;
    }
    // Fetch the notes from the cache
    const existingNotes = cache.readQuery({
      query: GET_NOTES
    });
    // Add the new todo to the cache
    const newNote = data.insert_notes.returning[0];
    cache.writeQuery({
      query: GET_NOTES,
      data: {notes: [newNote, ...existingNotes.notes]}
    });
  };

  const [addFruit, {data, loading, error}] = useMutation(CREATE_FRUIT_MUTATION, {update: updateCache});


  if (loading) return "submitting...";
  if (error) return `submission Error! ${error.message}`;

  const submitTask = () => {
    addFruit({ variables: { fruit } });
    setFruit("");
  };

  return (

    <div>
        <form 
          className="formInput"
          onSubmit={e => {
            e.preventDefault();
            addFruit({ variables: { todo: fruit, isPublic }});
            input.value='';
          }}>
          <div>
            <input
              type="text"
              placeholder="Add a new task"
              className="input"
              value={fruit}
              onChange={(e) => setFruit(e.target.value)}
              ref={n => (input = n)}
            />
            <button 
              type="submit"
              onClick={() => {
                  addFruit({variables: {input}})
                }}
              >
              Add Fruit
            </button>
          </div>
        </form>
    </div>
  );
}



