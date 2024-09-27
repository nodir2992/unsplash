//  REACT
import { useEffect } from "react";
//  CUSTOM HOOKS
import { useFetch } from "../../hooks/useFetch";
import { useGlobalContext } from "../../hooks/useGlobalContext";
//  MASONRY
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
//  COMPONENTS
import Image from "../../components/Image";
//  UTILS
import { joinClassNames } from "../../utils/classnames";

function Home() {
  const { dispatch, pageNumber, images, selectedColor } = useGlobalContext();
  const { data, isPending, error } = useFetch(
    `https://api.unsplash.com/search/photos?client_id=${
      import.meta.env.VITE_ACCESS_KEY
    }&per_page=12&query=nature&page=${pageNumber}`
  );

  useEffect(() => {
    if (data) {
      let results = data.results;

      if (images.length > 0) {
        results = results.filter(
          (item) => !images.some((img) => img.id === item.id)
        );
      }

      dispatch({ type: "ADD_IMAGES", payload: results });
    }
  }, [data]);

  const handleReadMore = () => {
    dispatch({ type: "SET_PAGE_NUMBER", payload: pageNumber + 1 });
  };

  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <>
      {images.length > 0 && (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 550: 2, 750: 3, 950: 4 }}
        >
          <Masonry gutter="8px">
            {images.map((image) => {
              return <Image key={image.id} image={image} />;
            })}
          </Masonry>
        </ResponsiveMasonry>
      )}
      <button
        onClick={handleReadMore}
        className={joinClassNames(
          "border py-2 w-full my-5 text-white font-semibold rounded-md hover__opacity justify-center flex items-center",
          selectedColor
        )}
      >
        {isPending ? "Loading..." : "Load more"}
      </button>
    </>
  );
}

export default Home;
