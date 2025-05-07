import { categoryList } from '../app/category'
import Catgorie from './Catgorie';
const Categories = () => {
   
  return (
    <div className="sticky top-0 bg-[#212121] z-10">
        {
            categoryList.map((item,index)=>{
                return(
                    <Catgorie key={index} item={item}/>
                )
            })
        }
    </div>
  )
}

export default Categories