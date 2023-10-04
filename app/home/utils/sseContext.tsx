import React, {
  createContext,
  type ReactNode,
  useContext,
  useReducer,
} from "react";

interface SSEConnectContextType {
  SSEConnect: boolean;
  setSSEConnect: (value: boolean) => void;
}

const SSEConnectContext = createContext<SSEConnectContextType>({
  SSEConnect: false,
  setSSEConnect: () => {},
});

const initialState = {
  SSEConnect: false,
};

const reducer = (
  state: typeof initialState,
  action: { type: string; payload: boolean },
) => {
  switch (action.type) {
    case "SET_SSE_CONNECT":
      return { ...state, SSEConnect: action.payload };
    default:
      return state;
  }
};

export const useSSEConnect = () => {
  return useContext(SSEConnectContext);
};

interface SSEConnectProviderProps {
  children: ReactNode;
}

export const SSEConnectProvider: React.FC<SSEConnectProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setSSEConnect = (value: boolean) => {
    dispatch({ type: "SET_SSE_CONNECT", payload: value });
  };

  return (
    <SSEConnectContext.Provider value={{ ...state, setSSEConnect }}>
      {children}
    </SSEConnectContext.Provider>
  );
};
