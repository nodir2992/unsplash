//  REACT
import { useEffect } from "react";
//  CUSTOM HOOKS
import { useFetch } from "../../hooks/useFetch";
import { useGlobalContext } from "../../hooks/useGlobalContext";
//  MASONRY
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
//  COMPONENTS
import { Image, SearchForm } from "../../components";
//  UTILS
import { joinClassNames } from "../../utils/classnames";
//  RRD
import { useActionData } from "react-router-dom";

//  ACTION
export const action = async ({ request }) => {
  let formData = await request.formData();
  let search = formData.get("search");
  return search;
};

function Home() {
  const { dispatch, pageNumber, images, searchParams } = useGlobalContext();
  const searchParamsFromAction = useActionData();

  const { data, isPending, error } = useFetch(
    `https://api.unsplash.com/search/photos?client_id=${
      import.meta.env.VITE_ACCESS_KEY
    }&per_page=12&query=${searchParamsFromAction ?? "all"}&page=${pageNumber}`,
  );

  useEffect(() => {
    if (data) {
      let results = data.results;

      if (images.length > 0) {
        results = results.filter(
          (item) => !images.some((img) => img.id === item.id),
        );
      }

      if (searchParamsFromAction == searchParams) {
        dispatch({ type: "ADD_IMAGES", payload: results });
      } else {
        dispatch({ type: "SEARCH_IMAGES", payload: results });
        dispatch({
          type: "SET_SEARCH_PARAMS",
          payload: searchParamsFromAction,
        });
      }
    }
  }, [data]);

  const handleReadMore = () => {
    dispatch({ type: "SET_PAGE_NUMBER", payload: pageNumber + 1 });
  };

  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <>
      <div className="mb-10 mt-5">
        <SearchForm />
      </div>
      {images.length > 0 && (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 550: 2, 750: 3, 950: 4 }}
        >
          <Masonry gutter="5px">
            {images.map((image) => {
              return <Image key={image.id} image={image} />;
            })}
          </Masonry>
        </ResponsiveMasonry>
      )}
      <button
        onClick={handleReadMore}
        className="btn btn-info btn-block mt-5"
        disabled={isPending}
      >
        {isPending ? "Loading..." : "Load more"}
      </button>
    </>
  );
}

export default Home;
