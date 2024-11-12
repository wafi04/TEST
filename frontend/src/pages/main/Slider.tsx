"use client";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import EachUtils from "../../utils/EachUtils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ProductData } from "../../types/products";

export function Slider({ data }: { data: ProductData[] }) {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4);

  // Hook untuk mendapatkan lebar layar dan mengatur jumlah item yang terlihat
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1); // Layar kecil
      } else if (window.innerWidth < 768) {
        setVisibleItems(2); // Layar sedang
      } else if (window.innerWidth < 1024) {
        setVisibleItems(3); // Layar besar
      } else {
        setVisibleItems(4); // Layar ekstra besar
      }
    };

    // Panggil saat pertama kali render
    handleResize();

    // Tambahkan event listener
    window.addEventListener("resize", handleResize);

    // Hapus event listener saat komponen unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex + visibleItems >= data.length ? 0 : prevIndex + visibleItems
    );
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(0, data.length - visibleItems)
        : Math.max(0, prevIndex - visibleItems)
    );
  };

  const displayedItems = data.slice(startIndex, startIndex + visibleItems);

  return (
    <div className="relative w-full py-8">
      <div className={`grid grid-cols-${visibleItems} gap-6`}>
        <EachUtils
          of={displayedItems}
          render={(item) => <SliderData key={item.id} item={item} />}
        />
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -left-4 transform -translate-y-1/2 rounded-full shadow-md"
        onClick={prevSlide}
        disabled={startIndex === 0}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 -right-4 transform -translate-y-1/2 rounded-full shadow-md"
        onClick={nextSlide}
        disabled={startIndex + visibleItems >= data.length}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

// Komponen SliderData tetap sama
export function SliderData({ item }: { item: ProductData }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="w-full overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <CardContent className="p-0">
        <Link to={`/p/${item.id}`}>
          <div className="relative h-[280px] w-full overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transform transition-transform duration-500 ease-out"
              style={{ transform: isHovered ? "scale(1.2)" : "scale(1)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-white/500" />
            <h3 className="absolute bottom-4 left-4 text-md text-white">
              {item.name}
            </h3>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
