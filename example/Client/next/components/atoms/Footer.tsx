
  import React from "react";

  interface FooterProps extends React.HTMLAttributes<HTMLElement> {
    
  }
  const Footer: React.FC<FooterProps> = ({ children, style, ...props }) => {
    
    return (
      <footer style={style} {...props}>
        {children}
      </footer>
    );
  };

  export default Footer;
