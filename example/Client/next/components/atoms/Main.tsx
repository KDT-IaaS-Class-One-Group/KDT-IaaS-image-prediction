
  import React from "react";

  interface MainProps extends React.HTMLAttributes<HTMLElement> {
    
  }
  const Main: React.FC<MainProps> = ({ children, style, ...props }) => {
    
    return (
      <main style={style} {...props}>
        {children}
      </main>
    );
  };

  export default Main;
