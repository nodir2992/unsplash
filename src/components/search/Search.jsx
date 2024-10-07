//  COMPONENTS
import { FormInput } from "../";
//  RRD
import { Form } from "react-router-dom";

function Search() {
  return (
    <Form
      method="post"
      className="mx-auto flex w-full gap-2 md:w-[80%] lg:w-[60%]"
    >
      <FormInput type="text" placeholder="Search..." name="search" />
      <button className="btn btn-info btn-sm md:btn-md">Search</button>
    </Form>
  );
}

export default Search;
