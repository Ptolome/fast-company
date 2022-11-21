import React from "react"


const SearchStatus = (length) => {
    
        let text =  length>=4 || length===1 ? 
          (' человек тусанет с тобой сегодня'):(' человекa тусанут с тобой сегодня')
        
             
      
        return (
          <h1><span
          className="badge bg-primary">
            {length}
            {text} 
              
          </span></h1>
        )
  
  
     
};

export default SearchStatus;