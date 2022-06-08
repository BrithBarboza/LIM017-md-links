/* eslint-disable yoda */
import fetch from 'node-fetch';

export const getStatusLinks = arrayLinks => {
  const arrayWithStatus = arrayLinks.map(object =>
    fetch(object.href)
      .then((response) => {
        if (response.status >= 200 && response.status < 400) {
          object.status = response.status
          object.message = 'Ok'
          return object;
        } else if (400 <= response.status) {
          object.status = response.status
          object.message = 'Fail'
          return object;
        }
      })
      .catch(() => {
        object.status = 500
        object.message = 'Fail'
        return object;
      })
  )
  return Promise.all(arrayWithStatus)
}