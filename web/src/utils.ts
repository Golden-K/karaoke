export const parseTitle = (title: string) => {
  var parser = new DOMParser();
  var dom = parser.parseFromString(
    "<!doctype html><body>" + title,
    "text/html"
  );
  console.log(dom.body.textContent);
  return dom.body.textContent;
};
