import React from "react";
function TodoList(props) {

    return (
        <>
            <div className="todoStyle">
                <i className="fa fa-times" aria-hidden="true" onClick={() => { props.onSelect(props.id); }} />
                <i class="fa fa-edit" aria-hidden="true" onClick={() => { props.onSelect(props.id); }}></i>
                <li> {props.text} </li>
            </div>
        </>
    )
}
export default TodoList;