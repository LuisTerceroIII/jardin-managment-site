import React, { useState, useEffect, useContext } from "react";
import { ResultOfSearchPresentation } from "./ResultOfSearchPresentation";
import { useHistory } from "react-router-dom";
import { JardinApiService } from "../../../services/JardinApiService";
import localStore from "store";
import JardinReqAndResContext from "../../../contexts/JardinReqResContext";

export const ResultOfSearchContainer = (props) => {
  const JardinReqAndResStates = useContext(JardinReqAndResContext);
  const [query, setQuery] = useState(
    JardinReqAndResStates.searchRequest?.query
  );

  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const [pageCount, setPageCount] = useState(0);
  const [garments, setGarments] = useState([]); // variable que contiene a todos los elementos
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);

  const history = useHistory();

  const goToMenu = () => {
    history.push("/actions");
  };
  const goLastPage = () => {
    history.goBack();
  };

  const loadImages = (queryResult) => {
    const links = [];
    queryResult.forEach((garment) => {
      if (garment?.images) {
        const imagesLinksReq = JardinApiService().getAllImagesLinks(garment.id);
        imagesLinksReq.then((res) => {
          if (res?.status === 200) {
            const garmentImagesLinks = {
              id: garment.id,
              type: garment.type,
              size: garment.size,
              mainColor: garment.mainColor,
              gender: garment.gender,
              mainMaterial: garment.mainMaterial,
              madeIn: garment.madeIn,
              price: garment.price,
              comment: garment.comment,
              images: res.data,
            };
            links.push(garmentImagesLinks);
          }
        });
      } else {
        const garmentNoImages = {
          id: garment.id,
          type: garment.type,
          size: garment.size,
          mainColor: garment.mainColor,
          gender: garment.gender,
          mainMaterial: garment.mainMaterial,
          madeIn: garment.madeIn,
          price: garment.price,
          comment: garment.comment,
          images: {},
        };
        links.push(garmentNoImages);
      }
    });
    return links;
  };

  useEffect(() => {
    setLoading(true);
    const sessionToken = localStore.get("sessionToken") || null;
    const queryResult = JardinApiService().getGarmentByQuery(
      query,
      sessionToken,
      limit,
      offset
    );

    queryResult.then((res) => {
      if (res) {
        if (res?.status === 202 || res?.status === 204) {
          const links = loadImages(res.data || []);
          setTimeout(() => {
            setLoading(false);
            setError(false);
            setLoaded(true);
            setGarments(links);
          }, 2000);
        } else {
          setLoaded(false);
          setLoading(false);
          setError(true);
        }
      } else {
        setLoaded(false);
        setLoading(false);
        setError(true);
      }
    });
    if (pageCount === 0) {
      const searchTotalElementsReq = JardinApiService().getSearchTotalElements(
        JardinReqAndResStates.searchRequest.query
      );
      searchTotalElementsReq.then((res) => {
        if (res) {
          if (res?.status === 202) {
            setPageCount(Math.ceil((res?.data || 0) / limit));
          }
        }
      });
    }

    JardinReqAndResStates.setSearchRequest({ query: {} });
  }, [offset]);

  return (
    <ResultOfSearchPresentation
      goToMenu={goToMenu}
      pageCount={pageCount}
      garments={garments}
      loading={loading}
      loaded={loaded}
      error={error}
      goLastPage={goLastPage}
      setOffset={setOffset}
      offset={offset}
      limit={limit}
      setLoading={setLoading}
      setLoaded={setLoaded}
    />
  );
};
