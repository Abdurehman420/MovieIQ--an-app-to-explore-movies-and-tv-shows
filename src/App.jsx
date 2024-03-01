import { useEffect } from "react";
import "./App.css";
import { fetchDataFromApi } from "./utilities/api";
import { useDispatch } from "react-redux";
import { getApiConfig, getGenres } from "./store/homeslice";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Page404 from "./pages/Page404";
import Details from "./pages/Details";
import SearchResults from "./pages/SearchResults";
import Favorites from "./pages/Favorites";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AppLayout from "./components/AppLayout";

const router = createBrowserRouter(
  createRoutesFromElements([
    // eslint-disable-next-line react/jsx-key
    <Route>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResults />} />
        <Route path="/favorites" element={<Favorites />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Route>,
  ])
);

function App() {
  const dispatch = useDispatch();

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfig(url));
    });
  };

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["movie", "tv"];
    let allGenres = {};
    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres));
  };

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
