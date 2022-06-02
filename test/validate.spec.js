import { getStatusLinks } from '../src/validate.js'
// import fetch from 'node-fetch';
jest.mock('node-fetch');
describe('getStatusLinks', () => {
    it('If status: 200 then message:Ok', () => {
        const arrayInitial = [{
            href: 'https://www.google.com/',
            text: '1° link',
            file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\files\\archivo0.md',
        }];
        const arrayValidate = [
            {
                href: 'https://www.google.com/',
                text: '1° link',
                file: 'C:\\Users\\almen\\OneDrive\\Escritorio\\Proyectos Laboratoria\\LIM017-md-links\\files\\archivo0.md',
                status: 200,
                message: 'Ok'
            }
        ];
        return getStatusLinks(arrayInitial).then(response => {
            expect(response).toEqual(arrayValidate);
        });
    })
})