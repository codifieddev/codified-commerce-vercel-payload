"use client";

import React, { useState } from "react";
import { Config, Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import { Text } from "./Small/Headers";
import { Button } from "./Small/Button";
import { Image } from "./Small/Image";
import { Spacer } from "./Small/Spacer";
import { Container } from "./Small/Container";
import { Divider } from "./Small/Divider";
import { HeroContainer } from "./MainComp/Hero";
import { AboutUsSection, AccordionSection, FeaturesSection, FormSection } from "./MainComp/Multiple";

export default function Editor() {
  const [pages, setPages] = useState([
    { id: "1", name: "Home", slug: "home", data: { content: [], root: {} } },
    { id: "2", name: "About", slug: "about", data: { content: [], root: {} } },
  ]);

  const [currentPageId, setCurrentPageId] = useState("1");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newPageName, setNewPageName] = useState("");

  const config: Config = {
    components: {
      Text,
      Button,
      Image,
      Spacer,
      Container,
      Divider,
      HeroContainer,
      AccordionSection,
      FeaturesSection,
      AboutUsSection,
      FormSection,
    },
    categories: {
      typography: {
        components: ["Text"],
        title: "Typography",
      },
      interactive: {
        components: ["Button"],
        title: "Interactive",
      },
      media: {
        components: ["Image"],
        title: "Media",
      },
      layout: {
        components: ["Container", "Spacer", "Divider"],
        title: "Layout",
      },
      hero_sections: {
        components: ["HeroContainer", "AccordionSection", "FeaturesSection", "AboutUsSection", "FormSection"],
        title: "Other Sections",
      },
    },
  };

  const currentPage = pages.find((p) => p.id === currentPageId);

  const handleCreatePage = () => {
    if (!newPageName.trim()) {
      alert("Please enter a page name");
      return;
    }

    const newPage = {
      id: Date.now().toString(),
      name: newPageName,
      slug: newPageName.toLowerCase().replace(/\s+/g, "-"),
      data: { content: [], root: {} },
    };

    setPages([...pages, newPage]);
    setNewPageName("");
    setCurrentPageId(newPage.id);
    setShowAddModal(false);
  };

  const handleChange = (data: any) => {
    // Auto-save changes as you edit
    setPages(pages.map((p) => (p.id === currentPageId ? { ...p, data } : p)));
  };

  const handleSave = (data: any) => {
    setPages(pages.map((p) => (p.id === currentPageId ? { ...p, data } : p)));
    console.log("Published page:", currentPage?.name, data);
    alert(`Page "${currentPage?.name}" published successfully!`);
  };

  const handleDeletePage = () => {
    if (pages.length === 1) {
      alert("Cannot delete the last page");
      return;
    }

    const remainingPages = pages.filter((p) => p.id !== currentPageId);
    setPages(remainingPages);
    setCurrentPageId(remainingPages[0].id);
    setShowDeleteModal(false);
  };

  return (
    <div className="flex flex-col">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5 shadow-sm">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-gray-900">Page Builder</h1>
          <span className="text-gray-300">|</span>

          {/* Page Selector */}
          <div className="flex items-center gap-2">
            <select
              value={currentPageId}
              onChange={(e) => setCurrentPageId(e.target.value)}
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {pages.map((page) => (
                <option key={page.id} value={page.id}>
                  {page.name}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowAddModal(true)}
              className="rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-600"
              title="Add New Page"
            >
              + Add Page
            </button>

            {pages.length > 1 && (
              <button
                onClick={() => setShowDeleteModal(true)}
                className="rounded-md bg-red-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-600"
                title="Delete Current Page"
              >
                Delete
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">/{currentPage?.slug}</span>
          <span className="text-xs text-gray-400">{currentPage?.data.content?.length || 0} components</span>
        </div>
      </div>

      {/* Puck Editor */}
      <div className="flex-1 overflow-hidden">
        <Puck
          key={currentPageId}
          config={config}
          data={currentPage?.data!}
          onPublish={handleSave}
          onChange={handleChange}
        />
      </div>

      {/* Add Page Modal */}
      {showAddModal && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-bold text-gray-900">Create New Page</h2>
            <input
              type="text"
              value={newPageName}
              onChange={(e) => setNewPageName(e.target.value)}
              placeholder="Enter page name..."
              className="mb-4 w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onKeyPress={(e) => e.key === "Enter" && handleCreatePage()}
              autoFocus
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewPageName("");
                }}
                className="rounded-md bg-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePage}
                className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h2 className="mb-2 text-xl font-bold text-gray-900">Delete Page</h2>
            <p className="mb-4 text-gray-600">
              Are you sure you want to delete "<strong>{currentPage?.name}</strong>"? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="rounded-md bg-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePage}
                className="rounded-md bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
