import App from "../../src/components/App/App";

export default function CatchAllPage({ params }) {
  const slug = params?.slug || [];
  const initialPath = `/${slug.join("/")}`;

  return <App initialPath={initialPath === "/" ? "/about" : initialPath} />;
}
