"use client";

import { useRef, useState, useEffect } from "react";

interface Card {
  id: number;
  title: string;
  image: string;
  price: number;
}

interface Category {
  id: number;
  name: string;
  cards: Card[];
}

export default function CategoryCarousel({ category }: { category: Category }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 768) setCardsPerView(1);
      else if (width < 1024) setCardsPerView(2);
      else setCardsPerView(4);
    };
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, category.cards.length - cardsPerView);

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index);
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const cardWidth = containerWidth / cardsPerView;
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-8 sm:mb-12">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 font-playfair">
          {category.name}
        </h2>
        {/* Hide arrows on mobile */}
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scrollToIndex(Math.max(currentIndex - 1, 0))}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            ‹
          </button>
          <button
            onClick={() => scrollToIndex(Math.min(currentIndex + 1, maxIndex))}
            disabled={currentIndex >= maxIndex}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            ›
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
      >
        {category.cards.map((card) => (
          <div
            key={card.id}
            className="flex-shrink-0 min-w-[85%] sm:min-w-[47%] lg:min-w-[23%] snap-center group"
          >
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-64 sm:h-72 lg:h-80 object-cover transition-transform group-hover:scale-110"
              />
              <div className="p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 font-montserrat mb-2">
                  {card.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg sm:text-xl font-bold text-purple-600">
                    ${card.price}
                  </span>
                  <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium text-sm sm:text-base hover:scale-105 transition">
                    Customize
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentIndex ? "bg-purple-500 w-6" : "bg-gray-300 w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
