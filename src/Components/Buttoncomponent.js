import React from "react";

export default function Button(props) {
  return (
    <div>
      <button onClick={props.handleClick} disabled={props.disabled}>
        {props.buttontext}
      </button>
    </div>
  );
}
