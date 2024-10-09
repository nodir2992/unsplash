//  CUSTOM HOOKS
import { useGlobalContext } from "../../hooks/useGlobalContext";
//  MASONRY
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
//  COMPONENTS
import { Image } from "../../components";
import { Link } from "react-router-dom";

function DownloadedImages() {
  const { images, downloadedImages } = useGlobalContext();

  return downloadedImages.length > 0 ? (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 550: 2, 750: 3, 950: 4 }}
    >
      <Masonry gutter="8px">
        {images.map((image) => {
          if (downloadedImages.includes(image.id))
            return <Image key={image.id} image={image} downloadBtn={false} />;
        })}
      </Masonry>
    </ResponsiveMasonry>
  ) : (
    <p className="text-center text-lg italic">No images found !</p>
  );
}

export default DownloadedImages;
