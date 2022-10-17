import { useQuery } from "./useQuery";

const useGetType = () => {
  let query = useQuery();

  /**
   * @desc if type is `fi`, you will get only finnish player,  if this is `all` , you will get for all countries
   */

  return query.get("all") == "true";
};

export default useGetType;
