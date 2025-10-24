import { ComponentConfig } from "@measured/puck";

export const HeroContainer: ComponentConfig = {
  label: "Hero Container",
  fields: {
    text: {
      type: "slot",
      allow: ["Text", "Button"],
    },
  },
  resolveFields: (data): any => {
    const fields = {
      background: {
        type: "radio",
        label: "Background Type",
        options: [
          { label: "Normal", value: "normal" },
          { label: "BackBehind", value: "back" },
        ],
      },
    };

    if (data.props.background === "normal") {
      return {
        ...fields,
        backgroundColor: {
          type: "text",
          label: "BG Color",
        },
      };
    } else if (data.props.background === "back") {
      return {
        ...fields,
        backgroundUrl: {
          type: "text",
          label: "Background Image URL",
        },
      };
    }

    return fields;
  },

  render: ({ background, backgroundColor, backgroundUrl, text: Text }) => {
    const getBackgroundStyle = () => {
      if (background === "normal" && backgroundColor) {
        return { backgroundColor };
      }
      if (background === "back" && backgroundUrl) {
        return {
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        };
      }
      return { backgroundColor: "#FFBF00" }; // default fallback
    };

    return (
      <section className="flex h-[70vh] w-screen items-center p-5">
        <div
          style={getBackgroundStyle()}
          className="flex h-full w-full flex-col items-center justify-center gap-3 p-5 text-center text-white"
        >
          <Text />
        </div>
      </section>
    );
  },
};
