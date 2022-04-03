interface IConfig {
  classNames?: string;
  labelColor?: string;
}

const WithConfig = (Component: React.FC<any>, config: IConfig) => {
  return (props: any) => {
    return <Component {...props} {...config} />;
  };
};

export default WithConfig;
