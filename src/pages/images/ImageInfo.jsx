//  REACT
import { useEffect, useState } from "react";
//  RRD
import { useParams } from "react-router-dom";
//  CUSTOM HOOKS
import { useFetch } from "../../hooks/useFetch";
//  COMPONENTS
import { Image } from "../../components";

function ImageInfo() {
  const [photo, setPhoto] = useState(null);
  const { id } = useParams();

  const { data, isPending, error } = useFetch(
    `https://api.unsplash.com/photos/${id}?client_id=${
      import.meta.env.VITE_ACCESS_KEY
    }`,
  );

  useEffect(() => {
    if (data) setPhoto(data);
  }, [data]);

  if (error) return <p className="text-center text-red-600">{error}</p>;

  return !isPending && photo ? (
    <div className="card bg-base-100 shadow-xl md:card-side lg:mx-auto lg:w-2/3">
      <figure className="md:w-2/3">
        <Image image={photo} imgLink={false} />
      </figure>
      <div className="card-body">
        <p>
          <span className="font-semibold">City :</span> {photo.location.city}
          <br />
          <span className="font-semibold">Country :</span>{" "}
          {photo.location.country}
          <br />
          <span className="font-semibold">Name :</span> {photo.location.name}
        </p>
      </div>
    </div>
  ) : (
    "Loading..."
  );
}

export default ImageInfo;
