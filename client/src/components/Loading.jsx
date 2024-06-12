import { Oval } from "react-loader-spinner";

const Loading = ({ width, height }) => {
  return (
    <Oval
      visible={true}
      height={height || 50}
      width={width || 50}
      color="#4fa94d"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};
export default Loading;
