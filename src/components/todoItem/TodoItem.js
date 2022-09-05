import React from "react";
import styled from "styled-components";
import edit from "../../assets/icons/edit.png";
import deleteIcon from "../../assets/icons/delete.png";

const TodoContainer = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: #f5f5f5;
`;

const TodoTitle = styled.div`
  display: flex;
`;

const TitleSpan = styled.span`
display: flex;
text-align: center;
height: 25px;
padding-left: 4px;
color: task.completed ? grey : rgb(83; 168; 202);
white-space: nowrap;
overflow: hidden;
textOverflow: ellipsis;`;

const TodoAction = styled.span`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
  height: 25px;
  width: 25px;
  &:hover {
    background: #e7e7e7;
    color: rgb(83, 168, 202);
  }
`;
const TodoIcon = styled.img`
  width: 18px;
  height: 18px;
`;

const TodoItem = ({
  task,
  markComplete,
  editTask,
  deleteTask,
  selectMultiple,
  selectedTasks,
}) => {
  return (
    <TodoContainer key={task.date}>
      <TodoTitle>
        <input type={"checkbox"} onClick={() => markComplete(task)} />
        <TitleSpan
          style={{
            textDecoration: task.completed ? "line-through" : "",
            color: task.completed ? "grey" : "rgb(83, 168, 202)",
          }}
        >
          {task.name}
        </TitleSpan>
      </TodoTitle>
      <TodoTitle>
        <TodoAction
          onClick={() => editTask(task)}
          style={{ pointerEvents: task.completed ? "none" : "all" }}
        >
          <TodoIcon src={edit} className="todo_action" alt="edit" />
        </TodoAction>
        <TodoAction onClick={() => deleteTask(task)}>
          <TodoIcon src={deleteIcon} className="todo_action" alt="delete" />
        </TodoAction>
        <TodoAction>
          <input
            style={{ height: "14px", width: "15px" }}
            type={"checkbox"}
            checked={
              selectedTasks &&
              selectedTasks.filter((item) => item.date === task.date).length
            }
            onClick={() => selectMultiple(task)}
          />
        </TodoAction>
      </TodoTitle>
    </TodoContainer>
  );
};

export default TodoItem;
