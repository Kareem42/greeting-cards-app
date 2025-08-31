"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

// const wordAnim = {
//   hidden: { opacity: 0, y: 15 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
// };

export default function HeaderTitle() {
  //   const title = "Reflections of Me".split(" ");

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className="text-3xl sm:text-6xl font-playfair font-bold text-white cursor-pointer group relative"
    >
      <span className="transition duration-500 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-cyan-400 group-hover:bg-clip-text">
        Reflections of Me
      </span>
      {/*  */}
    </motion.h1>
  );
}
