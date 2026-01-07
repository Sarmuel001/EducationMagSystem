import React from "react";
import Layout from "../../layout";
import HomeCarousel from "../carousel";

const Home = () => {
  return (
    <Layout> 
      <div className='flex flex-row flex-1 m-0 lg:ml-35 lg:m-29 z-0 static '> 
      <div className="w-200 lg:pt-[0px] pt-[90px] md:pt-[90px]" >
      <HomeCarousel/>
        <h1 className="text-3xl font-bold text-blue-900">  Greetings from the Team e - MS </h1>
        
        <p className="mt-4 text-gray-700">This software is designed to help students prepare for external examinations such as WAEC, NECO, NABTEB, JAMB AND POSTUTME</p>

        {/* <h2 className="text-xl font-semibold mt-6">How to Register?</h2>
        <p className="text-gray-600">Click on "Registration", fill in your details, and select four subjects to practice.</p>

        <h2 className="text-xl font-semibold mt-6">How to Take the Test?</h2>
        <p className="text-gray-600">Click on "Take a Test", log in with your phone number, and begin the test.</p>

        <h2 className="text-xl font-semibold mt-6">How to Take the Test?</h2>
        <p className="text-gray-600">Click on "Take a Test", log in with your phone number, and begin the test. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, reprehenderit! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe, maiores repellat dicta deserunt reiciendis autem rem aut illum  </p> */}


        
      </div>

      </div>
    </Layout>
  );
};

export default Home;

// import React from "react";
// import Layout from "../../layout";

// const Home = () => {
//   return (
//     <Layout>
//       <div style={{ 
//         width:'100%', 
//         marginLeft: "220px", padding: "20px" }}>
//         <h1>Welcome to JAMB e-Testing Practice</h1>
//         <p>This software is designed to help students prepare for UTME/JAMB exams.</p>

//         <h2>How to Register?</h2>
//         <p>Click on "Registration", fill in your details, and select four subjects to practice.</p>

//         <h2>How to Take the Test?</h2>
//         <p>Click on "Take a Test", log in with your phone number, and begin the test.</p>

//         <div style={{ background: "#ffffcc", padding: "10px", marginTop: "20px" }}>
//           <strong>Unused PIN Serial Number:</strong> SDQGRSPJ-470
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Home;
