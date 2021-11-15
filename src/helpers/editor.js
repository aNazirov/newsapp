const edjsParser = require('editorjs-parser');

const customParsers = {
  image: function(data) {
    return `
      <img src='${data.file.url}' alt='${data.caption}' style='margin-bottom: 15px'/>
      ${data.caption
      ? `
      <p style='
        font-family: "roboto-regular";
        font-style: italic;
        font-weight: 400;
        font-size: 13px;
        line-height: 15px;
        margin: 10px 0 15px;
        '
      >${data.caption}</p>` : ''}
    `;
  },
  paragraph: (data) => {
    return `<p style='
        font-family: "roboto-regular";
        margin: 15px 0;
        font-size: 16px;
    '>${data.text}</p>`;
  },
  linkTool: ({ link, meta }) => {
    return `
    <a 
    target='_blank' 
    rel='nofollow noindex noreferrer' 
    href='${link}'
    style='border: 1px solid #f3f3f3; color: #000; text-decoration: none; padding: 25px; border-radius: 7px; margin-bottom: 15px' 
    >
      <h3 >${meta.title}</h3>
      ${meta.description ? `<span >${meta.description}</span>` : ''}
    </a>
    `;
  },
  instagram: ({ link }) => {
    return `<iframe src='${link}' width='100%' height='720' style='margin-bottom: 15px'></iframe>`;
  },
  telegram: ({ link }) => {
    return `<iframe src='${link}' width='100%' height='720' style='margin-bottom: 15px'></iframe>`;
  },
};

const parser = new edjsParser(undefined, customParsers);

export const parseEditor = (data) => {
  return parser.parseBlock(data);
};

