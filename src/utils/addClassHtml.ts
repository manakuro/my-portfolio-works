export default function addClassHtml(className: string): void {
  const { documentElement, body } = document;
  documentElement.className = className;
  body.className = className;
}
