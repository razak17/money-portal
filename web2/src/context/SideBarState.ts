import React, { createContext } from "react";

type contextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Initial state
const initialState: contextType = {
  open: false,
  setOpen: () => {},
};

export const SideBarContext = createContext(initialState);
