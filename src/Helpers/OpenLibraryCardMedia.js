import { CardMedia, Skeleton } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import checkUrlFor404 from "../Api/imageCheckApi";


function OpenLibraryCardMedia({bookIsbn}) {
  const [imageUrl, setImageUrl] = useState();
  const [imageLoaded, setImageLoaded] = useState(false)

  const onImageLoad = () => {
    setImageLoaded(true)
  };

  useEffect(() => {
    setImageLoaded(false);

    const url = `https://covers.openlibrary.org/b/isbn/${bookIsbn}-M.jpg?default=false`

    checkUrlFor404(url).then(image => {
      setImageUrl(image);
      onImageLoad()
    });
  }, [bookIsbn]);

  return (
    <React.Fragment>
      {imageLoaded ?
      (<CardMedia
        component="img"
        height="300"
        image={imageUrl}
        alt="Book Image Cover"
        sx={{ objectFit: "cover" }}
      />) : (
      <Skeleton variant="rectangular" width="100%" height="300px" />
      )}
    </React.Fragment>
  );

}

export default OpenLibraryCardMedia;