//  REACT ICONS
import { FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import { MdOutlineDownloadForOffline } from "react-icons/md";
//  CONTEXT
import { useGlobalContext } from "../../hooks/useGlobalContext";
//  RRD
import { Link } from "react-router-dom";
// CUSTOM HOOKS
import { useFirestore } from "../../hooks/useFirestore";
//  CONSTANT
import {
  COLLECTION_DOWNLOADED_IMAGES,
  COLLECTION_LIKED_IMAGES,
} from "../../constant/collectionName";

const RenderImg = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="rounded-md transition-all duration-200 group-hover:opacity-90"
      style={{ width: "100%", display: "block" }}
    />
  );
};

function Image({ image, downloadBtn = true, imgLink = true }) {
  const { addDocument, deleteDocument } = useFirestore();
  const {
    likedImages,
    downloadedImages,
    user: currentUser,
  } = useGlobalContext();
  const { id, urls, alt_description, links, user } = image;
  const liked = likedImages.some((item) => item.id == id);
  const downloded = downloadedImages.some((item) => item.id == id);

  const handleLike = (id) => {
    if (!liked) {
      addDocument(COLLECTION_LIKED_IMAGES, id, {
        currentUserId: currentUser.uid,
        ...image,
      });
    } else {
      deleteDocument(COLLECTION_LIKED_IMAGES, id);
    }
  };

  const handleDownload = (id) => {
    if (!downloded) {
      addDocument(COLLECTION_DOWNLOADED_IMAGES, id, {
        currentUserId: currentUser.uid,
        ...image,
      });
    }
  };

  const handleRemoveDownload = (id) => {
    deleteDocument(COLLECTION_DOWNLOADED_IMAGES, id);
  };

  return (
    <div className="group relative">
      {imgLink ? (
        <Link to={`/photo-info/${id}`}>
          <RenderImg src={urls.regular} alt={alt_description} />
        </Link>
      ) : (
        <RenderImg src={urls.regular} alt={alt_description} />
      )}
      <span
        onClick={() => handleLike(id)}
        className="__image-item right-3 top-3"
      >
        {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
      </span>
      {downloadBtn ? (
        <a
          download=""
          rel="nofollow"
          target="_blank"
          title="Download this image"
          className="__image-item bottom-3 right-3"
          href={links.download + "&amp;force=true"}
          onClick={() => handleDownload(id)}
        >
          <MdOutlineDownloadForOffline />
        </a>
      ) : (
        <span
          className="__image-item bottom-3 right-3"
          onClick={() => handleRemoveDownload(id)}
        >
          <FaTrash />
        </span>
      )}
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
