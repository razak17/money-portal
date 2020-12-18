import { useParams } from "react-router-dom";

export const useGetIntId = () => {
  const { id } = useParams<{ id: string }>();
  const intId = parseInt(id);

  return intId;
};
