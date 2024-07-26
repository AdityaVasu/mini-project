import Encryption from "@components/Encryption";
import Feed from "@components/Feed";
import Hero from "@components/Hero";
import Image from "next/image";
import StarsCanvas from "@/components/StarBg";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <Hero />

      <StarsCanvas />
      <Encryption />
    </section>
  );
};

export default Home;
