import React from "react";
import styled from "styled-components";
import TodoItem from "../todoItem/TodoItem";

const Container = styled.div`
  margin-top: 8px;
  width: 100%;
  height: auto;
  display: grid;
  grid-auto-rows: min-content;
  grid-gap: 2px;
  height: 415px;
  overflow-y: auto;
`;

const TodoList = ({
  tasks,
  editTask,
  deleteTask,
  markComplete,
  selectMultiple,
  selectedTasks,
}) => {
  return (
    <Container>
      {tasks.map((task) => {
        return (
          <TodoItem
            key={task.date}
            task={task}
            markComplete={markComplete}
            editTask={editTask}
            deleteTask={deleteTask}
            selectMultiple={selectMultiple}
            selectedTasks={selectedTasks}
          />
        );
      })}
    </Container>
  );
};

export default TodoList;
