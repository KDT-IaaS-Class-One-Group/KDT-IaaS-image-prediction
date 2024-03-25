
  import React from "react";

  interface H1Props extends React.HTMLAttributes<HTMLElement> {
    
  }
  const H1: React.FC<H1Props> = ({ children, style, ...props }) => {
    
    return (
      <h1 style={style} {...props}>
        {children}
      </h1>
    );
  };

  export default H1;
