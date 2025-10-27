import React, { useState } from "react";

export function InlineEditableHero({ hero, onSave, isEditable = false }) {
  const [editMode, setEditMode] = useState(false);
  const [heading, setHeading] = useState(hero?.heading || "");
  const [subheading, setSubheading] = useState(hero?.subheading || "");
  const [image, setImage] = useState(hero?.media?.url || "");
  const [imageFile, setImageFile] = useState(null);

  const handleSave = () => {
    // You can extend this to upload image and call API
    onSave({
      ...hero,
      heading,
      subheading,
      media: imageFile ? { ...hero.media, url: image } : hero.media,
    });
    setEditMode(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  if (editMode && isEditable) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-[60vh] bg-black/60">
        <input
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          placeholder="Heading"
          className="text-3xl font-bold mb-2 px-2 py-1 rounded"
        />
        <input
          type="text"
          value={subheading}
          onChange={(e) => setSubheading(e.target.value)}
          placeholder="Subheading"
          className="text-lg mb-4 px-2 py-1 rounded"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && (
          <img src={image} alt="Hero" className="mt-4 max-h-64 rounded shadow" />
        )}
        <div className="mt-4 flex gap-2">
          <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          <button onClick={() => setEditMode(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[60vh]">
      {image && (
        <img src={image} alt={hero?.media?.alt || "Hero"} className="absolute inset-0 w-full h-full object-cover opacity-70" />
      )}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold text-white mb-4">{heading}</h1>
        <p className="text-xl text-white mb-6">{subheading}</p>
        {isEditable && (
          <button
            onClick={() => setEditMode(true)}
            className="bg-white/80 text-black px-4 py-2 rounded shadow"
            style={{ position: "absolute", top: 20, left: 20 }}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
