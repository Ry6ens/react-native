import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Home = (props) => (
  <Svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="M8 8h24v24H8z" />
    <Path
      clipRule="evenodd"
      d="M11 11h7v7h-7v-7ZM22 11h7v7h-7v-7ZM22 22h7v7h-7v-7ZM11 22h7v7h-7v-7Z"
      stroke="#212121"
      strokeOpacity={0.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Home;
