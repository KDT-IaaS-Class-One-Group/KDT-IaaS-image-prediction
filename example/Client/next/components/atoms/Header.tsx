
  import React from "react";

  interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
    
  }
  const Header: React.FC<HeaderProps> = ({ children, style, ...props }) => {
    
    return (
      <header style={style} {...props}>
        {children}
      </header>
    );
  };

  export default Header;
