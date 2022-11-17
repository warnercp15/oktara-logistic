import Manage from "./pages/Manage";
import Packages from "./pages/Packages";
import { MapProvider } from "./context/map/MapProvider";
import { PackageProvider } from "./context/packages/PackageProvider";
import { PlacesProvider } from "./context/places/PlacesProvider";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <PlacesProvider>
      <PackageProvider>
        <MapProvider>
          <Router>
            <Switch>
              <Route exact path="/Packages" component={Packages} />
              <Route exact path="/Manage" component={Manage} />
              <Route exact path="/" component={Packages} />
            </Switch>
          </Router>
        </MapProvider>
      </PackageProvider>
    </PlacesProvider>
  );
}
export default App;