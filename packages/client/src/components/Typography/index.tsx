import React from "react";

type Variants = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "a" | "button" | "small";

interface IPropTypes {
  variant?: Variants;
  children: React.ReactNode | string;
  classNames?: string;
}

const Typography = ({ variant, children, classNames, ...props }: IPropTypes) => {
  switch (variant) {
    case "h1": {
      return (
        <h1 {...props} className={`text-5xl sm:text-7xl ${classNames}`}>
          {children}
        </h1>
      );
    }
    case "h2": {
      return (
        <h2 {...props} className={`text-4xl sm:text-6xl ${classNames}`}>
          {children}
        </h2>
      );
    }
    case "h3": {
      return (
        <h3 {...props} className={`text-2xl sm:text-4xl ${classNames}`}>
          {children}
        </h3>
      );
    }
    case "h4": {
      return (
        <h4 {...props} className={`text-3xl ${classNames}`}>
          {children}
        </h4>
      );
    }
    case "h5": {
      return (
        <h5 {...props} className={`text-2xl ${classNames}`}>
          {children}
        </h5>
      );
    }
    case "h6": {
      return (
        <h6 {...props} className={`text-xl ${classNames}`}>
          {children}
        </h6>
      );
    }
    case "small": {
      return (
        <p {...props} className={`text-xs ${classNames}`}>
          {children}
        </p>
      );
    }
    case "a": {
      return (
        <a {...props} className={`text-base ${classNames}`}>
          {children}
        </a>
      );
    }
    case "button": {
      return (
        <p {...props} className={`sm:text-base text-sm ${classNames}`}>
          {children}
        </p>
      );
    }
    default: {
      return (
        <p {...props} className={`text-base ${classNames}`}>
          {children}
        </p>
      );
    }
  }
};

export default Typography;
