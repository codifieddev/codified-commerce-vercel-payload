import Editor from "@/EditorAll/Editor";
import { notFound } from "next/navigation";

const EditPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) => {
  try {
    // const payload = await getPayload({ config });
    // const locale = (await getLocale()) as Locale;
    // const { slug } = await params;
    // const { docs } = await payload.find({
    //   collection: "products",
    //   depth: 2,
    //   locale,
    //   where: {
    //     slug: {
    //       equals: slug,
    //     },
    //   },
    // });
    // const { variant } = await searchParams;

    // if (docs.length === 0) {
    //   notFound();
    // }
    // console.log(docs[0]);
    // console.log(variant);

    return (
      <>
        <Editor />
        {/* <ProductDetail /> */}
      </>
    );
  } catch {
    notFound();
  }
};

export default EditPage;
