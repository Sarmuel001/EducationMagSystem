import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image: "cbt1.jpeg",
    title: "Welcome to e - Management System",
    subtitle: "Practice • Prepare • Succeed",
  },
  {
    image: "cbt2.jpeg",
    title: "Real Exam Experience",
    subtitle: "Timed and Structured Tests",
  },
  {
    image: "cbt3.jpeg",
    title: "Multiple Subjects",
    subtitle: "Mathematics, English & More",
  },
  {
    image: "cbt4.jpeg",
    title: "Instant Results",
    subtitle: "Know Your Score Immediately",
  }
];

export default function HomeCarousel() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[220px] md:h-[380px] overflow-hidden rounded-xl shadow-md">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 space-y-3">
            <div
              className={`transition-all duration-700 ease-out transform ${
                index === current
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <h1 className="text-2xl md:text-4xl font-bold tracking-wide">
                {slide.title}
              </h1>
              <p className="mt-2 text-sm md:text-lg text-gray-200">
                {slide.subtitle}
              </p>

              {/* Animated & Pulsing Start Test Button */}
              {index === 0 && (
                <button
                  onClick={() => navigate("/login")}
                  className={`mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-700 ease-out transform opacity-100 translate-y-0 animate-pulse-slow`}
                >
                  Start Test
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full transition ${
              i === current ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
