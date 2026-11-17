import downloadFiles from "../content/downloads.json";

type DownloadFile = {
  filename: string;
  sizeBytes: number;
  originalSrc?: string;
  optimization?: { jpegQuality?: number };
  sha256?: string;
};

export function getDownloadFile(publicPath: string): DownloadFile {
  const file = downloadFiles[publicPath as keyof typeof downloadFiles];
  if (!file) throw new Error(`Missing download file for "${publicPath}"`);
  return file;
}

export function getDownloadFilename(publicPath: string): string {
  return getDownloadFile(publicPath).filename;
}
