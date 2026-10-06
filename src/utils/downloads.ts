import downloadNames from "../content/downloads.json";

export function getDownloadFilename(publicPath: string): string {
  const filename = downloadNames[publicPath as keyof typeof downloadNames];
  if (!filename) throw new Error(`Missing download filename for "${publicPath}"`);
  return filename;
}
