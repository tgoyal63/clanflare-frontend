export type TestimonilProps = {
  profileImage: any;
  name: string;
  role?: string;
  details: string;
  key: string | number;
};

export default function Testimonials(props: TestimonilProps) {
  return (
    <>
      <div className="col-span-1 bg-opacity-50 border-opacity-30 bg-slate-900 relative p-4 border border-slate-500 rounded-xl">
        <span className="absolute z-[-5] blur-2xl h-24 w-24 bg-gradient-to-t from-cyan-700 to-pink-700"></span>
        <p>
          <span className="block pt-4  leading-3">{'"'}</span>
          {props.details}
        </p>
        <div className="flex pt-4 items-center">
          <img
            className="inline-block h-6 w-6 mr-4 rounded-full ring-2 ring-red-400 ring-white"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <div>
            <span className="text-md block font-bold">{props.name}</span>
            <span>{props.role}</span>
          </div>
        </div>
      </div>
    </>
  );
}
