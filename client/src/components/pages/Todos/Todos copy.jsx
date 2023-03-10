import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTodo,
  getSingleTodo,
  loadTodos,
  updateTodo,
  addTodo,
} from "../../../store/actions/todosActions";
import AddTodoForm from "../../form/add-todo/AddTodoForm";
import moment from "moment";
import Modal from "../../UI/modal/Modal";
import UpdateTodoForm from "../../form/update-todo/UpdateTodoForm";
import TodoButton from "../../UI/buttons/TodoButton";
import { breakpoints } from "../../../utils/data-arrays/arrays";
import * as uiConstants from "../../../utils/constants/ui.constants";
import AddButton from "../../UI/buttons/AddButton";
import "../Todos/Todos.css";
import "../../../styles/App.css";
import Masonry from "react-masonry-css";

const Todos = () => {
  const [deleteId, setDeleteId] = useState();
  const [activeModal, setActiveModal] = useState(null);
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);
  const user = useSelector((state) => state.auth.auth.user);
  const dateNow = Date.now();

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch])

  
  const newTodoHandler = () => {
    setActiveModal("create");
  }

  useEffect(() => {
    console.log(todos)
    console.log(user)
  }, [todos])

  const createTodo = (newTodo) => {
    dispatch(addTodo(newTodo));
    setActiveModal(null);
  }

  const handleTodoDelete = (id) => {
    dispatch(deleteTodo(id));
    setDeleteId(id);
  }

  // Update todo

  const handleTodoUpdate = (id) => {
    dispatch(getSingleTodo(id));
    setActiveModal("update");
  }

  const updateTodoData = (updatedData) => {
    dispatch(updateTodo(updatedData, updatedData.id));
    setActiveModal(null);
  }

  const handleTodoComplete = (id) => {
    const indexOfDoneItem = todos.find((item) => item._id === id);
    indexOfDoneItem.status = "done";
    dispatch(updateTodo(indexOfDoneItem, indexOfDoneItem._id));
  }

  const handleTodoReopen = (id) => {
    const indexOfReopenItem = todos.find((item) => item._id === id);
    indexOfReopenItem.status = "inprocess";
    dispatch(updateTodo(indexOfReopenItem, indexOfReopenItem._id));
  }

  const closeModal = () => {
    setActiveModal(null);
  }

  return (
    <div className="todos">
      {activeModal && 
        <Modal active={activeModal} close={closeModal}>
          {activeModal === "create" ? 
            <AddTodoForm create={createTodo} /> : null
          } 
          {activeModal === "update" ? 
           <UpdateTodoForm update={updateTodoData} /> : null
          }
        </Modal>
      }
      <div className="add-todo">
        <AddButton
          className={"add-todo-btn"}
          icon={"bi bi-plus"}
          action={() => newTodoHandler()}
          title={uiConstants.newTask}
        />
      </div>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {todos.map((todo, index) => {
          console.log(todo.status)

          if ((todo.user === user.id)) {

          const startTodoDate = moment(todo.startTime).format("DD.MM.YYYY HH:mm");
          const endTodoDate = Date.parse(todo.endTime);
          const checkStatus = endTodoDate <= dateNow && todo.status !== "done";

          return (
            <div className={`todo-item
            ${endTodoDate <= dateNow && todo.status !== "done" ? "overdue" : ""}
            ${todo.status === "done" ? "done" : ""}
            ${deleteId === todo._id ? "delete-animation" : ""}`}
              key={index}
            >
              <div className={`todo-item__back ${checkStatus ? "overdue" : ""}`}></div>
              <div className={"todo-item__inner"}>
                <div className={`icon-done ${todo.status === "done" ? "completed" : ""}`}>
                  <i className="bi bi-check-all"></i>
                </div>
                <div className="todo-item__title">{todo.title}</div>
                <div className="todo-item__description">{todo.description}</div>
                <div className="separate"></div>
                <div className="time-info">
                  <span className="time-text">{uiConstants.startTime}</span>
                  <span className="start-time">{startTodoDate}</span>
                  <span className="time-text">{uiConstants.endTime}</span>
                  <span className="end-time">
                    {moment(endTodoDate).format("DD.MM.YYYY HH:mm")}
                  </span>
                </div>
            </div>
            <div className="todo-btns">
                  <ul className="todo-btns__inner">
                    <li className="todo-btns__item">
                      <TodoButton
                        action={() => handleTodoComplete(todo._id)}
                        classNameBtn={"todoend-btn"}
                        classNameIcon={"bi bi-check2-square"}
                        title={uiConstants.title??omplete}
                      />
                    </li>
                    <li className="todo-btns__item">
                      <TodoButton
                        action={() => handleTodoUpdate(todo._id)}
                        classNameBtn={"todoupdate-btn"}
                        classNameIcon={"bi bi-arrow-clockwise"}
                        title={uiConstants.titleUpdate}
                      />
                    </li>
                    <li className="todo-btns__item">
                      <TodoButton
                        action={() => handleTodoDelete(todo._id)}
                        classNameBtn={"tododel-btn"}
                        classNameIcon={"bi bi-trash3"}
                        title={uiConstants.titleDelete}
                      />
                    </li>
                    <li className="todo-btns__item">
                      <TodoButton
                        action={() => handleTodoReopen(todo._id)}
                        classNameBtn={"todoreopen-btn"}
                        classNameIcon={"bi bi-arrow-counterclockwise"}
                        title={uiConstants.titleReopen}
                      />
                    </li>
                  </ul>
                </div>

          </div>
          );
          }
        })}
      </Masonry>
    </div>
  );
};

export default Todos;
