import React from "react";

type TVariants = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "a" | "button" | "small";

interface IPropTypes {
  variant?: TVariants;
  children: React.ReactNode | string;
  classNames?: string;
}

const Typography = ({ variant, children, classNames, ...props }: IPropTypes) => {
  // const className = variant ? variants[variant].size : "text-base";
  // const Component = variant ? variants[variant].tag : <p />;
  // const Component = variant
  //   ? React.createElement(variants[variant].tag, { ...props, children, className })
  //   : React.createElement("p", { ...props, children, className });

  switch (variant) {
    case "h1": {
      return (
        <h1 {...props} className={`${classNames} text-3xl lg:text-4xl`}>
          {children}
        </h1>
      );
    }
    case "h2": {
      return (
        <h2 {...props} className={`${classNames} text-2xl lg:text-3xl`}>
          {children}
        </h2>
      );
    }
    case "h3": {
      return (
        <h3 {...props} className={`${classNames} text-2xl`}>
          {children}
        </h3>
      );
    }
    case "h4": {
      return (
        <h4 {...props} className={`${classNames} text-xl`}>
          {children}
        </h4>
      );
    }
    case "h5": {
      return (
        <h5 {...props} className={`${classNames} text-base`}>
          {children}
        </h5>
      );
    }
    case "h6": {
      return (
        <h6 {...props} className={`${classNames} text-sm`}>
          {children}
        </h6>
      );
    }
    case "small": {
      return (
        <p {...props} className={`${classNames} text-xs`}>
          {children}
        </p>
      );
    }
    case "a": {
      return (
        <a {...props} className={`${classNames} text-base`}>
          {children}
        </a>
      );
    }
    case "button": {
      return (
        <p {...props} className={`${classNames} text-base`}>
          {children}
        </p>
      );
    }
    default: {
      return (
        <p {...props} className={`${classNames} text-base`}>
          {children}
        </p>
      );
    }
  }
};

export default Typography;
