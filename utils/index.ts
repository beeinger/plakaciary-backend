function parseCharToImagePath(char: string): string {
  const special = {
    "|": "vertical_bar",
    ".": "full_stop",
    ",": "coma",
    "/": "slash",
    "'": "apostrophe",
    "#": "hashtag",
    "%": "percent",
    '"': "close_quote",
    "\\": "backslash",
    "<": "less_than",
    ">": "more_than",
    "!": "exclamation_mark",
    "?": "question_mark",
    "`": "apostrophe",
    ":": "colon",
    "*": "question_mark",
    _: "question_mark",
    ";": "question_mark",
  };

  return special[char] || char.toUpperCase();
}

export { parseCharToImagePath };
