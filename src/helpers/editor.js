const edjsParser = require('editorjs-parser');

const customParsers = {
  image: function(data) {
    return `
        <img src='${data.file.url}' alt='${data.caption}' style='margin-bottom: 10px;'/>
        ${data.caption
      ? `
        <p style='
          font-family: "roboto-regular-italic";
          font-size: 13px;
          line-height: 15px;
          margin: 0 0 15px 5px;
          '
        >
          ${data.caption}
        </p>` : ''}
    `;
  },
  paragraph: (data) => {
    if (data.text.includes('class="text-sm font-normal"')) {
      data.text = data.text.replace(/class="text-sm font-normal"/g, `style="font-family: 'roboto-regular';font-size: 14px;color: #999;"`);
    }
    if (data.text.includes('class="text-2xl font-light"')) {
      data.text = data.text.replace(/class="text-2xl font-light"/g, `style="font-family: 'roboto-light';font-size: 24px;color: #222;"`);
    }
    if (data.text.includes('<i>')) {
      data.text = data.text.replace(/<i>/g, `<i style="font-family: 'roboto-regular-italic'">`);
    }
    if (data.text.includes('<b>')) {
      data.text = data.text.replace(/<b>/g, `<span style="font-family: 'roboto-bold';">`);
      data.text = data.text.replace(/<\/b>/g, `</span>`);
    }
    if (data.text.includes('<code class="inline-code">')) {
      data.text = data.text.replace(/<code class="inline-code">/g,
        `<code style="
          background: rgba(250, 239, 240, 0.78);
          color: #b44437;
          padding: 3px 4px;
          border-radius: 5px;
          margin: 0 1px;
          font-family: 'roboto-medium';
          font-size: 16px;
        ">`);
    }
    return `<p style='
        font-family: "roboto-regular";
        margin: 0 0 10px;
        font-size: 16px;
    '>${data.text}</p>`;
  },
  linkTool: ({ link, meta }) => {
    return `
    <a 
    target='_blank' 
    rel='nofollow noindex noreferrer' 
    href='${link}'
    style='
      border-width: 1px; 
      border-style: solid; 
      border-color: #f3f3f3; 
      color: #000; 
      text-decoration: none; 
      padding: 15px; 
      border-radius: 7px; 
      margin-bottom: 15px;
    ' 
    >
      <h3 style="font-family: 'roboto-bold'; margin-top: 0">${meta.title}</h3>
      ${meta.description ? `<span style="font-family: 'roboto-regular'">${meta.description}</span>` : ''}
    </a>
    `;
  },
  instagram: ({ link }) => {
    return `<iframe src='${link}' width='100%' height='580' style='margin-bottom: 10px'></iframe>`;
  },
  telegram: ({ link }) => {
    return `<iframe src='${link}' width='100%' height='720' style='margin-bottom: 10px'></iframe>`;
  },
  quote: (data) => {
    if (data.text.includes('class="text-sm font-normal"')) {
      data.text = data.text.replace(/class="text-sm font-normal"/g, `style="font-family: 'roboto-regular';font-size: 14px;color: #999;"`);
    }
    if (data.text.includes('class="text-2xl font-light"')) {
      data.text = data.text.replace(/class="text-2xl font-light"/g, `style="font-family: 'roboto-light';font-size: 24px;color: #222;"`);
    }
    if (data.text.includes('<i>')) {
      data.text = data.text.replace(/<i>/g, `<i style="font-family: 'roboto-regular-italic'">`);
    }
    if (data.text.includes('<b>')) {
      data.text = data.text.replace(/<b>/g, `<span style="font-family: 'roboto-bold';">`);
      data.text = data.text.replace(/<\/b>/g, `</span>`);
    }
    return `<div
      style="
        border-radius: 3px;
        background-color: #ECF6FF; 
        box-shadow: none; 
        padding: 20px 25px;
        font-size: 16px;
        font-family: 'roboto-medium';
        border-left-width: 3px; 
        border-left-style: solid; 
        border-left-color: #0A85FF; 
        margin-bottom: 0;
        "
    >
      <p style="font-family: 'roboto-regular';">${data.text}</p>
    </div>`;
  },
  delimiter: () => {
    return `<p style='text-align: center; font-size: 30px'>***</p>`;
  },
  warning: (data) => {
    return `
      <div
        style='
          background-color: rgba(255,251,235,1);
          border-radius: 7px;
          padding: 10px 0;
          position: relative;
        '
      >
       <p 
        style='
          color: rgba(146,64,14, 1);
          font-family: "roboto-medium";
          font-size: 16px;
          padding: 10px 12px 0;
          margin: 0;
       '>
           ${data.title}
        </p>
       <p 
        style='
          color: rgba(180,83,9, 1);
          font-family: "roboto-medium";
          font-size: .875rem;
          padding: 10px 12px;
          margin: 10px 0 0;
       '>
          ${data.message}
        </p>
      </div>
    `;
  },
};

const parser = new edjsParser(undefined, customParsers);

export const parseEditor = (data) => {
  return parser.parseBlock(data);
};

