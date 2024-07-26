"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Comparing Different Approaches -
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-5xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {" "}
              Instagram Comments
            </span>
            <br />
            Sentiment Analysis
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[600px]"
        >
          Implementing testing and deploying various Machine Learning and Deep Learning Models to assess their effectiveness
          in filtering negative sentiments from Instagram comments, aiming to
          combat negativity on social media platforms, which impacts youth.
        </motion.p>
        <div className="flex md:gap-5 mb-10 ">
          <motion.a
            variants={slideInFromLeft(1)}
            className="py-2 px-4 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
          >
            <Link href="/lstm">
              Roberta Model <br /> (Transformers Approach)
            </Link>
          </motion.a>

        
          <motion.a
            variants={slideInFromLeft(3)}
            className="py-2 px-4 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
          >
            <Link href="/naive">
              Laama Model (Explainable AI Approach)
            </Link>
          </motion.a>
        </div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        <div style={{ margin: "20px", borderRadius: "3%", overflow: "hidden" }}>
          <Image
            src="/assets/images/circuit2.jpg"
            alt="Description of your image"
            width={300}
            height={500}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
