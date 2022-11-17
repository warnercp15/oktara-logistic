import React, {useContext} from "react";
import { PackageContext } from "../context/packages/PackageContext";
import { useLocation } from 'react-router-dom'
import Card from 'react-bootstrap/Card';

export default function Package({pack}) {
  const { addShipment, shipments} = useContext(PackageContext);
  const {location, name, status} = pack;
  const path = useLocation();

  return (
      <Card className={status+"Packages"}>
        <p>ID: {location.id}</p>
        <p>Name: {name}</p>
        <p className={status+"Status"}>{status}</p>
        { path.pathname === "/Manage" && status === "Pending" && !shipments?.includes(pack) && 
          <button onClick={()=>addShipment(pack)}>Prepare</button>
        }
      </Card>
  );
}