//  CUSTOM HOOKS
import { useGlobalContext } from "../../hooks/useGlobalContext";
//  MASONRY
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
//  COMPONENTS
import Image from "../../components/Image";

function LikedImages() {
  const { dispatch, images, likedImages } = useGlobalContext();
  return (
    images.length > 0 && (
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 550: 2, 750: 3, 950: 4 }}
      >
        <Masonry gutter="8px">
          {images.map((image) => {
            if (likedImages.includes(image.id))
              return <Image key={image.id} image={image} />;
          })}
        </Masonry>
      </ResponsiveMasonry>
    )
  );
}

export default LikedImages;
