//  RRD
import { Form, Link, useActionData } from "react-router-dom";
//  CUSTOM HOOKS
import { useRegister } from "../../hooks/useRegister";
import toast from "react-hot-toast";
import { useEffect } from "react";

//  ACTION
export const action = async ({ request }) => {
  const formData = await request.formData();
  const displayName = formData.get("fullname");
  const email = formData.get("email");
  const password = formData.get("password");
  const passwordConfirm = formData.get("passwordConfirm");
  if (password == passwordConfirm) {
    return {
      displayName,
      email,
      password,
    };
  } else {
    toast.error("Password is not equal !");
    return null;
  }
};

function Register() {
  const { registerWithGoogle, registerWithEmail } = useRegister();
  const formData = useActionData();

  useEffect(() => {
    if (formData) {
      registerWithEmail(
        formData.displayName,
        formData.email,
        formData.password,
      );
    }
  }, [formData]);

  return (
    <section className="h-full bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-center text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
              Sign up
            </h1>
            <Form method="post" className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="fullname"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full name
                </label>
                <input
                  type="text"
                  name="fullname"
                  className="input input-bordered w-full"
                  placeholder="Full name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered w-full"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="passwordConfirm"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password confirm
                </label>
                <input
                  type="password"
                  name="passwordConfirm"
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="btn btn-primary flex-grow">
                  Sign up
                </button>
                <button
                  type="button"
                  className="btn btn-success flex-grow"
                  onClick={registerWithGoogle}
                >
                  Google
                </button>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                <Link
                  to="/login"
                  className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                >
                  Login
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
