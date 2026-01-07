import React, { useEffect, useState } from 'react'
import Header from '../../layout/header';

const Errorpage = ()=> {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);

  return (
    <div>
      
      
        <div style={{lineHeight:'30px', marginTop:'200px', textAlign:"center", fontSize:'100%', width:'100%'}}>
      <h3>Hey You are lost, Kindly Call Admin for help or return home</h3>
      <h6>Error 404 Page not found</h6>
      <p>{currentDateTime.toLocaleString()}</p>
      <br />
      <p>
      <a href="/" style={{textDecoration:'none', color:'#218838'}}>Return Home</a>
      </p>
      </div>
      
      </div>

  )
}

export default Errorpage

