//  CUSTOM HOOKS
import { useGlobalContext } from "../../hooks/useGlobalContext";
//  MASONRY
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
//  COMPONENTS
import { Image } from "../../components";

function LikedImages() {
  const { likedImages } = useGlobalContext();

  return likedImages.length > 0 ? (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 550: 2, 750: 3, 950: 4 }}
    >
      <Masonry gutter="8px">
        {likedImages.map((image) => {
          return <Image key={image.id} image={image} />;
        })}
      </Masonry>
    </ResponsiveMasonry>
  ) : (
    <p className="text-center text-lg italic">No images found !</p>
  );
}

export default LikedImages;
