export default function removeClassHtml(): void {
  const { documentElement, body } = document;
  documentElement.className = '';
  body.className = '';
}
