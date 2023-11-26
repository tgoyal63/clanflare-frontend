import { TestiMonialCards } from "@/components";
import Image from "next/image";
import Link from "next/link";

import mainImage from "@/assets/landingpage/dashboard.png";
import { Check } from "lucide-react";

const MockData = [
  {
    profileImage: "image1.jpg",
    name: "John Doe",
    role: "Designer",
    details: "John is a talented designer with a great eye for detail.",
  },
  {
    profileImage: "image2.jpg",
    name: "Jane Smith",
    details: "Jane is a skilled developer with a passion for coding.",
  },
  {
    profileImage: "image3.jpg",
    name: "Alice Johnson",
    role: "Project Manager",
    details: "Alice is an organized project manager who keeps things on track.",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen  flex-col items-center justify-between bg-slate-950 text-white">
      <div className="sticky top-0 z-40 grid w-full place-items-center  shadow-lg backdrop-blur-xl">
        <nav className="flex w-full max-w-7xl items-center px-4 py-3">
          <Link className="flex items-center gap-3 font-bold" href="#">
            {/* <Image src={logo} className="h-14 w-14" alt="authify" /> */}
            Authopi
          </Link>
          <ul className="ml-4 flex items-center space-x-2 opacity-80 ">
            <li>
              <Link href={"#featchers"}>Features</Link>
            </li>
            <li className="">
              <Link href={"#price"}>Pricing</Link>
            </li>
          </ul>

          <ul className="ml-auto flex items-center space-x-2 ">
            <li>
              <Link
                className="rounded-full border border-zinc-900  px-4 py-2 transition-colors hover:border-zinc-700"
                href={"/auth"}
              >
                Login
              </Link>
            </li>
            <li className="">
              <Link
                className="rounded-full bg-indigo-700 px-4 py-2 font-semibold transition-colors hover:bg-indigo-800"
                href={"/auth"}
              >
                Signup
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* Hero section */}
      <div className="z-10 max-w-5xl  px-4  text-sm">
        <section
          id="hero"
          className="mt-20  grid place-content-center text-center"
        >
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold leading-tight  tracking-tight">
              <span className="fancy-text-hilight hlight-1">Streamline</span>,
              {"  "}
              <span className="fancy-text-hilight hlight-2">Secure</span>, and
              {"  "}
              <span className="fancy-text-hilight hlight-3">Scale</span>
              Your Discord Community
            </h1>
            <p className="text-md mt-4 max-w-lg text-center font-bold leading-snug tracking-wider">
              Authify, our Ultimate Solution for User Management and
              Authentication on Discord
            </p>
          </div>
          <div className="my-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              className="btn-hero w-fit rounded-md px-6 py-4 font-bold active:bg-slate-700 "
              href={"/auth"}
            >
              Create Account for free
            </Link>
            <Link
              href={"/auth"}
              className="w-fit rounded-md border border-slate-300 px-6 py-4 font-bold text-slate-300 transition-colors duration-300 hover:border-primary hover:text-primary "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="mr-4 inline-block"
              >
                <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
              </svg>
              Login with Discord
            </Link>
          </div>
        </section>
        <div className="mt-28">
          <div className="flex w-full rounded-t-lg bg-zinc-900">
            <ul className="main-image-window-controls flex gap-1">
              <li className="bg-gray-600"></li>
              <li className="bg-gray-600"></li>
              <li className="bg-gray-600"></li>
            </ul>
          </div>
          <div className="main-image ">
            <Image
              src={mainImage}
              alt="dashboard image display"
              className="rounded-b-lg"
            />
          </div>
        </div>
        {/* Testimonial Section */}
        <h2 className="mb-16 mt-20 text-center text-5xl font-semibold ">
          Testimonials
        </h2>{" "}
        <section
          id="testimonial"
          className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-6"
        >
          {MockData.map((items, i) => {
            return (
              <TestiMonialCards
                key={i}
                details={items.details}
                name={items.name}
                profileImage={items.profileImage}
                role={items.role}
              />
            );
          })}
        </section>
        <h2 className="relative mb-16 mt-20 text-center text-5xl font-semibold ">
          Features you get
          <div className=" absolute left-[50%]  top-0 z-[-10] h-32 w-32 translate-x-[-50%] rounded-full bg-gradient-to-t from-indigo-900 to-red-900 blur-2xl"></div>
        </h2>{" "}
        <section>
          <h2 className="mb-4 text-3xl font-semibold">Lorem, ipsum.</h2>
          <h2 className="text-lg">
            Get Otp othentication inside you discord server, even better link
            google sheet and only people there can access it
            <ul>
              <li>one</li>
              <li>one</li>
              <li>one</li>
            </ul>
          </h2>

          <h2 className="mt-8 text-xl font-semibold">Lorem, ipsum.</h2>

          <span>
            Get Otp othentication inside you discord server, even better link
            google sheet and only people there can access it
          </span>
          <h2>Track User activities in a way not possible before this </h2>
          <h2>CRM Dashboard</h2>
        </section>
        <section>Special Featcherd Mods</section>
        <h2 className="mb-16 mt-20 text-center text-5xl font-semibold ">
          Pricng
        </h2>
        <section className="relative grid  place-items-center gap-4  sm:grid-cols-2">
          <div className="absolute left-[50%] top-0 z-[-5] h-60 w-60 translate-x-[-50%] bg-gradient-to-t from-sky-900  to-emerald-950 blur-3xl"></div>

          <SamplePricingComponent />
          <SamplePricingComponent />
        </section>
        {/* blog */}
        <div className="absolute left-[50%] top-0 z-[-10] h-32 w-1/3 translate-x-[-50%] rounded-full bg-gradient-to-t  from-indigo-800 to-emerald-950 blur-[10rem] "></div>
      </div>

      {/* footer */}
      <footer className="mt-10 flex w-full  justify-between gap-10 border-t bg-black px-10 py-10">
        <div className="h-full place-self-center text-xl font-bold">
          Authopi
        </div>
        <ul>
          <h4 className="mb-4 block font-semibold opacity-90">
            Social Handles
          </h4>
          <li className="text-zinc-400"> linkdin</li>
          <li className="text-zinc-400">Twitter</li>
        </ul>
        <ul>
          <span className="mb-4 block font-semibold opacity-90">Resources</span>
          <li className="text-zinc-400"> linkdin</li>
          <li className="text-zinc-400">Twitter</li>
        </ul>
        <ul>
          <span className="mb-4 block font-semibold opacity-90">
            Contact Us
          </span>
          <li className="text-zinc-400"> linkdin</li>
          <li className="text-zinc-400">Twitter</li>
        </ul>
      </footer>
    </main>
  );
}

function SamplePricingComponent() {
  return (
    <>
      <div className="relative max-w-sm rounded-xl border border-slate-800 bg-slate-950 bg-opacity-40 px-10 py-8">
        <h3 className="text-xl font-bold">Custom Solution</h3>
        <span className="mb-3 mt-1 block text-3xl font-bold">Custom</span>
        <span className="block font-semibold text-gray-300">
          For teams with more security, support, and performance needs.
        </span>

        <ul className="mt-4 space-y-4 ">
          <li className="flex gap-2">
            {" "}
            <Check
              height={"1.5rem"}
              width={"1.5rem"}
              className="rounded-full bg-gray-50 p-1 text-black"
            />{" "}
            feacture 1
          </li>
          <li className="flex gap-2">
            {" "}
            <Check
              height={"1.5rem"}
              width={"1.5rem"}
              className="rounded-full bg-gray-50 p-1 text-black"
            />{" "}
            feacture 1
          </li>
          <li className="flex gap-2">
            {" "}
            <Check
              height={"1.5rem"}
              width={"1.5rem"}
              className="rounded-full bg-gray-50 p-1 text-black"
            />{" "}
            feacture 1
          </li>
          <li className="flex gap-2">
            {" "}
            <Check
              height={"1.5rem"}
              width={"1.5rem"}
              className="rounded-full bg-gray-50 p-1 text-black"
            />{" "}
            feacture 1
          </li>
          <li className="flex gap-2">
            {" "}
            <Check
              height={"1.5rem"}
              width={"1.5rem"}
              className="rounded-full bg-gray-50 p-1 text-black"
            />{" "}
            feacture 1
          </li>
          <li className="flex gap-2">
            {" "}
            <Check
              height={"1.5rem"}
              width={"1.5rem"}
              className="rounded-full bg-gray-50 p-1 text-black"
            />{" "}
            feacture 1
          </li>
        </ul>

        {/* footer */}
        <div>
          <button className="mt-4 w-full rounded-xl bg-indigo-800 px-4 py-2 text-center hover:bg-indigo-700 active:bg-indigo-600">
            Get it know
          </button>
        </div>
      </div>
    </>
  );
}
