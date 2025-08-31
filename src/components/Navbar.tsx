"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/home", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/builder", label: "Build" },
  { href: "/donate", label: "Donate" },
];

export default function Navbar() {
  return (
    <nav className="flex gap-8 font-montserrat font-semibold text-lg">
      {navLinks.map((link) => (
        <motion.div
          key={link.href}
          whileHover={{ y: -3, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 20 }}
          className="relative group cursor-pointer"
        >
          <Link href={link.href} className="relative z-10">
            <span className="transition duration-300 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-600 group-hover:bg-clip-text">
              {link.label}
            </span>
          </Link>
          <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300 group-hover:w-full" />
        </motion.div>
      ))}
    </nav>
  );
}
