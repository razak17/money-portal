import * as React from "react";
import { EditTransactionView, TransactionView } from "./";

interface TransactionItemProps {
  id: number;
  index: number;
  amount: number;
  type: string;
  memo: string;
  updatedAt: string;
}

const usePrevious = (value: any) => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const TransactionItem: React.FC<TransactionItemProps> = ({
  id,
  index,
  amount,
  type,
  memo,
  updatedAt,
}) => {
  const [isEditing, setEditing] = React.useState(false);

  const inputFieldRef = React.useRef<HTMLInputElement>(null);
  const editButtonRef = React.useRef<HTMLButtonElement>(null);

  const wasEditing = usePrevious(isEditing);

  React.useEffect(() => {
    if (!wasEditing && isEditing && inputFieldRef.current) {
      inputFieldRef.current.focus();
    } else if (wasEditing && !isEditing && editButtonRef.current)
      editButtonRef.current.focus();
  }, [wasEditing, isEditing]);

  return isEditing ? (
    <EditTransactionView
      id={id}
      amount={amount}
      type={type}
      memo={memo}
      updatedAt={updatedAt}
      setEditing={setEditing}
      inputFieldRef={inputFieldRef}
    />
  ) : (
    <TransactionView
      id={id}
      index={index}
      amount={amount}
      type={type}
      memo={memo}
      updatedAt={updatedAt}
      setEditing={setEditing}
      editButtonRef={editButtonRef}
    />
  );
};
