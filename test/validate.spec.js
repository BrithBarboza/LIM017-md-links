import { getStatusLinks } from '../src/validate.js'
import fetch from 'node-fetch';
jest.mock('node-fetch');

describe('getStatusLinks', () => {
    it('If status: 200 then message: Ok', () => {
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
        return getStatusLinks(arrayInitial)
        .then(response => {
            expect(response).toEqual(arrayValidate);
        });
    });

    it('If status >= 400 then message: Fail', () => {
        const arrayInitial = [
            {
            href: 'https://www.youtube.com/watch?v=Lub5qOmY4JQ',
            text: 'recurso',
            file: 'D:\\BOOTCAMP-GITHUB\\Repos\\LIM017-md-links\\README.md'
            }
        ];
        const arrayValidate = [
            {
                href: 'https://www.youtube.com/watch?v=Lub5qOmY4JQ',
                text: 'recurso',
                file: 'D:\\BOOTCAMP-GITHUB\\Repos\\LIM017-md-links\\README.md',
                status: 404,
                message: 'FAIL'
              }
        ]
        fetch.mockImplementation(() => {
            return getStatusLinks(arrayInitial)
            .then(response => {
                expect(response).toEqual(arrayValidate);
            });
        });
    });

    it('Promise reject', () => {
        const arrayInitial = [
            {
            href: 'https://www.youtube.com/watch?v=Lub5qOmY4JQ',
            text: 'recurso',
            file: 'D:\\BOOTCAMP-GITHUB\\Repos\\LIM017-md-links\\README.md'
            }
        ];
        const arrayValidate = [
            {
                href: 'https://www.youtube.com/watch?v=Lub5qOmY4JQ',
                text: 'recurso',
                file: 'D:\\BOOTCAMP-GITHUB\\Repos\\LIM017-md-links\\README.md',
                status: 500,
                message: 'FAIL'
              }
        ]
        fetch.mockRejectedValue()
        return getStatusLinks(arrayInitial)
        .catch((err) => {
            expect(err).toEqual(arrayValidate);
        });
    });
});