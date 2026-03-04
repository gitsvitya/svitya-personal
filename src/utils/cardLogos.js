import moexLogo from "../images/moex_logo.png";
import lukoilLogo from "../images/lukoil_logo.png";
import kalashnikovlLogo from "../images/kalashnikov_logo.png";
import reutersLogo from "../images/reuters_logo.png";
import mappngoLogo from "../images/mappngoLogo_black.png";
import veniviLogo from "../images/veniviLogo.png";
import strokeOffLabel from "../images/stroke_off_label.png";
import svityaComLabel from "../images/svitya_com_label.png";
import mbcLogo from "../images/mbc_logo.png";
import ciLogo from "../images/ci_logo.png";

// Приводит импорт изображения к строковому URL для использования в обычном <img>.
function resolveImageSrc(image) {
  if (typeof image === "string") return image;
  return image?.src || "";
}

// Словарь соответствия ключей компаний и логотипов.
export const logos = {
  CI: resolveImageSrc(ciLogo),
  NTB: resolveImageSrc(moexLogo),
  LRNPT: resolveImageSrc(lukoilLogo),
  KG: resolveImageSrc(kalashnikovlLogo),
  TR: resolveImageSrc(reutersLogo),
  MBC: resolveImageSrc(mbcLogo),
  MNG: resolveImageSrc(mappngoLogo),
  VNV: resolveImageSrc(veniviLogo),
  SKO: resolveImageSrc(strokeOffLabel),
  SDC: resolveImageSrc(svityaComLabel),
};
