"use client";

import React from "react";
import { Config, Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import { Text } from "./Small/Headers";
import { Button } from "./Small/Button";
import { Image } from "./Small/Image";
import { Spacer } from "./Small/Spacer";
import { Container } from "./Small/Container";
import { Divider } from "./Small/Divider";
import { HeroContainer } from "./MainComp/Hero";

export default function Editor() {
  // Create Puck component config
  const config: Config = {
    components: {
      Text,
      Button,
      Image,
      Spacer,
      Container,
      Divider,
      HeroContainer,
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
      hero: {
        components: ["HeroContainer"],
        title: "Hero Sections",
      },
    },
  };

  // Describe the initial data (must contain 'content' array)
  const initialData = {};

  // Save handler
  const save = (data: any) => {
    //console.log("Published data:", data);
    // TODO: send data to backend or database
  };
 console.log("Rendering Editor", initialData);
  // Render Puck editor
  return <Puck config={config} data={initialData} onPublish={save} />;
}
