document.addEventListener('DOMContentLoaded', function() {
  // defaultLanguage와 className, styleHeader 등의 스타일을 정의해야 합니다.
  const defaultLanguage = 'ko'; 
  const className = 'some-class'; 
  const styleHeader = { backgroundColor: 'lightblue' };
  const styleFooter = { backgroundColor: 'ghostwhite' };
  const stylePadding = '1rem';

  function createHeader(content) {
    const header = document.createElement('header');
    header.style.backgroundColor = styleHeader.backgroundColor;
    header.style.padding = stylePadding;
    header.appendChild(content);
    return header;
  }

  function createAnchor(href, text) {
    const anchor = document.createElement('a');
    anchor.href = href;
    anchor.textContent = text;
    return anchor;
  }

  function createFooter(content) {
    const footer = document.createElement('footer');
    footer.style.backgroundColor = styleFooter.backgroundColor;
    footer.style.padding = stylePadding;
    footer.textContent = content;
    return footer;
  }

  document.documentElement.lang = defaultLanguage;
  document.body.className = className;

  const h1 = document.createElement('h1');
  h1.appendChild(createAnchor('/', 'textAnchor'));
  document.body.appendChild(createHeader(h1));

  const main = document.createElement('main');
  document.body.appendChild(main);

  document.body.appendChild(createFooter('textFooter'));
});