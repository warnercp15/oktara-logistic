import { useState, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
import { PlacesContext } from "../context/places/PlacesContext";
import { PackageContext } from "../context/packages/PackageContext";
import { Toast } from "../helpers/helper";
import { logisticsApi } from "../apis";

export default function CreatePackage() {
  const [locationSelected, setLocationSelected] = useState();
  const [placeSelected, setPlaceSelected] = useState("");
  const [packageName, setPackageName] = useState("");

  const { register } = useForm();
  const { searchPlacesByTerm, setPlaces, isLoadingPlaces, places } = useContext(PlacesContext);
  const { refreshPackages, packages } = useContext(PackageContext);

  const debounceRef = useRef();

  const onQueryChange = (event) => {
    setPlaceSelected(event.target.value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      searchPlacesByTerm(event.target.value);
    }, 500);
  };

  const existPendingPackage=(id)=>{
    return packages.some(pack=>pack.location.id===id && pack.status === "Pending");
  }

  const addNewPackage = async (e) => {
    e.preventDefault();

    if (packageName === "" || placeSelected === ""){
      Toast.fire({
        icon: 'error',
        title: "All fields required"
      });
      return;
    }
    
    if (!existPendingPackage(locationSelected.id)){

      try {
        const response = await logisticsApi.post("/setPackages", {
          name: packageName,
          location: locationSelected,
          status: "Pending",
        });
        
        if (response.status === 200) {
          Toast.fire({
            icon: 'success',
            title: "Package created"
          });
          refreshPackages();
          setPackageName("");
          setPlaceSelected("");
        }
  
      } catch (error) {
        console.log(error);
      }

    }else{
      Toast.fire({
				icon: 'error',
				title: "This package already exist"
			});
    }
  };

  return (
    <form>
      <input {...register("name", { required: true})} placeholder="Name" onChange={(e) => setPackageName(e.target.value)} value={packageName} required/>
      <input {...register("location", { required: true})} placeholder="Location" onChange={onQueryChange} value={placeSelected} required/>
      {isLoadingPlaces && <>Loading</>}
            {places.length === 0 ? (
              <></>
            ) : (
              <div style={{maxHeight:"350px",overflowY: "auto", display:"flex",flexDirection:"column",alignItems:"center",border: '1px dashed gray ', margin:"1.5em auto",padding:".5em" }}>
                {places?.map((place) => (
                  <div className="CardContainer" style={{color:"black",textAlign: 'center', display:"flex",flexDirection:"row",alignItems:"center", cursor:"pointer" }}
                    key={place.id}
                    onClick={() => {
                        setPlaceSelected(place.place_name);
                        setLocationSelected(place);
                        setPlaces([]);
                    }}>
                    <p style={{ fontSize: "12px" }}>{place.place_name}</p>
                  </div>
                ))}
              </div>
            )}
      <input type="submit" value="Create" onClick={addNewPackage}/>
    </form>
  );
}