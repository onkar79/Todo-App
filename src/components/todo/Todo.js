import React, { useState } from "react";
import styled from "styled-components";
import TodoList from "../todoList/TodoList";
import "./todo.css";
import editWhite from "../../assets/icons/editWhite.png";
import addWhite from "../../assets/icons/addWhite.png";
import deleteIcon from "../../assets/icons/delete.png";

const Container = styled.div`
  box-sizing: border-box;
  background: white;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
  color: rgb(83, 168, 202);
  margin: 1em 1em;
  width: 400px;
  height: 580px;
  overflow: hidden;
`;

const DateContainer = styled.div`
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 10px 10px;
`;
const AddTodo = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 5px 10px 10px 10px;
  align-items: center;
  height: 55px;
`;
const TodoInput = styled.input`
  background: transparent;
  border-radius: 3px;
  border: 2px solid rgb(83, 168, 202);
  width: 80%;
  height: 23px;
  &:focus {
    outline: none;
    border: 2px solid rgb(83, 168, 202);
  }
`;
const Button = styled.button`
  background: rgb(83, 168, 202);
  border-radius: 50%;
  border: 2px solid rgb(83, 168, 202);
  color: white;
  height: 40px;
  width: 40px;
  cursor: pointer;
  float: right;
`;
const TodoActions = styled.div`
  width: 100%;
  height: 35px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 10px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 3px 3px;
`;
const TaskSpan = styled.span`
  font-size: 13px;
  color: #c0c0c0;
`;

let idx;
const newDate = new Date();
const date = newDate.getDate();
const month = newDate.toLocaleString("default", { month: "long" });
const day = newDate.toLocaleDateString("locale", { weekday: "long" });

export const Todo = () => {
  const [textQuery, setTextQuery] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const handleTextChange = (e) => {
    setTextQuery(e.target.value);
  };

  const addTask = () => {
    if (!textQuery.trim()) return;
    if (editMode) {
      setTasks(
        tasks &&
          tasks.map((item) =>
            item.date === idx.date ? { ...item, name: textQuery } : item
          )
      );
      setEditMode(false);
    } else {
      setTasks([
        ...tasks,
        { name: textQuery, date: Date.now(), completed: false },
      ]);
    }
    setTextQuery("");
  };

  const editTask = (task) => {
    setEditMode(true);
    idx = tasks.find((item) => item.date === task.date);
    setTextQuery(task.name);
  };

  const deleteTask = (task) => {
    setTasks(tasks.filter((item) => item.date !== task.date));
  };

  const markComplete = (task) => {
    setTasks(
      tasks &&
        tasks.map((item) =>
          item.date === task.date
            ? { ...item, completed: task.completed === true ? false : true }
            : item
        )
    );
  };

  const selectMultiple = (task) => {
    const isExist = selectedTasks.find((item) => item.date === task.date);

    if (isExist) {
      setSelectedTasks(selectedTasks.filter((item) => item.date !== task.date));
    } else {
      setSelectedTasks([...selectedTasks, task]);
    }
  };

  const deleteSelectedTasks = () => {
    let arr = tasks.filter((el) => !selectedTasks.includes(el));
    setTasks(arr);
    document.getElementById("check_1").checked = false;
  };

  return (
    <Container className="container">
      <DateContainer className="date_container">
        <div
          style={{
            width: "100%",
            fontWeight: "700",
            fontSize: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "40px",
          }}
        >
          <span>{`${day}, ${date} ${month}`}</span>
          <TaskSpan>{`${tasks.length} Tasks`}</TaskSpan>
        </div>
      </DateContainer>
      <AddTodo className="add_todo">
        <TodoInput
          value={textQuery}
          placeholder="Add a task.."
          onChange={handleTextChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
        ></TodoInput>
        <Button onClick={addTask}>
          <img
            width="15px"
            height="15px"
            src={editMode ? editWhite : addWhite}
            alt="add"
          />
        </Button>
      </AddTodo>
      <TodoActions>
        <div className="section"></div>
        <div className="section">
          <img
            src={deleteIcon}
            alt="delete"
            width={"20px"}
            height={"20px"}
            style={{ cursor: "pointer" }}
            onClick={deleteSelectedTasks}
          />
          <input
            style={{ height: "20px", width: "15px", cursor: "pointer" }}
            type={"checkbox"}
            id="check_1"
            onClick={(e) =>
              e.currentTarget.checked
                ? setSelectedTasks([...tasks])
                : setSelectedTasks([])
            }
          />
        </div>
      </TodoActions>
      <TodoList
        tasks={tasks}
        editTask={editTask}
        deleteTask={deleteTask}
        markComplete={markComplete}
        selectMultiple={selectMultiple}
        selectedTasks={selectedTasks}
      />
    </Container>
  );
};

export default Todo;
