declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}

declare module "*.png" {
  const src: import("next/image").StaticImageData;
  export default src;
}

declare module "*.jpg" {
  const src: import("next/image").StaticImageData;
  export default src;
}

declare module "*.jpeg" {
  const src: import("next/image").StaticImageData;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}
