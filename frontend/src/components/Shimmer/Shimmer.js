import React from 'react'
import './shimmer.css'

function Shimmer() {
  const repeatCount = 10;
  
  const renderCodeBlock = () => {
    return (
      <div className="row mt-3 d-flex align-items-center">
        <div className="circle"></div>
        <div className="rectangle"></div>
      </div>
    );

  }


  const shimmerCardComponent=()=>{

    return(

      <div className="col-md-4  mb-5">
      <div className="shimmerCard">
          <div className="cardz"></div>
          <div className="rectangles"></div>
          <div className="rectangles"></div>
      </div>
    </div>
    )
  }




  return (

    <div style={{paddingTop:'200px'}}>

<div className="container">

       <div className="row">

        

            <div className="col-md-4">

              <div className="sidebar">
  
              
                   {[...Array(repeatCount)].map((_, index) => (
                     <React.Fragment key={index}>
                       {renderCodeBlock()}
                     </React.Fragment>
                   ))}
    

                </div>

              </div>

            


            <div className="col-md-8">

              <div className="row">   


              {[...Array(repeatCount)].map((_, index) => (
                     <React.Fragment key={index}>
                       {shimmerCardComponent()}
                     </React.Fragment>
                   ))}



               



              </div>

    8
          </div>


         </div>

         </div>
       </div>
    
 

  )
}

export default Shimmer