import React, { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component'
import './App.css';

const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  // const getPhotosURL = `https://api.unsplash.com/photos?client_id=${accessKey}&page=${page}`;
  // const searchPhotosURL = `https://api.unsplash.com/search/photos?client_id=${accessKey}&page=${page}&query=${query}`;

  const getPhotos = useCallback(() => {
    let getPhotosURL = `https://api.unsplash.com/photos?`;
    if (query) getPhotosURL = `https://api.unsplash.com/search/photos?query=${query}`;

    getPhotosURL += `&client_id=${accessKey}`
    getPhotosURL += `&page=${page}`

    fetch(getPhotosURL)
      .then((res) => res.json())
      .then((data) => {
        const imagesFromAPI = data.results ?? data;

        // if page is 1, then get a whole new array of images
        if (page === 1) setImages(imagesFromAPI);

        // if page > 1, then we are adding for the infinite scroll
        setImages((images) => [...images, ...imagesFromAPI]);
      })
  }, [page, query]);

  useEffect(() => {
    getPhotos();
  }, [page, getPhotos]);

  function searchPhotos(e) {
    e.preventDefault();
    setPage(1);
    getPhotos();
  }

  // return an error if there is no access key
  if (!accessKey) {
    return (
      <a href="https://unsplash.com/developers" className="error">Required: Get Your Unsplash API Key First!</a>
    )
  }

  return (
    <div className="app">
      <h1>Unsplash Image Gallery!</h1>

      <form onSubmit={searchPhotos}>
        <input type="text" placeholder="Search Unsplash..." value={query} onChange={(e) => setQuery(e.target.value)}/>
        <button>Search</button>
      </form>

        <InfiniteScroll
          dataLength={images.length} //This is important field to render the next data
          next={() => setPage((page) => page + 1)}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <div className="image-grid">
            {images.map((image, index) => (
              <a className="image" key={index} href={image.links.html}>
                <img src={image.urls.regular} alt={image.alt_description} title={image.alt_description} target="_blank" rel="noreferrer noopener" />
              </a>
            ))}
          </div>
        </InfiniteScroll>
    </div>
  );
}
