//  REACT
import { useEffect, useState } from "react";
//  RRD
import { useParams } from "react-router-dom";
//  CUSTOM HOOKS
import { useFetch } from "../../hooks/useFetch";

function InfoPhoto() {
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

  return (
    photo && (
      <div className="card bg-base-100 shadow-xl lg:card-side">
        <figure className="lg:w-2/3">
          <img src={photo.urls.regular} alt={photo.alt_description} />
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
    )
  );
}

export default InfoPhoto;
