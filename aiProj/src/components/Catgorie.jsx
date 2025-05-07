import {useContext} from 'react'
import { commonContext } from "../App";

const Catgorie = ({item}) => {
    const {setCategory} = useContext(commonContext);
    function handleClick(item){
        setCategory(item);
    }
  return (
    <div
      className="inline-flex justify-center items-center m-2 hover:bg-[#424242] rounded-full px-3 py-1 duration-150 text-white bg-transparent  border-[#424242] border-1 cursor-pointer"
      onClick={() => handleClick(item)}
    >
      <span className="text-sm">{item}</span>
    </div>
  );
};

export default Catgorie;
