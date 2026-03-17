import type { StaticImageData } from "next/image";
import type { CompanyId } from "../types/domain";
import ciLogo from "../images/ci_logo.png";
import kalashnikovLogo from "../images/kalashnikov_logo.png";
import lukoilLogo from "../images/lukoil_logo.png";
import mappngoLogo from "../images/mappngoLogo_black.png";
import mbcLogo from "../images/mbc_logo.png";
import moexLogo from "../images/moex_logo.png";
import reutersLogo from "../images/reuters_logo.png";
import strokeOffLabel from "../images/stroke_off_label.png";
import svityaComLabel from "../images/svitya_com_label.png";
import veniviLogo from "../images/veniviLogo.png";

function resolveImageSrc(image: string | StaticImageData): string {
  return typeof image === "string" ? image : image.src;
}

// Словарь соответствия ключей компаний и логотипов.
export const logos: Record<CompanyId, string> = {
  CI: resolveImageSrc(ciLogo),
  NTB: resolveImageSrc(moexLogo),
  LRNPT: resolveImageSrc(lukoilLogo),
  KG: resolveImageSrc(kalashnikovLogo),
  TR: resolveImageSrc(reutersLogo),
  MBC: resolveImageSrc(mbcLogo),
  MNG: resolveImageSrc(mappngoLogo),
  VNV: resolveImageSrc(veniviLogo),
  SKO: resolveImageSrc(strokeOffLabel),
  SDC: resolveImageSrc(svityaComLabel),
};
