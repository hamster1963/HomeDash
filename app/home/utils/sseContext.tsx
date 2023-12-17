"use client";
import React, {
  createContext,
  type ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";

type SpeedData = { speed: number };

interface SSEContextType {
  SSEConnect: boolean;
  setSSEConnect: (value: boolean) => void;
  HomeNetworkSpeedList: SpeedData[];
  setHomeNetworkSpeedList: (value: SpeedData[]) => void;
  ProxyNetworkSpeedList: SpeedData[];
  setProxyNetworkSpeedList: (value: SpeedData[]) => void;
  isNavCollapsed: boolean;
  setNavCollapsed: (value: boolean) => void;
}

const SSEContext = createContext<SSEContextType>({
  SSEConnect: false,
  setSSEConnect: () => {},
  HomeNetworkSpeedList: [],
  setHomeNetworkSpeedList: () => {},
  ProxyNetworkSpeedList: [],
  setProxyNetworkSpeedList: () => {},
  isNavCollapsed: false,
  setNavCollapsed: () => {},
});

const initialState: {
  SSEConnect: boolean;
  HomeNetworkSpeedList: SpeedData[];
  ProxyNetworkSpeedList: SpeedData[];
  isNavCollapsed: boolean;
} = {
  SSEConnect: false,
  HomeNetworkSpeedList: [],
  ProxyNetworkSpeedList: [],
  isNavCollapsed: false,
};

type Actions =
  | { type: "SET_SSE_CONNECT"; payload: boolean }
  | { type: "SET_HOME_NETWORK_SPEED_LIST"; payload: SpeedData[] }
  | { type: "SET_PROXY_NETWORK_SPEED_LIST"; payload: SpeedData[] }
  | { type: "SET_NAV_COLLAPSED"; payload: boolean };

const reducer = (state: typeof initialState, action: Actions) => {
  switch (action.type) {
    case "SET_SSE_CONNECT":
      return { ...state, SSEConnect: action.payload };
    case "SET_HOME_NETWORK_SPEED_LIST":
      return { ...state, HomeNetworkSpeedList: action.payload };
    case "SET_PROXY_NETWORK_SPEED_LIST":
      return { ...state, ProxyNetworkSpeedList: action.payload };
    case "SET_NAV_COLLAPSED":
      return { ...state, isNavCollapsed: action.payload };
    default:
      return state;
  }
};

export const useSSEContext = () => {
  return useContext(SSEContext);
};

interface SSEContextProviderProps {
  children: ReactNode;
}

export const SSEConnectProvider: React.FC<SSEContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setSSEConnect = (value: boolean) => {
    dispatch({ type: "SET_SSE_CONNECT", payload: value });
  };

  const setHomeNetworkSpeedList = (value: SpeedData[]) => {
    dispatch({ type: "SET_HOME_NETWORK_SPEED_LIST", payload: value });
  };

  const setProxyNetworkSpeedList = (value: SpeedData[]) => {
    dispatch({ type: "SET_PROXY_NETWORK_SPEED_LIST", payload: value });
  };

  // For nav collapsed
  const [isNavCollapsed, setIsNavCollapsed] = useState(() => {
    const savedState =
      typeof window !== "undefined"
        ? localStorage.getItem("navCollapsed")
        : null;
    return savedState ? (JSON.parse(savedState) as boolean) : false;
  });

  const setNavCollapsed = (value: boolean) => {
    setIsNavCollapsed(value);
    localStorage.setItem("navCollapsed", JSON.stringify(value));
  };

  return (
    <SSEContext.Provider
      value={{
        ...state,
        setSSEConnect,
        setHomeNetworkSpeedList,
        setProxyNetworkSpeedList,
        isNavCollapsed,
        setNavCollapsed,
      }}
    >
      {children}
    </SSEContext.Provider>
  );
};
