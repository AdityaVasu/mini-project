import Head from 'next/head';
import '@styles/global.css';
import Nav from '@components/Nav';
import Footer from '@components/Footer';
import StarsCanvas from "@/components/StarBg";
export const metadata = {
  title: "MINI_PROJECT",
  description: "Discover the power of Bernstein Vazirani algorithm.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" type href="assets/images/logo.svg" />
      </Head>
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>

        <main className={` bg-[#030014] overflow-y-scroll overflow-x-hidden`}>
        

          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
