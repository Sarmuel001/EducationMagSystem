import React from "react";
import Header from "./header";
import Footer from "./footer";


const Layout = ({ children }) => {
  return (
    <div className=" flex  flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 flex-col lg:ml-52 ">{children}
        
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

// import React from "react";
// import Header from "./header";
// import Footer from "./footer";
// import In from "./in";

// const Layout = ({ children }) => {
//   return (
//     <div style={{ display: "flex", flexDirection: "column", width:'100%'
//     }}>
//       <In />
//       <Header />
//       <div style={{ flex: 1, margin: "60px",paddingTop:'20px'  }}>{children}</div>
//       <Footer />
//     </div>
//   );
// };

// export default Layout;
