import downloadFiles from "../content/downloads.json";

type DownloadFile = {
  filename: string;
  sizeBytes: number;
  originalSrc?: string;
  optimization?: { jpegQuality?: number };
  sha256?: string;
};

type FileSizeLabels = {
  locale: string;
  kilobytes: string;
  megabytes: string;
};

export function getDownloadFile(publicPath: string): DownloadFile {
  const file = downloadFiles[publicPath as keyof typeof downloadFiles];
  if (!file) throw new Error(`Missing download file for "${publicPath}"`);
  return file;
}

export function getDownloadFilename(publicPath: string): string {
  return getDownloadFile(publicPath).filename;
}

export function formatDownloadSize(sizeBytes: number, labels: FileSizeLabels): string {
  const megabytes = sizeBytes >= 1_000_000;
  const value = sizeBytes / (megabytes ? 1_000_000 : 1_000);
  const size = new Intl.NumberFormat(labels.locale, {
    maximumFractionDigits: megabytes ? 1 : 0,
  }).format(value);
  return `${size} ${megabytes ? labels.megabytes : labels.kilobytes}`;
}
