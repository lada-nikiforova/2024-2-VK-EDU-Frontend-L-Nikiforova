import { useState, useEffect, useRef } from "react";

const LazyImage = ({ src, className, alt, containerSelector = "body" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const scrollContainer = document.querySelector(containerSelector);

    const handleScroll = () => {
      if (!imgRef.current) return;

      const rect = imgRef.current.getBoundingClientRect();
      const isInViewport = rect.top <= window.innerHeight && rect.bottom >= 0;

      if (isInViewport) {
        setIsVisible(true);
        scrollContainer?.removeEventListener("scroll", handleScroll);
      }
    };

    handleScroll(); // Проверяем сразу при монтировании
    scrollContainer?.addEventListener("scroll", handleScroll);

    return () => scrollContainer?.removeEventListener("scroll", handleScroll);
  }, [containerSelector]);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : ""}
      className={className}
      alt={alt}
      style={{
        opacity: isVisible ? 1 : 0.5,
        transition: "opacity 0.3s ease-in-out",
      }}
    />
  );
};

export default LazyImage;
