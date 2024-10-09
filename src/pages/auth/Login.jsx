//  REACT
import { useEffect } from "react";
//  RRD
import { Form, Link, useActionData } from "react-router-dom";
//  CUSTOM HOOKS
import { useRegister } from "../../hooks/useRegister";
import { useLogin } from "../../hooks/useLogin";

//  ACTION
export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  return {
    email,
    password,
  };
};

function Login() {
  const { registerWithGoogle } = useRegister();
  const { loginWithEmail } = useLogin();
  const formData = useActionData();

  useEffect(() => {
    if (formData) {
      loginWithEmail(formData.email, formData.password);
    }
  }, [formData]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-center text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
              Sign in
            </h1>
            <Form method="post" className="space-y-4 md:space-y-6">
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
              <div className="flex gap-2">
                <button type="submit" className="btn btn-primary flex-grow">
                  Sign in
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
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
