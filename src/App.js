import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);

  function updateText(id, inputText) {
    let updateList = todoList.map((e) => {
      if (e.id === id) {
        e.text = inputText;
      }
      return e;
    });

    setTodoList(updateList);
  }
  function handleDelete(id) {
    console.log(id);
    const updateList = todoList.filter((e) => {
      return e.id !== id;
    });

    setTodoList(updateList);
  }

  function handleComplete(id) {
    let updateList = todoList.map((e) => {
      if (e.id === id) {
        e.complete = !e.complete;
      }
      return e;
    });

    setTodoList(updateList);
  }
  function handleOnKeyDown(e) {
    if (e.key === "Enter") {
      setTodoList([
        ...todoList,
        { text: e.target.value, completed: false, id: Date.now() },
      ]);
      e.target.value = "";
    }
  }
  return (
    <div className="App">
      <input type="text" onKeyDown={handleOnKeyDown} />

      {todoList.map((e) => {
        return (
          <>
            <Item
              key={e.id}
              text={e.text}
              id={e.id}
              complete={e.complete}
              handleComplete={handleComplete}
              handleDelete={handleDelete}
              updateText={updateText}
            />
          </>
        );
      })}
    </div>
  );
}

const Item = ({
  text,
  handleComplete,
  complete,
  id,
  handleDelete,
  updateText,
}) => {
  const [editText, setEditText] = useState(false);
  const [inputText, setText] = useState(text);
  console.log(editText);
  return (
    <main className="item">
      <div
        className="complete"
        onClick={() => {
          handleComplete(id);
        }}
      >
        {complete ? <span>✓</span> : ""}
      </div>
      <div
        onDoubleClick={() => {
          setEditText(true);
        }}
        className={complete ? "textOver" : ""}
      >
        {editText ? (
          <input
            value={inputText}
            onChange={(e) => {
              setText(e.target.value);
            }}
            onBlur={() => {
              setEditText(false);
              updateText(id, inputText);
            }}
          />
        ) : (
          inputText
        )}
      </div>
      <div
        className="close"
        onClick={() => {
          handleDelete(id);
        }}
      >
        X
      </div>
    </main>
  );
};

export default App;
