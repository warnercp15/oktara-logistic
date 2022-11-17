export const packageReducer = (
  state,
  action
) => {
  switch (action.type) {
    case "refreshPackages":
      return {
        ...state,
        refresh: !state.refresh,
      };
    case "setPackages":
      return {
        ...state,
        packages: action.payload,
      };
    case "addShipment":
      return {
        ...state,
        shipments: [...state.shipments, action.payload],
      };
    case "removeShipment":
      return {
        ...state,
        shipments: [...action.payload],
      };
    case "clearShipments":
      return {
        ...state,
        shipments: [],
      };
    default:
      return state;
  }
};