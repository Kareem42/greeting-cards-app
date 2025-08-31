// app/page.tsx
"use client";

// import Image from "next/image";
import Link from "next/link";
import HeaderTitle from "@/components/HeaderTitle";
import { motion, useReducedMotion } from "framer-motion";

const container = (shouldReduce: boolean) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: shouldReduce
      ? { duration: 0.2 }
      : { staggerChildren: 0.12, delayChildren: 0.15 },
  },
});

const fadeUp = (shouldReduce: boolean) => ({
  hidden: { opacity: 0, y: shouldReduce ? 0 : 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: shouldReduce ? 0.2 : 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

export default function HomePage() {
  const shouldReduce = useReducedMotion();

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[80vh] w-full flex items-center justify-center text-center overflow-hidden">
        {/* Background image (Cloudinary) */}
        {/* <Image
          src="https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/f_auto,q_auto,w_2000/v123/your-banner.jpg"
          alt="Reflection of Me Greetings banner"
          fill
          priority
          className="object-cover"
        /> */}
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20" />

        {/* Content */}
        <motion.div
          variants={container(shouldReduce)}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-3xl px-6"
        >
          <HeaderTitle />

          <motion.p
            variants={fadeUp(shouldReduce)}
            className="mt-4 text-lg sm:text-xl text-white/90 font-montserrat"
          >
            Personalized cards that reflect your heart and style.
          </motion.p>

          <motion.div
            variants={fadeUp(shouldReduce)}
            className="mt-8 flex items-center justify-center gap-4"
          >
            {/* Primary CTA with micro-interactions */}
            <motion.div
              whileHover={{ y: shouldReduce ? 0 : -2 }}
              whileTap={{ scale: shouldReduce ? 1 : 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-md bg-pink-600 px-6 py-3 text-white font-semibold shadow-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                Shop Cards
                <motion.span
                  aria-hidden
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: 2,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>

            {/* Secondary CTA (optional) */}
            <motion.div
              whileHover={{ y: shouldReduce ? 0 : -2 }}
              whileTap={{ scale: shouldReduce ? 1 : 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Link
                href="/builder"
                className="inline-flex items-center gap-2 rounded-md bg-white/10 px-6 py-3 text-white font-semibold backdrop-blur-sm ring-1 ring-white/30 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/60"
              >
                Build Your Card
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
