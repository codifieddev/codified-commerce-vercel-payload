"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";

interface HeroBlockProps {
  block: any;
}

export const HeroBlock: React.FC<HeroBlockProps> = (props) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  console.log(props);

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {typeof props.backgroundImage === "object" && props.backgroundImage?.url && (
          <Image
            src={props.backgroundImage.url}
            alt={props.title || "Hero background"}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container */}
      <motion.div
        className="relative z-10 w-full"
        style={{ maxWidth: `${props.containerWidth || 80}%` }}
        initial={designSystem.animations.fadeIn.initial}
        animate={designSystem.animations.fadeIn.animate}
        transition={designSystem.animations.fadeIn.transition}
      >
        <div className="rounded-3xl bg-gradient-to-b from-black/50 to-black/30 p-8 text-center backdrop-blur-sm md:p-12 lg:p-16">
          {/* Title */}
          <motion.h1
            className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {props.title}
          </motion.h1>

          {/* Subtitle */}
          {props.subtitle && (
            <motion.p
              className="mx-auto mb-8 max-w-3xl text-lg text-white/90 md:text-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {props.subtitle}
            </motion.p>
          )}

          {/* Buttons */}
          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {/* Primary Button */}
            <a href={props.primaryButton?.link || "#"} className={designSystem.button.primary}>
              {props.primaryButton?.text || "Learn More"}
            </a>

            {/* Video Popup Button */}
            {props.videoPopup?.enabled && props.videoPopup?.youtubeUrl && (
              <button
                onClick={() => setIsVideoOpen(true)}
                className="flex items-center gap-3 rounded-full border border-white/30 bg-white/20 px-8 py-3 font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/30"
              >
                <Play className="h-5 w-5" />
                Watch Video
              </button>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Video Modal */}
      {props.videoPopup?.enabled && props.videoPopup?.youtubeUrl && (
        <VideoModal
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
          videoId={getYouTubeId(props.videoPopup.youtubeUrl) || ""}
        />
      )}
    </section>
  );
};

interface VideosBlockProps {
  block: any;
}

export const VideosBlock: React.FC<VideosBlockProps> = (props) => {
  return (
    <section className={`${designSystem.spacing.section} bg-gray-50`}>
      <div className={designSystem.container.base}>
        {/* Section Title */}
        {props.sectionTitle && (
          <motion.h2
            className="mb-12 text-center text-3xl font-bold md:text-4xl"
            initial={designSystem.animations.fadeIn.initial}
            whileInView={designSystem.animations.fadeIn.animate}
            viewport={{ once: true }}
            transition={designSystem.animations.fadeIn.transition}
          >
            {props.sectionTitle}
          </motion.h2>
        )}

        {/* Videos Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {props.videos?.map((video, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              {/* Background Image */}
              <div className="relative h-[400px] md:h-[500px]">
                {typeof video.backgroundImage === "object" && video.backgroundImage?.url && (
                  <Image
                    src={video.backgroundImage.url}
                    alt={video.title || "Video thumbnail"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute right-0 bottom-0 left-0 p-6 md:p-8">
                {/* Title */}
                <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl">{video.title}</h3>

                {/* Blurbs */}
                {video.blurbs && video.blurbs.length > 0 && (
                  <div className="mb-6 space-y-3">
                    {video.blurbs.map((blurb, blurbIndex) => (
                      <div key={blurbIndex} className="flex items-center gap-3 text-white/90">
                        <div className="bg-primary h-1.5 w-1.5 rounded-full" />
                        <span className="text-sm md:text-base">{blurb.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Button */}
                {video.button && (
                  <a href={video.button.link} className={`${designSystem.button.primary} inline-block`}>
                    {video.button.text}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { AnimatePresence } from "framer-motion";

interface ProductCatalogBlockProps {
  block: any;
}

export const ProductCatalogBlock: React.FC<ProductCatalogBlockProps> = (props) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProducts =
    activeCategory === "all"
      ? props.products
      : props.products?.filter((product) => product.category === activeCategory);

  return (
    <section className={`${designSystem.spacing.section} bg-white`}>
      <div className={designSystem.container.base}>
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.h2
            className="mb-4 text-3xl font-bold md:text-4xl"
            initial={designSystem.animations.fadeIn.initial}
            whileInView={designSystem.animations.fadeIn.animate}
            viewport={{ once: true }}
          >
            {props.title}
          </motion.h2>

          {props.description && (
            <motion.p
              className="mx-auto max-w-2xl text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {props.description}
            </motion.p>
          )}
        </div>

        {/* Category Filter Tabs */}
        <motion.div
          className="mb-12 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-6 py-2.5 font-medium transition-all duration-300 ${
              activeCategory === "all"
                ? "bg-[#FF7020] text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>

          {props.categories?.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category.slug || "")}
              className={`rounded-full px-6 py-2.5 font-medium transition-all duration-300 ${
                activeCategory === category.slug
                  ? "bg-[#FF7020] text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProducts?.map((product, index) => (
              <motion.div
                key={index}
                className="group overflow-hidden rounded-2xl bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                {/* Product Image */}
                <div className="relative h-64 bg-gray-100">
                  {typeof product.image === "object" && product.image?.url && (
                    <Image
                      src={product.image.url}
                      alt={product.name || "Product"}
                      fill
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="mb-2 truncate text-lg font-semibold">{product.name}</h3>
                  <p className="text-xl font-bold text-[#FF7020]">{product.price}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface TestimonialBlockProps {
  block: any;
}

export const TestimonialBlock: React.FC<TestimonialBlockProps> = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === (props.testimonials?.length || 0) - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? (props.testimonials?.length || 0) - 1 : prev - 1));
  };

  const currentTestimonial = props.testimonials?.[currentIndex];

  return (
    <section className={`${designSystem.spacing.section} bg-gradient-to-br from-gray-50 to-gray-100`}>
      <div className={designSystem.container.narrow}>
        {/* Section Title */}
        {props.sectionTitle && (
          <motion.h2
            className="mb-16 text-center text-3xl font-bold md:text-4xl"
            initial={designSystem.animations.fadeIn.initial}
            whileInView={designSystem.animations.fadeIn.animate}
            viewport={{ once: true }}
          >
            {props.sectionTitle}
          </motion.h2>
        )}

        {/* Testimonial Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {currentTestimonial && (
              <motion.div
                key={currentIndex}
                className="relative rounded-3xl bg-white p-8 shadow-2xl md:p-12"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                {/* Quote Icon */}
                <div className="absolute top-8 left-8 text-[#FF7020] opacity-20">
                  <Quote className="h-16 w-16" />
                </div>

                {/* Testimonial Content */}
                <div className="relative z-10">
                  {/* Pre Text */}
                  {currentTestimonial.preText && (
                    <p className="mb-4 text-lg text-gray-700 italic md:text-xl">
                      {currentTestimonial.preText}
                    </p>
                  )}

                  {/* Mid Text */}
                  {currentTestimonial.midText && (
                    <p className="mb-4 text-base text-gray-600 md:text-lg">{currentTestimonial.midText}</p>
                  )}

                  {/* Post Text */}
                  {currentTestimonial.postText && (
                    <p className="mb-8 text-base text-gray-600 md:text-lg">{currentTestimonial.postText}</p>
                  )}

                  {/* Author Info */}
                  <div className="flex items-center gap-4 border-t border-gray-200 pt-6">
                    {/* Author Image */}
                    {typeof currentTestimonial.authorImage === "object" &&
                      currentTestimonial.authorImage?.url && (
                        <div className="relative h-16 w-16 overflow-hidden rounded-full">
                          <Image
                            src={currentTestimonial.authorImage.url}
                            alt={currentTestimonial.authorName || "Author"}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                    {/* Author Details */}
                    <div>
                      <p className="font-bold text-gray-900">{currentTestimonial.authorName}</p>
                      {currentTestimonial.authorTitle && (
                        <p className="text-sm text-gray-600">{currentTestimonial.authorTitle}</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          {(props.testimonials?.length || 0) > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={prevTestimonial}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg transition-all duration-300 hover:text-[#FF7020] hover:shadow-xl"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {props.testimonials?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "w-8 bg-[#FF7020]" : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg transition-all duration-300 hover:text-[#FF7020] hover:shadow-xl"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

import { useEffect } from "react";

import { X } from "lucide-react";
import { designSystem } from "@/lib/design-system";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, videoId }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="relative w-full max-w-5xl">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute -top-12 right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
                aria-label="Close video"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Video Container */}
              <div className="relative w-full overflow-hidden rounded-2xl bg-black pt-[56.25%] shadow-2xl">
                <iframe
                  className="absolute top-0 left-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
