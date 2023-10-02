import { useEffect } from "react";

const Animation = (props) => {
  useEffect(() => {
    console.log(props.horizontal, props.vertical);
  }, [props]);

  return (
    <div
      className={`h-24 w-24 bg-green-400 rounded-[50%] absolute ${props.vertical} ${props.horizontal} transition-all duration-1000`}
    ></div>
  );
};

export default Animation;
