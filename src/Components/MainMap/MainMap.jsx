import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup, NavigationControl } from "react-map-gl";
import PinService from '../../Services/pin.service';
import UserService from '../../Services/user.service';
import { format } from "timeago.js";
import { Room, Star, StarBorder } from "@material-ui/icons";
import Geocoder from 'react-mapbox-gl-geocoder';

const MainMap = () => {
  const myStorage = window.localStorage;
  const [currentEmail, setCurrentEmail] = useState(myStorage.getItem("userEmail"));
  const [currentUsername, setCurrentUsername] = useState('');
    const [pins, setPins] = useState([]);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);
    const [newPlace, setNewPlace] = useState(null);
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [star, setStar] = useState(0);
    const [error, setError] = useState(false);
    const [viewport, setViewport] = useState({
        latitude: 47.040182,
        longitude: 17.071727,
        zoom: 4,
    });
    const navControlStyle= {
      right: 10,
      top: 10
    };

    useEffect(() => {
      UserService.getUserNameFromEmail(currentEmail)
        .then((res) => {
          setCurrentUsername(res.data.username)
        })
        .catch((err) => {
          setError(true)
        })
    }, [])


    const handleMarkerClick = (id, lat, long) => {
        setCurrentPlaceId(id);
        setViewport({ ...viewport, latitude: lat, longitude: long });
      };
    
      const handleAddClick = (e) => {
        const [longitude, latitude] = e.lngLat;
        setNewPlace({
          lat: latitude,
          long: longitude,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const newPin = {
          username: currentUsername,
          title,
          desc,
          rating: star,
          lat: newPlace.lat,
          long: newPlace.long,
        };
        try {
          const res = await PinService.postNewPin(newPin)
          setPins([...pins, res.data])
          setNewPlace(null)
        } catch (error) {
          console.log(error, 'error')
          setError(true)
        }
    }

    useEffect(() => {
      PinService.getAllPins()
        .then((res) => {
          console.log(res, 'res in use eff get all pins')
          setPins(res.data)
        })
        .catch((err) => {
          console.log(err, 'err')
          setError(true)
        })
    }, []);

    const onSelected = (viewport, item) => {
      // this.setState({
      //   viewport
      // })
      setViewport({...viewport})
      
  }

    // const handleLogout = () => {
    //   setCurrentUsername(null);
    //   myStorage.removeItem("user");
    // };

    return (
        // <>
        // <h1>Main Map</h1>
        // </>
        <div style={{ height: "100vh", width: "100%" }}>
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken=""
          width="100%"
          height="100%"
          transitionDuration="200"
          mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
          onViewportChange={(viewport) => setViewport(viewport)}
          onDblClick={currentUsername && handleAddClick}
        >
          <Geocoder                
  mapboxApiAccessToken=""             
  onSelected={onSelected}                
  viewport={viewport}                
  hideOnSelect={true}                
  value=""                
  // queryParams={params}            
/>
          {pins.map((p) => (
            <>
              <Marker
                latitude={p.lat}
                longitude={p.long}
                offsetLeft={-3.5 * viewport.zoom}
                offsetTop={-7 * viewport.zoom}
              >
                <Room
                  style={{
                    fontSize: 7 * viewport.zoom,
                    color:
                      currentUsername === p.username ? "tomato" : "slateblue",
                    cursor: "pointer",
                  }}
                  onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                />
              </Marker>
              {p._id === currentPlaceId && (
                <Popup
                  key={p._id}
                  latitude={p.lat}
                  longitude={p.long}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setCurrentPlaceId(null)}
                  anchor="left"
                >
                  <div className="card">
                    <label>Place</label>
                    <h4 className="place">{p.title}</h4>
                    <label>Review</label>
                    <p className="desc">{p.desc}</p>
                    <label>Rating</label>
                    <div className="stars">
                      {Array(p.rating).fill(<Star className="star" />)}
                    </div>
                    <label>Information</label>
                    <span className="username">
                      Created by <b>{p.username}</b>
                    </span>
                    <span className="date">{format(p.createdAt)}</span>
                  </div>
                </Popup>
              )}
            </>
          ))}
          {newPlace && (
            <>
              <Marker
                latitude={newPlace.lat}
                longitude={newPlace.long}
                offsetLeft={-3.5 * viewport.zoom}
                offsetTop={-7 * viewport.zoom}
              >
                <Room
                  style={{
                    fontSize: 7 * viewport.zoom,
                    color: "tomato",
                    cursor: "pointer",
                  }}
                />
              </Marker>
              <Popup
                latitude={newPlace.lat}
                longitude={newPlace.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setNewPlace(null)}
                anchor="left"
              >
                <div>
                  <form onSubmit={handleSubmit}>
                    <label>Title</label>
                    <input
                      placeholder="Enter a title"
                      autoFocus
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Description</label>
                    <textarea
                      placeholder="Say us something about this place."
                      onChange={(e) => setDesc(e.target.value)}
                    />
                    <label>Rating</label>
                    <select onChange={(e) => setStar(e.target.value)}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <button type="submit" className="submitButton">
                      Add Pin
                    </button>
                  </form>
                </div>
              </Popup>
            </>
          )}
          {/* {currentUsername ? (
            <button className="button logout" onClick={handleLogout}>
              Log out
            </button>
          ) : (
            <div className="buttons">
              <button className="button login" onClick={() => setShowLogin(true)}>
                Log in
              </button>
              <button
                className="button register"
                onClick={() => setShowRegister(true)}
              >
                Register
              </button>
            </div>
          )}
          {showRegister && <Register setShowRegister={setShowRegister} />}
          {showLogin && (
            <Login
              setShowLogin={setShowLogin}
              setCurrentUsername={setCurrentUsername}
              myStorage={myStorage}
            />
          )} */}
          <NavigationControl style={navControlStyle} />
        </ReactMapGL>
      </div>
    )
};

export default MainMap;