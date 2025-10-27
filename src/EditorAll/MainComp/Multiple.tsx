import { ComponentConfig } from "@measured/puck";

// Accordion Section
export const AccordionSection: ComponentConfig = {
  label: "Accordion Section",
  fields: {
    title: {
      type: "text",
      label: "Section Title",
    },
    items: {
      type: "array",
      label: "Accordion Items",
      arrayFields: {
        question: {
          type: "text",
          label: "Question",
        },
        answer: {
          type: "textarea",
          label: "Answer",
        },
      },
      defaultItemProps: {
        question: "New Question",
        answer: "Answer text here",
      },
    },
  },
  resolveFields: (data): any => {
    const baseFields = {
      title: {
        type: "text",
        label: "Section Title",
      },
      items: {
        type: "array",
        label: "Accordion Items",
        arrayFields: {
          question: { type: "text", label: "Question" },
          answer: { type: "textarea", label: "Answer" },
        },
      },
      backgroundColor: {
        type: "text",
        label: "Background Color",
      },
      textColor: {
        type: "text",
        label: "Text Color",
      },
      accentColor: {
        type: "text",
        label: "Accent Color",
      },
    };

    return baseFields;
  },
  defaultProps: {
    title: "Frequently Asked Questions",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    accentColor: "#FFBF00",
    items: [
      {
        question: "What is this?",
        answer: "This is an accordion component.",
      },
    ],
  },
  render: ({ title, items, backgroundColor, textColor, accentColor }) => {
    return (
      <section style={{ backgroundColor, color: textColor }} className="w-screen px-5 py-16">
        <div className="mx-auto max-w-4xl">
          {title && <h2 className="mb-8 text-center text-3xl font-bold">{title}</h2>}
          <div className="space-y-4">
            {items?.map((item: any, index: number) => (
              <details
                key={index}
                className="group rounded-lg border p-4"
                style={{ borderColor: accentColor }}
              >
                <summary className="cursor-pointer text-lg font-semibold" style={{ color: accentColor }}>
                  {item.question}
                </summary>
                <p className="mt-3 text-base opacity-80">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    );
  },
};

// About Us Section
export const AboutUsSection: ComponentConfig = {
  label: "About Us Section",
  fields: {},
  resolveFields: (data): any => {
    const baseFields = {
      layout: {
        type: "radio",
        label: "Layout Style",
        options: [
          { label: "Image Left", value: "image-left" },
          { label: "Image Right", value: "image-right" },
          { label: "Centered", value: "centered" },
        ],
      },
      heading: {
        type: "text",
        label: "Heading",
      },
      subheading: {
        type: "text",
        label: "Subheading",
      },
      description: {
        type: "textarea",
        label: "Description",
      },
      backgroundColor: {
        type: "text",
        label: "Background Color",
      },
      textColor: {
        type: "text",
        label: "Text Color",
      },
    };

    if (data.props.layout !== "centered") {
      return {
        ...baseFields,
        imageUrl: {
          type: "text",
          label: "Image URL",
        },
      };
    }

    return baseFields;
  },
  defaultProps: {
    layout: "image-left",
    heading: "About Us",
    subheading: "Our Story",
    description:
      "We are a company dedicated to excellence and innovation. Our team works tirelessly to deliver the best solutions for our clients.",
    imageUrl: "https://via.placeholder.com/600x400",
    backgroundColor: "#f9fafb",
    textColor: "#111827",
  },
  render: ({ layout, heading, subheading, description, imageUrl, backgroundColor, textColor }) => {
    const isCentered = layout === "centered";
    const isImageRight = layout === "image-right";

    return (
      <section style={{ backgroundColor, color: textColor }} className="w-screen px-5 py-16">
        <div className="mx-auto max-w-6xl">
          {isCentered ? (
            <div className="text-center">
              <h2 className="mb-4 text-4xl font-bold">{heading}</h2>
              <h3 className="mb-6 text-xl font-medium opacity-80">{subheading}</h3>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed opacity-70">{description}</p>
            </div>
          ) : (
            <div
              className={`flex flex-col items-center gap-8 md:flex-row ${
                isImageRight ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <img src={imageUrl} alt={heading} className="h-auto w-full rounded-lg shadow-lg" />
              </div>
              <div className="flex-1">
                <h2 className="mb-4 text-4xl font-bold">{heading}</h2>
                <h3 className="mb-6 text-xl font-medium opacity-80">{subheading}</h3>
                <p className="text-lg leading-relaxed opacity-70">{description}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  },
};

// Form Section (Login/Register)
export const FormSection: ComponentConfig = {
  label: "Form Section",
  fields: {},
  resolveFields: (data): any => {
    const baseFields = {
      formType: {
        type: "radio",
        label: "Form Type",
        options: [
          { label: "Login", value: "login" },
          { label: "Register", value: "register" },
          { label: "Contact", value: "contact" },
        ],
      },
      heading: {
        type: "text",
        label: "Form Heading",
      },
      submitButtonText: {
        type: "text",
        label: "Submit Button Text",
      },
      backgroundColor: {
        type: "text",
        label: "Background Color",
      },
      formBackgroundColor: {
        type: "text",
        label: "Form Background Color",
      },
      buttonColor: {
        type: "text",
        label: "Button Color",
      },
      textColor: {
        type: "text",
        label: "Text Color",
      },
    };

    return baseFields;
  },
  defaultProps: {
    formType: "login",
    heading: "Welcome Back",
    submitButtonText: "Submit",
    backgroundColor: "#f3f4f6",
    formBackgroundColor: "#ffffff",
    buttonColor: "#FFBF00",
    textColor: "#111827",
  },
  render: ({
    formType,
    heading,
    submitButtonText,
    backgroundColor,
    formBackgroundColor,
    buttonColor,
    textColor,
  }) => {
    const renderFormFields = () => {
      if (formType === "login") {
        return (
          <>
            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                style={{ color: textColor }}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                style={{ color: textColor }}
              />
            </div>
          </>
        );
      }

      if (formType === "register") {
        return (
          <>
            <div>
              <label className="mb-2 block text-sm font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                style={{ color: textColor }}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                style={{ color: textColor }}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                style={{ color: textColor }}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
                style={{ color: textColor }}
              />
            </div>
          </>
        );
      }

      // Contact form
      return (
        <>
          <div>
            <label className="mb-2 block text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
              style={{ color: textColor }}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
              style={{ color: textColor }}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Message</label>
            <textarea
              rows={4}
              placeholder="Enter your message"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none"
              style={{ color: textColor }}
            />
          </div>
        </>
      );
    };

    return (
      <section style={{ backgroundColor }} className="flex min-h-[80vh] w-screen items-center px-5 py-16">
        <div className="mx-auto w-full max-w-md">
          <div
            style={{ backgroundColor: formBackgroundColor, color: textColor }}
            className="rounded-lg p-8 shadow-lg"
          >
            <h2 className="mb-6 text-center text-3xl font-bold">{heading}</h2>
            <form className="space-y-4">
              {renderFormFields()}
              <button
                type="submit"
                style={{ backgroundColor: buttonColor }}
                className="w-full rounded-lg py-3 font-semibold text-white transition hover:opacity-90"
              >
                {submitButtonText}
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  },
};

// Features Grid Section
export const FeaturesSection: ComponentConfig = {
  label: "Features Section",
  fields: {
    heading: {
      type: "text",
      label: "Section Heading",
    },
    features: {
      type: "array",
      label: "Features",
      arrayFields: {
        icon: {
          type: "text",
          label: "Icon Emoji",
        },
        title: {
          type: "text",
          label: "Feature Title",
        },
        description: {
          type: "textarea",
          label: "Description",
        },
      },
      defaultItemProps: {
        icon: "✨",
        title: "Feature Title",
        description: "Feature description goes here.",
      },
    },
    backgroundColor: {
      type: "text",
      label: "Background Color",
    },
    cardBackgroundColor: {
      type: "text",
      label: "Card Background Color",
    },
    textColor: {
      type: "text",
      label: "Text Color",
    },
  },
  defaultProps: {
    heading: "Our Features",
    backgroundColor: "#ffffff",
    cardBackgroundColor: "#f9fafb",
    textColor: "#111827",
    features: [
      {
        icon: "🚀",
        title: "Fast Performance",
        description: "Lightning-fast performance for your needs.",
      },
      {
        icon: "🔒",
        title: "Secure",
        description: "Top-notch security to protect your data.",
      },
      {
        icon: "💡",
        title: "Innovative",
        description: "Cutting-edge solutions for modern problems.",
      },
    ],
  },
  render: ({ heading, features, backgroundColor, cardBackgroundColor, textColor }) => {
    return (
      <section style={{ backgroundColor, color: textColor }} className="w-screen px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-bold">{heading}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features?.map((feature: any, index: number) => (
              <div
                key={index}
                style={{ backgroundColor: cardBackgroundColor }}
                className="rounded-lg p-6 shadow-md transition hover:shadow-lg"
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="opacity-70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  },
};
