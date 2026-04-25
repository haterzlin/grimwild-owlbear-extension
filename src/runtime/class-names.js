export default function classNames(...values) {
  let output = "";

  const append = value => {
    if (!value) return;
    output = output ? `${output} ${value}` : `${value}`;
  };

  const normalize = value => {
    if (typeof value === "string" || typeof value === "number") return `${value}`;
    if (!value || typeof value !== "object") return "";
    if (Array.isArray(value)) {
      value.forEach(item => append(normalize(item)));
      return "";
    }

    if (value.toString !== Object.prototype.toString && !value.toString.toString().includes("[native code]")) {
      return value.toString();
    }

    Object.keys(value).forEach(key => {
      if (value[key]) append(key);
    });

    return "";
  };

  values.forEach(value => {
    append(normalize(value));
  });

  return output;
}
