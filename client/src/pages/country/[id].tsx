// import Link from "next/link";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import Chart from "@/components/chart";

interface CountryInfo {
  name: string,
    listOfBorders: {
        commonName: string,
        officialName: string,
        countryCode: string,
        region: string,
            
    }[],
    populationData: {
        year: number,
        value: number
    }[],
    flagImgUrl: string;
}


export const getServerSideProps: GetServerSideProps<{ countryInfo: CountryInfo }> = (async (
  context
) => {
  const { query } = context;
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/countries/" + query.id
  );
  const countryInfo: CountryInfo = await res.json();
  return { props: { countryInfo } };
}) satisfies GetServerSideProps<{ countryInfo: CountryInfo }>;



export default function Country({
  countryInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!countryInfo) {
    return <p>Loading...</p>; // Handle loading state
  }
  console.log(countryInfo)
  return (
    <div className="p-[5%] space-y-[5%]">
      <h1 className="w-max mx-auto text-xl md:text-3xl xl:text-6xl">
        {countryInfo.name}
      </h1>
      <div className="grid grid-cols-6 gap-[5%] mt-10 md:mt-20 lg:mt-32">
        <img src = {countryInfo.flagImgUrl} className="w-full h-full object-cover col-span-5"/>
        <div className="w-full h-full flex flex-col gap-[2vh] col-span-1">
          <h2 className="w-max mx-auto md:text-lg xl:text-3xl font-medium">
            Neighborhoods:
          </h2>
          <div className="flex flex-col gap-[2vh] ">
            {
              countryInfo.listOfBorders.map((country) => 
                <Link href = {`/country/${country.countryCode}`} key = {country.commonName} className="hover:opacity-75 text-md md:text-2xl">
                  {country.commonName}
                </Link>
              )
            }
          </div>
        </div>
      </div>
      <Chart data = {countryInfo.populationData}/>
    </div>
  );
}
