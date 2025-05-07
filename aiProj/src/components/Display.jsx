import formatResponse from "../app/format";
import LoadingDots from "./Loading";
const Display = (props) => {
    
  return (
    <div className="w-1/2 m-auto mb-44">
        {
            props.convo.map((item,index)=>{ 
                return(
                    item.role === 'user' ?
                    <div key={index} className="relative flex items-center justify-end mt-2 mr-2 text-white  ">
                        <div className="w-fit bg-[#424242] rounded-md p-3 py-5">
                            {item.content}
                        </div>
                        </div>
                    :item.role === 'loading' ?
                    <LoadingDots key={index} />
                    :
                    <div key={index} className={`relative flex flex-col justify-start mt-2 ml-2 text-white overflow-hidden ${index===props.convo.length-1 && ' animate-[typeLoadAnim_3s_ease-in-out]'}`} dangerouslySetInnerHTML={{ __html: formatResponse(item.content) }} />
                )})
        }
    </div>
  )
}

export default Display