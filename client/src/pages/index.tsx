import localFont from "next/font/local";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Link from "next/link";
type Countries =  {
  countryCode: string, name: string
}
 
export const getServerSideProps = (async () => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + '/' + 'countries'
  const res = await fetch(url)
  const countries: Countries[] = await res.json()
  return { props: { countries } }
}) satisfies GetServerSideProps<{ countries: Countries[] }>



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home({
  countries,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(countries)
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid  items-center justify-items-center min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 items-center sm:items-start text-md md:text-2xl">
        {
          countries.map((country) => 
            <Link href = {`/country/${country.countryCode}`} key = {country.name} className="hover:opacity-75">
              {country.name}
            </Link>
          )
        }
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
