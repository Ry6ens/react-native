import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CreatePosts = (props) => (
  <Svg
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.5.5h-1v6h-6v1h6v6h1v-6h6v-1h-6v-6Z"
      fill="#fff"
    />
  </Svg>
);

export default CreatePosts;
