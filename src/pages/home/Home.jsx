//  REACT
import { useEffect, useState } from "react";
//  CUSTOM HOOKS
import { useFetch } from "../../hooks/useFetch";
//  MASONRY
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
//  COMPONENTS
import { Image, SearchForm } from "../../components";
//  RRD
import { useActionData } from "react-router-dom";

//  ACTION
export const action = async ({ request }) => {
  let formData = await request.formData();
  let search = formData.get("search");
  return search;
};

function Home() {
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchText, setSearchText] = useState("");
  const searchParamsFromAction = useActionData();

  const { data, isPending, error } = useFetch(
    `https://api.unsplash.com/search/photos?client_id=${
      import.meta.env.VITE_ACCESS_KEY
    }&per_page=12&query=${searchParamsFromAction ?? "all"}&page=${pageNumber}`,
  );

  useEffect(() => {
    if (data) {
      if (searchParamsFromAction != searchText) {
        setSearchText(searchParamsFromAction);
        setImages(data.results);
      } else {
        let results = data.results;
        if (images.length > 0) {
          results = results.filter(
            (item) => !images.some((img) => img.id === item.id),
          );
        }

        setImages((prev) => [...prev, ...results]);
      }
    }
  }, [data]);

  const handleReadMore = () => {
    setPageNumber(pageNumber + 1);
  };

  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <>
      <div className="mb-10 mt-5">
        <SearchForm />
      </div>
      {images.length > 0 && (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 400: 2, 900: 3, 1400: 4 }}
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
