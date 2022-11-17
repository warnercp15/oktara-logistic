import React, { useEffect, useContext } from "react";
import { PackageContext } from "../context/packages/PackageContext";
import { logisticsApi } from "../apis";
import PageWrapper from "../components/global/PageWrapper";
import Package from "../components/Package";

export default function Packages() {
  const { refresh, packages, setPackages} = useContext(PackageContext);

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

  useEffect(() => {
    getPackages();
  }, [refresh]);

  return (
    <PageWrapper>
      <div className="Container">
          <h2>All Packages</h2>
          <div>
             {packages && packages.map((pack) => (
                <Package 
                  key={pack.location.id}
                  pack={pack}
                />
            ))}
          </div>
      </div>
    </PageWrapper>
  );
}