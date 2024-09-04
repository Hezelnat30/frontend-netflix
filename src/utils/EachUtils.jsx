import { Children } from "react";

export default function EachUtils({ of, render }) {
  if (!Array.isArray(of)) {
    console.log({ error: "of must be an array" });
    return null;
  }
  return <>{Children.toArray(of.map((item, i) => render(item, i)))}</>;
}
