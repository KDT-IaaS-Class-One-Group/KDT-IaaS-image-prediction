
  import React from "react";

  interface AnchorProps extends React.HTMLAttributes<HTMLElement> {
    href: string;
  }
  const Anchor: React.FC<AnchorProps> = ({ children, style, ...props }) => {
    
    return (
      <a style={style} {...props}>
        {children}
      </a>
    );
  };

  export default Anchor;
