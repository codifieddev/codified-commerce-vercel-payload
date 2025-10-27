import React from "react";
import { Media } from "@/components/Media";

export default function TilesviewHero(props: any) {
  const {
    mainHeading = [],
    subHeading,
    description,
    buttonText,
    ratings = [],
    backgroundImage,
    logo,
  } = props;

  return (
    <section
      className="tilesview-hero"
      style={{
        backgroundImage: backgroundImage?.url ? `url(${backgroundImage.url})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto py-12 flex flex-col md:flex-row items-center">
        <div className="flex-1">
          <div className="flex items-center mb-4">
            {logo && <Media resource={logo} className="h-12 w-auto mr-4" />}
            <h1 className="text-5xl font-bold">
              {mainHeading.map((part: any, idx: number) => (
                <span key={idx} style={{ color: part.color || "inherit" }}>
                  {part.text}{" "}
                </span>
              ))}
            </h1>
          </div>
          <h2 className="text-2xl font-semibold mb-2">{subHeading}</h2>
          <p className="mb-6 text-lg">{description}</p>
          {buttonText && (
            <button className="px-6 py-3 bg-teal-900 text-white rounded-lg font-semibold">
              {buttonText}
            </button>
          )}
          <div className="flex gap-8 mt-6">
            {ratings.map((rating: any, idx: number) => (
              <div key={idx} className="flex items-center gap-2">
                {rating.icon && <span className={rating.icon} />}
                <span className="font-bold text-xl">{rating.value}</span>
                <span className="text-sm">{rating.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          {/* Optionally render a hero image or illustration here */}
        </div>
      </div>
    </section>
  );
}