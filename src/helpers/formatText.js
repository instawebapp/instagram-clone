export function formatText(str) {
  let text = `${str}`.replace(/ +/g, " ").trim();
  let len = text.length;
  let hashtaglist = [];
  for (let i = 0; i < len; i++) {
    if (text[i] === "#") {
      // for skip the '#' sign
      i++;

      let hashtag = "";
      while (hashtag.length < 30 && i < len) {
        if (text[i] === " " || text[i] === "\n") {
          break;
        }
        hashtag = hashtag + text[i];
        i++;
      }
      hashtaglist.push(hashtag);
    }
  }
  let txt = "";
  for (let i = 0; i < len; i++) {
    if (text[i] === "#") {
      break;
    }
    txt = txt + text[i];
  }
  text = txt;
  // console.log(txt);
  // let list = hastaglist.map((item) => hasFunction(item));
  return { text, hashtaglist };
  // return { text, hashtaglist };
}
