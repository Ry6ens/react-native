import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRoute } from "../router";

import { authStateChangedUser } from "../redux/auth/auth-operations";
import { getStateChange } from "../redux/auth/auth-selectors";

export default function Main() {
  const dispatch = useDispatch();
  const stateChanged = useSelector(getStateChange);

  useEffect(() => {
    dispatch(authStateChangedUser());
  }, [dispatch]);

  const routing = useRoute(stateChanged);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
