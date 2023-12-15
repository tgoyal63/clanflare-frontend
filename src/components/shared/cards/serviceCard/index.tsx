import { Card, CardTitle } from "@/components/ui/card";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import "./styles.css";
import Link from "next/link";

type Props = {
  imgSrc: string | StaticImport;
  href: string;
  title: string;
  discription?: string;
};

/* TODO 
 create a ncie hover effect that glows, 
 cant do directly as it dioes not respect day/night theme
 will have to use css variables to apply thes colors
*/

export default function ServiceDispalyCard({
  imgSrc,
  href,
  title,
  discription,
}: Props) {
  return (
    <>
      <Link
        href={{
          pathname: href,
          query: {
            step: 1,
          },
        }}
      >
        <Card className="service-card relative h-fit w-36 rounded-2xl p-4 transition-colors  hover:border-primary ">
          <h1 className="text-center font-semibold ">{title}</h1>
          <Image src={imgSrc} alt="service" className="my-4 h-14 w-full" />
          <p className="text-muted-foreground">
            {discription ? discription : ""}
          </p>
        </Card>
      </Link>
    </>
  );
}
