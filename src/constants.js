export const DISPLAY = {
  wholeBook: "wholeBook",
  currentChapter: "currentChapter",
};

export const FILTER = {
  none: "none",
  viewHeaders: "viewHeaders",
  viewTriggerLines: "viewTriggerLines",
};

export const SPLIT_PATTERN = {
  sentences: "sentences",
  lines: "lines",
  paragraphs: "paragraphs",
};

export const HTML_TEXT_DECORATION_TAGS = ["strong", "em", "i", "b"];

export const TRIGGER_TYPE = {
  bgColor: "Background Color",
  bgImage: "Background Image",
  sound: "Sound",
  animation: "Animation",
  fontColor: "Font Color",
};

export const TO_COLOR_CSS_STRING = (color) => {
  return `rgb(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
};
