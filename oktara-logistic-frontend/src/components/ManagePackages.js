import React, { useEffect, useContext } from "react";
import { PackageContext } from "../context/packages/PackageContext";
import { PlacesContext } from "../context/places/PlacesContext";
import { MapContext } from "../context/map/MapContext";
import { Toast } from "../helpers/helper";
import { logisticsApi } from "../apis";
import Modal from "./global/Modal";
import useModal from '../hooks/useModal';
import Package from "./Package";
import CreatePackage from "./CreatePackage";

export default function ManagePackages() {
  const {isShowing, toggle} = useModal();
  const { shipments, refresh, refreshPackages, packages, setPackages, clearShipments} = useContext(PackageContext);
  const { userLocation } = useContext(PlacesContext);
  const { getRouteBetweenPoints } = useContext(MapContext);

  const getPackages = async () => {
    try {
      const response = await logisticsApi.get("/getPackages");

      if (response.status === 200) {
        setPackages(response.data.data)
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendPackages = () => {
    if (!userLocation) return;

    if(shipments.length <= 0){
      Toast.fire({
        icon: 'error',
        title: "No packages for Shipments"
      });
      return;
    }

    let coords = "";
    coords += userLocation.join(",") + ";";

    for (const shipment of shipments) {
      const [lng, lat] = shipment.location.center;
      coords += `${lng},${lat};`;
    }

    coords = coords.slice(0, -1);

    try {
      getRouteBetweenPoints(userLocation, coords);
      setTimeout(() => {
        updatePackages();
        clearShipments();
        refreshPackages();
      }, 5000);

    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      updatePackages();
      clearShipments();
      refreshPackages();
    }, 5000);
  };

  const updatePackages = async () => {
    try {
      const response = await logisticsApi.put("/updatePackage", {
        list: shipments.map(p=>p.location.id),
        status: "Shipped",
      });

      if (response.status === 200) {
        setPackages(response.data.data)
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPackages();
  }, [refresh]);

  return (
    <div className="Package">
      <div>
        <button className="button" onClick={toggle}>Create Package</button>
        <button className="button" onClick={handleSendPackages}>Send Package</button>
      </div>
      <div className="PackageContent">
        <div>
          <h4>Pending Packages</h4>
          {packages && packages?.filter((p) => p.status === "Pending").reverse().map((pack) => (
            <Package 
              key={pack.location.id}
              pack={pack}
            />
          ))}
        </div>
        <div>
          <h4>Shipped Packages</h4>
          {packages && packages?.filter((p) => p.status === "Shipped").reverse().map((pack) => (
            <Package 
              key={pack.location.id}
              pack={pack}
            />
          ))}
        </div>
      </div>
        <Modal
          isShowing={isShowing}
          hide={toggle}
          children={<CreatePackage/>}
        />
    </div>
  );
}