let cache = {};
// no prefix
// let prefix = "x";
const rules = [];
let insert = rule => rules.push(rule);
// no kebab or shawarma :'(
// const hyph = s => s.replace(/[A-Z]|^ms/g, "-$&").toLowerCase();
// Use string concatenation
const mx = (rule, media) => (media ? media + "{" + rule + "}" : rule);
const rx = (cn, prop, val) => "." + cn + "{" + prop + ":" + val + "}";
const noAnd = s => s.replace(/&/g, "");

// Use classic for-loop
const parse = (obj, child = "", media) => {
  let key,
    cns = [];
  for (key in obj) {
    const val = obj[key];
    if (val === null) continue;
    if (typeof val === "object") {
      const m2 = /^@/.test(key) ? key : null;
      const c2 = m2 ? child : child + key;
      cns.push(parse(val, c2, m2 || media));
      continue;
    }
    const _key = key + val + child + media;
    if (cache[_key]) return cache[_key];
    const className = "x" + rules.length.toString(36);
    insert(mx(rx(className + noAnd(child), key, val), media));
    cache[_key] = className;
    cns.push(className);
  }

  return cns.join(" ");
};

// function cxs(...styles) {
//   return styles
//     .map(style => parse(style))
//     .join(" ")
//     .trim();
// }

// no sorting
// on a second thought, i don't need it, fow now.
// cxs.css = () => rules.join("");

// no reset
// cxs.reset = () => {
//   cache = {};
//   while (rules.length) rules.pop();
// };

// no config
// cxs.prefix = val => (prefix = val);

if (typeof document !== "undefined") {
  const sheet = document.head.appendChild(document.createElement("style"))
    .sheet;
  insert = rule => {
    rules.push(rule);
    sheet.insertRule(rule, sheet.cssRules.length);
  };
}

export default parse;
