import React from "react";
import Image from "next/image";

interface ImageInfiniteSliderProps {
    images: string[];
    speed?: number;
    direction?: "left" | "right";
    imageWidth?: number;
    imageHeight?: number;
    gap?: number;
}

const ImageInfiniteSlider: React.FC<ImageInfiniteSliderProps> = ({
                                                                     images,
                                                                     speed = 50,
                                                                     direction = "left",
                                                                     imageWidth = 120,
                                                                     imageHeight = 80,
                                                                     gap = 16,
                                                                 }) => {
    const totalWidth = images.length * (imageWidth + gap);
    const duration = totalWidth / speed;
    const animationDirection = direction === "right" ? "reverse" : "normal";

    return (
        <div className="overflow-hidden w-full">
            <div
                className="flex flex-nowrap animate-scroll"
                style={
                    {
                        "--totalWidth": `${totalWidth}px`,
                        "--duration": `${duration}s`,
                        "--animationDirection": animationDirection,
                    } as React.CSSProperties
                }
            >
                {[...images, ...images].map((src, index) => (
                    <div
                        key={`slider-${index}`}
                        className="relative flex-shrink-0"
                        style={{
                            width: `${imageWidth}px`,
                            height: `${imageHeight}px`,
                            marginRight: `${gap}px`,
                        }}
                    >
                        <Image
                            src={src}
                            alt={`Slider Image ${index}`}
                            fill
                            sizes={`${imageWidth}px`}
                            style={{ objectFit: "cover" }}
                            priority
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/assets/icon.png";
                            }}
                        />
                    </div>
                ))}
            </div>
            <style jsx>{`
              @keyframes scroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(calc(-1 * var(--totalWidth)));
                }
              }

              .animate-scroll {
                animation: scroll var(--duration) linear infinite var(--animationDirection);
              }
            `}</style>
        </div>
    );
};

export default ImageInfiniteSlider;
