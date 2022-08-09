import React from "react";
import { useMutation } from "@apollo/client";

import { ADD_NOTE, GET_NOTES, GET_TODOS, REMOVE_TODO } from "../graphql/queries";
import "../styles/components/Task.module.css"

const Task = ({ todo }) => {
  const [removeTodoMutation] = useMutation(REMOVE_TODO);

  const toggleCompleted = ({ id, completed }) => {
    toggleCompletedMutation({
        variables: { id, completed: !completed },
        optimisticResponse: true,
        update: (cache) => {
            const existingTodos = cache.readQuery({ query: GET_TODOS });
            const updatedTodo = existingTodos.todos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !completed };
                } else {
                    return todo;
                }
            });
            cache.writeQuery({
                query: GET_TODOS,
                data: { todos: updatedTodo },
            });
        },
    });
  };

  const removeTodo = (id) => {
    removeTodoMutation({
      variables: { id },
      optimisticResponse: true,
      update: (cache) => {
        const existingTodos = cache.readQuery({ query: GET_TODOS });
        const todos = existingTodos.todos.filter((t) => t.id !== id);
        cache.writeQuery({
          query: GET_TODOS,
          data: { todos },
        });
      },
    });
  };

  return (
    <div key={todo.id} className="task">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleCompleted(todo)}
      />
      <span className={todo.completed ? "completed" : ""}>{todo.task}</span>
      <button type="submit" onClick={() => removeTodo(todo.id)}>
        remove
      </button>
    </div>
  );
};

export default Task;



