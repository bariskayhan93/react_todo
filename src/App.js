import React, { useState, useEffect } from "react";
import Alert from "./Alert";

function App() {
  const [text, setText] = useState("");
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState(null);
  const [foods, setFoods] = useState(
    JSON.parse(localStorage.getItem("foods")) || []
  );
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const submitHandler = (e) => {
    e.preventDefault();
    if (!text) {
      showAlert(true, 'danger', 'please enter value');
    }else if(text||edit){
      const newItem = { id: new Date().getTime().toString(), title: text };
      setFoods((foods) => {
        return [...foods, newItem];
      });
      showAlert(true, 'success', 'Succesful');
    } 
    setText("");
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const removeHandler = (id) => {
    const deleteItem = foods.filter((item) => item.id !== id);
    const removedItem = foods.find((item) => item.id === id);
    showAlert(true, 'danger', `${removedItem.title} deleted succesfuly`);
    setFoods(deleteItem);
  };

  const editHandler = (id) => {
    const editedItem = foods.find((item) => item.id === id);
    setEdit(true);
    setEditID(id);
    setText(editedItem.title);
    const deleteItem = foods.filter((item) => item.id !== id);
    showAlert(true, 'dark', `${editedItem.title} is ready`);
    setFoods(deleteItem);
  };

  useEffect(() => {
    localStorage.setItem("foods", JSON.stringify(foods));
  }, [foods]);

  return (
    <section>
      <form onSubmit={submitHandler} className="grocery-container">
        <div className="section-center form-control">
          <label>Foods:</label>
          <input
            type="text"
            placeholder="e.g. eggs"
            value={text}
            name="text"
            onChange={(e) => setText(e.target.value)}
          ></input>
          <button className="submit-btn btn" type="submit">
            Submit
          </button>
        </div>
      </form>
      {alert.show && <Alert {...alert} removeAlert={showAlert} foods={foods} />}
      <div className="section section-center">
        {foods.map((food) => {
          const { id, title } = food;
          return (
            <article key={id} className="form-control " >
              <section className="grocery-form" >
                <div className="grocery-item">
                  <p className="title">{title} </p>
                  <button
                    type="button"
                    className="edit-btn" 
                    onClick={() => editHandler(id)}
                  >
                    {" "}
                    edit
                  </button>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => removeHandler(id)}
                  >
                    {" "}
                    delete
                  </button>
                </div>
              </section>
            </article>
          );
        })}
        <button
          type="button"
          className="clear-btn"
          onClick={() => setFoods([])}
        >
          Clear Items
        </button>
      </div>
    </section>
  );
}

export default App;
