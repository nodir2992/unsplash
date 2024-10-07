//  REACT ICONS
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineDownloadForOffline } from "react-icons/md";
//  CONTEXT
import { useGlobalContext } from "../../hooks/useGlobalContext";
//  RRD
import { Link } from "react-router-dom";

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

  // console.log(user);

  return (
    <div className="group relative">
      <Link to={`/photo-info/${id}`}>
        <img
          src={urls.regular}
          alt={alt_description}
          className="rounded-md transition-all duration-200 group-hover:opacity-90"
          style={{ width: "100%", display: "block" }}
        />
      </Link>
      <span
        onClick={() => handleLike(id)}
        className="__image-item right-3 top-3"
      >
        {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
      </span>
      <a
        download=""
        rel="nofollow"
        target="_blank"
        title="Download this image"
        className="__image-item bottom-3 right-3"
        href={links.download + "&amp;force=true"}
      >
        <MdOutlineDownloadForOffline />
      </a>
      <a
        href={user.portfolio_url ?? user.links.html}
        target="_blank"
        className="__image-item bottom-3 left-3 flex items-center gap-2"
      >
        <div className="avatar">
          <div className="mask mask-squircle w-10">
            <img src={user.profile_image.medium} />
          </div>
        </div>
        <span className="text-sm">{user.name}</span>
      </a>
    </div>
  );
}

export default Image;
