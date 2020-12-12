import React from "react";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
};

export const Admin: React.FC = () => {
  const [count, dispatch] = React.useReducer(reducer, 0);

  return (
    <div>
      <div>count: {count}</div>
      <button onClick={() => dispatch({ type: "increment" })}>increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>decrement</button>
    </div>
  );
};
