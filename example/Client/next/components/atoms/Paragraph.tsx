
  import React from "react";

  interface ParagraphProps extends React.HTMLAttributes<HTMLElement> {
    
  }
  const Paragraph: React.FC<ParagraphProps> = ({ children, style, ...props }) => {
    
    return (
      <p style={style} {...props}>
        {children}
      </p>
    );
  };

  export default Paragraph;
