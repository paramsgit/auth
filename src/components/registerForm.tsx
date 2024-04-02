import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
type Props = {};

const FormSchema = z.object({
  first_name: z
    .string()
    .min(1, "First Name can't be empty")
    .max(32, "First name length must be smaller than 32")
    .regex(new RegExp("^[a-zA-z]+$"), "Only Alphabets allowed"),

  last_name: z
    .string()
    .min(1, "First Name can't be empty")
    .max(32, "Last name length must be smaller than 32")
    .regex(new RegExp("^[a-zA-Z]+$"), "Only alphabets allowed"),

  email: z
    .string()
    .email("Invalid email format")
    .max(255, "Email length must be smaller than 255"),

  phone_number: z
    .string()
    .min(10, "Mobile number should be 10 digit only")
    .max(10, "Mobile number should be 10 digit only")
    .regex(/^\d+$/, "Phone number must contain only numbers"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password must be smaller than 100 characters"),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const RegisterForm = (props: Props) => {
  const [submitted, setsubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });
  const onSubmit = async (data: any) => {
    setsubmitted(true)

    const apiResponse = await fetch('/api/auth/signup',{
      method:'POST',
      headers:{
        Accept:'application.json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    })

    const response=await apiResponse.json()
    console.log(response)
    setsubmitted(false)

  };
  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          User Registration
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                id="first_name"
                {...register("first_name")}
                className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                  errors.first_name
                    ? "focus:ring-red-600 border-red-900 outline-none"
                    : "focus:ring-indigo-600"
                } sm:text-sm sm:leading-6`}
              />
            </div>
            {errors.first_name && (
              <span className="text-sm text-red-700">
                {errors.first_name.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                id="last-name"
                autoComplete="family-name"
                {...register("last_name")}
                className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                  errors.last_name
                    ? "focus:ring-red-600 border-red-900 outline-none"
                    : "focus:ring-indigo-600"
                } sm:text-sm sm:leading-6`}
              />
              {errors.last_name && (
                <span className="text-sm text-red-700">
                  {errors.last_name.message}
                </span>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                {...register("email")}
                id="email"
                className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                  errors.email
                    ? "focus:ring-red-600 border-red-900 outline-none"
                    : "focus:ring-indigo-600"
                } sm:text-sm sm:leading-6`}
              />
              {errors.email && (
                <span className="text-sm text-red-700">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Phone number
            </label>
            <div className="relative mt-2.5">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <label htmlFor="country" className="sr-only">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-4 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                >
                  <option value={"+91"}>IN</option>
                </select>
              </div>
              <input
                type="tel"
                {...register("phone_number")}
                id="phone-number"
                className={`block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                  errors.phone_number
                    ? "focus:ring-red-600 border-red-900 outline-none"
                    : "focus:ring-indigo-600"
                } sm:text-sm sm:leading-6`}
              />
            </div>
            {errors.phone_number && (
              <span className="text-sm text-red-700">
                {errors.phone_number.message}
              </span>
            )}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2.5">
              <input
                type="password"
                {...register("password")}
                id="password"
                className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                  errors.password
                    ? "focus:ring-red-600 border-red-900 outline-none"
                    : "focus:ring-indigo-600"
                } sm:text-sm sm:leading-6`}
              />
              {errors.password && (
                <span className="text-sm text-red-700">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className={`block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${submitted && 'opacity-50 pointer-events-none'}`}
          >
            {submitted ?'Submitting':'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
