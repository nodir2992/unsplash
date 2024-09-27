//  REACT ICONS
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineDownloadForOffline } from "react-icons/md";

//  CONTEXT
import { useGlobalContext } from "../hooks/useGlobalContext";

function Image({ image }) {
  const { dispatch, likedImages } = useGlobalContext();
  const { id, urls, alt_description, links, user } = image;
  const liked = likedImages.includes(id);

  const handleLike = (id) => {
    const images = liked
      ? likedImages.filter((item) => item != id)
      : [...likedImages, id];

    dispatch({ type: "TOGGLE_LIKED_IMAGE", payload: images });
  };

  //   console.log(user);

  return (
    <div className="relative group hover__opacity">
      <img
        src={urls.regular}
        alt={alt_description}
        className="rounded-md"
        style={{ width: "100%", display: "block" }}
      />
      <span
        onClick={() => handleLike(id)}
        className="top-3 right-3 image__item hover:text-red-500"
      >
        {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
      </span>
      <a
        download=""
        rel="nofollow"
        target="_blank"
        title="Download this image"
        className="bottom-3 right-3 image__item hover:text-orange-500"
        href={links.download + "&amp;force=true"}
      >
        <MdOutlineDownloadForOffline />
      </a>
    </div>
  );
}

export default Image;
