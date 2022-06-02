import fetch from 'node-fetch';
// 10. Permite obtener el estado de cada uno de mis links
// queremos un nuevo array con el status de mis links
export const getStatusLinks = (arrayLinks) => {
   const array = arrayLinks.map((object) => {
const fetchPromise = fetch(object.href)
.then((response) =>{
    const message = response.status >= 200 && response.status <= 299 ? 'ok' : 'fail';
        return{
            href: object.href,
            text:object.text,
            file: object.file,
            status: response.status,
            ok: message,
        };
}).catch(()=> ({
        href: object.href,
        text:object.text,
        file: object.file,
        status: 'Failed request',
        ok: 'fail',
   }));
   return fetchPromise;
});
return Promise.all(array).then(value => {
    console.log(value);
});
};
const arr = [
    {
      href: 'https://www.google.com/',
      text: '1° link',
      file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\files\\archivo0.md'
    },
    {
      href: 'https://www.googl.com/',
      text: '2° link',
      file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\files\\archivo0.md'
    },
    {
      href: 'https://es.wikpedia.org/wiki/Node.js',
      text: 'Node.js - Wikipedia',
      file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\files\\folder1\\archivo1.md'
    },
    {
      href: 'https://nodejs.org/es/about/',
      text: 'Acerca de Node.js - Documentación oficial',
      file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\files\\folder1\\archivo1.md'
    },
    {
      href: 'http://www.edu4java.com/es/web/web30.html',
      text: 'Enlace no seguro',
      file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\files\\folder1\\archivo1.md'
    },
    {
      href: 'https://github.com/workshopper/learnyounode',
      text: 'learnyounode',
      file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\files\\folder1\\archivo2.md'
    },
    {
      href: 'https://github.com/workshopper/how-to-npm',
      text: 'how-to-npm',
      file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\files\\folder1\\archivo2.md'
    },
    {
      href: 'https://github.com/stevekane/promise-it-wont-hurt',
      text: 'promise-it-wont-hurt',
      file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\files\\folder1\\archivo2.md'
    },
    {
      href: 'https://www.youtbe.com/watch?v=Lub5qOmY4JQ',
      text: 'Si nunca has hecho un diagrama de flujo revisa est',
      file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\files\\folder2\\archivo3.md'
    }
  ];
console.log(getStatusLinks(arr));