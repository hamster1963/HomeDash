import React, {
  createContext,
  type ReactNode,
  useContext,
  useReducer,
} from "react";

type SpeedData = { speed: number };

interface SSEContextType {
  SSEConnect: boolean;
  setSSEConnect: (value: boolean) => void;
  HomeNetworkSpeedList: SpeedData[];
  setHomeNetworkSpeedList: (value: SpeedData[]) => void;
}

const SSEContext = createContext<SSEContextType>({
  SSEConnect: false,
  setSSEConnect: () => {},
  HomeNetworkSpeedList: [],
  setHomeNetworkSpeedList: () => {},
});

const initialState: {
  SSEConnect: boolean;
  HomeNetworkSpeedList: SpeedData[];
} = {
  SSEConnect: false,
  HomeNetworkSpeedList: [],
};

type Actions =
  | { type: "SET_SSE_CONNECT"; payload: boolean }
  | { type: "SET_HOME_NETWORK_SPEED_LIST"; payload: SpeedData[] };

const reducer = (state: typeof initialState, action: Actions) => {
  switch (action.type) {
    case "SET_SSE_CONNECT":
      return { ...state, SSEConnect: action.payload };
    case "SET_HOME_NETWORK_SPEED_LIST":
      return { ...state, HomeNetworkSpeedList: action.payload };
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

  return (
    <SSEContext.Provider
      value={{ ...state, setSSEConnect, setHomeNetworkSpeedList }}
    >
      {children}
    </SSEContext.Provider>
  );
};
