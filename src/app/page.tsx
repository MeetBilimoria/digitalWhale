import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import ProductReal from "@/components/ProductReal";

const perks = [
  {
    name: "Instant Delivery",
    Icon: ArrowDownToLine,
    description:
      "Get Your assests Deliverd to Your Email in seconds and download right away.",
  },
  {
    name: "Garanteed Quality",
    Icon: CheckCircle,
    description:
      " Every asset on our platform is verified by our team to ensure our highest quality standards. Not Happy? We give 30days Garanteed Refunds",
  },
  {
    name: "For the planet",
    Icon: Leaf,
    description:
      " We've pledge 1% of sales to the preservation and restoration of natural environment",
  },
];

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className=" py-20 text-center mx-auto flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your Marketplace for high-quality{" "}
            <span className="text-orange-600">Digital Assests</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            {" "}
            Welcome to the DigitalWhale, Every asset on our platform is verified
            by our team to ensure our highest quality standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6 ">
            <Link href="/products" className={buttonVariants()}>
              Browse Trending
            </Link>
            <button className={buttonVariants({ variant: "light" })}>
              {" "}
              Our quality promise &rarr;
            </button>
          </div>
        </div>
    <ProductReal title="BrandNew" href="/product" query={{sort:"desc",limit:4}}/>
      </MaxWidthWrapper>
      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20  ">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className=" md:flex-shrink-0 flex justify-center  ">
                  <div className="h-10 w-16 flex items-center justify-center rounded-full bg-orange-100 text-orange-400">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
