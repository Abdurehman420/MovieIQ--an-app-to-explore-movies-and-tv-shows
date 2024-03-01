import { NavLink } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="  h-screen w-screen  justify-center items-center flex flex-col space-y-7">
      <h1 className="text-5xl">!OOPS Page Not Found</h1>
      <NavLink
        to="/"
        className="  bg-lightBlue text-gray-100 px-3 py-1 rounded"
      >
        Go Back
      </NavLink>
    </div>
  );
};

export default Page404;
