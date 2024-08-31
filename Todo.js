import { useEffect, useState } from "react";
// To get data from local storage

const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};
const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [edittItem, setEdittItem] = useState(null);
  // Add Item
  const addItem = () => {
    if (!inputData) {
      alert("Enter Something");
    } else if (inputData && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === edittItem) {
            return { ...elem, name: inputData };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setInputData('');
      setEdittItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };

  // Delete Item
  const deleteItem = (index) => {
    const updatedItem = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updatedItem);
  };

  // Edit Item
  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setEdittItem(id);
  };

  // Local Storage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <div className="todo-container">
      <div className="heading">
        <h1>Anjul's Todo</h1>
      </div>
      <div className="addItems">
        <input
          type="text"
          placeholder="Enter Task Here"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        {toggleSubmit ? (
          <button onClick={addItem}>
            <i className="fa-solid fa-address-book"></i>
          </button>
        ) : (
          <button onClick={addItem}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        )}
      </div>
      <div className="show-items">
        {items.map((ele, i) => {
          return (
            <div className="eachItem" key={ele.id}>
              <h3>{ele.name}</h3>
              <div className="btn-div">
                <button
                  onClick={() => {
                    editItem(ele.id);
                  }}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button onClick={() => deleteItem(ele.id)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Todo;


