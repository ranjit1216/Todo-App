import React, { useEffect, useState } from 'react'


const getlocalitems = () => {
  let list = localStorage.getItem('lists');
  console.log(list);
  if (list) {
    return JSON.parse(localStorage.getItem('lists'))
  } else {
    return []
  }
}

const Todo = () => {
  const [inputlist, setInputlist] = useState()
  const [items, setItems] = useState(getlocalitems());
  const [toggle, setToggle] = useState(true);
  const [editItem, setEditItem] = useState(null)

  function itemEvent(event) {
    setInputlist(event.target.value)
  }

  function listOfItems() {
    if (!inputlist) {
      return alert("Please fill data ...")
    } else if (inputlist && !toggle) {
      setItems(
        items.map((ele) => {
          if (ele.id === editItem) {
            return { ...ele, name: inputlist }
          }
          return ele;
        })
      )
      setToggle(true);
      setInputlist("")
      setEditItem(null)

    } else {
      const allInputData = { id: new Date().getTime().toString(), name: inputlist }
      setItems([allInputData, ...items])
      setInputlist("")
    }

  }
  function deleteItems(index) {
    // console.log("deleted");
    const updatedItems = items.filter((arrEle) => {
      return index !== arrEle.id;
    })
    setItems(updatedItems);
  }

  // edit fun

  const editItems = (id) => {
    let neweditItem = items.find((ele) => {
      return ele.id === id;
    })
    console.log(neweditItem);
    setToggle(false);
    setInputlist(neweditItem.name)
    setEditItem(id)
  }


  function removeAll() {
    setItems([])
  }

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(items))
  }, [items]);

  return (<>
    <>
      <div className="mainDiv ">
        <div className="centerDIv"><br />
          <h1>ToDo list</h1><br />

          <div className='addItems'>
            <input type={"text"} placeholder="✍️ Add items..." value={inputlist} onChange={itemEvent}></input>

            {
              toggle ? <i className="fa fa-plus" aria-hidden="true" onClick={listOfItems}></i> : <i className="fa fa-edit" aria-hidden="true" onClick={listOfItems}></i>
            }
          </div>

          <ol>
            {/* <li> {inputlist} </li> */}
            {items.map((itemval) => {
              return (
                <>
                  <div className="todoStyle" key={itemval.id}>
                    <h3> {itemval.name} </h3>
                    <div className='icon'>
                      <i className="fa fa-times" aria-hidden="true" onClick={() => { deleteItems(itemval.id) }} />
                      <i className="fa fa-edit" aria-hidden="true" onClick={() => { editItems(itemval.id) }}></i>
                    </div>
                  </div>
                </>
              )
              //  <TodoList
              //   key={itemval.id}
              //   id={itemval.id}
              //   text={itemval.name}
              //   onSelect={deleteItems}
              //   onSelect={editItems}

              // />
            })}
          </ol>
          <div className='showItems'>
            <button className='btn-effect04' data-sm-link-text="Remove All" onClick={removeAll}><h4>Remove all</h4></button>
          </div>
        </div>
      </div>
    </>
  </>
  )
}

export default Todo;