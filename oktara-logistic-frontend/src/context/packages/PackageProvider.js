import { useReducer } from "react";
import { PackageContext } from "./PackageContext";
import { packageReducer } from "./packageReducer";

const INITIAL_STATE = {
  refresh: false,
  packages: [],
  shipments: [],
};


export const PackageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(packageReducer, INITIAL_STATE);

  const refreshPackages = () => {
    dispatch({
      type: "refreshPackages",
    });
  };

  const setPackages = (packages) => {
    dispatch({
      type: "setPackages",
      payload: packages,
    });
  };

  const addShipment = (p) => {
    dispatch({
      type: "addShipment",
      payload: p,
    });
  };

  const clearShipments = () => {
    dispatch({
      type: "clearShipments",
    });
  };

  const removeShipment = (p) => {
    const index = state.shipments.indexOf(p);
    state.shipments.splice(index, 1);

    dispatch({
      type: "removeShipment",
      payload: state.shipments,
    });
  };

  return (
    <PackageContext.Provider
      value={{
        ...state,
        refreshPackages,
        setPackages,
        addShipment,
        removeShipment,
        clearShipments,
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};