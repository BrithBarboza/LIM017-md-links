const fetch = jest.fn(() => {
    // console.log('hola mundo');
    return Promise.resolve ({message:"ok", status:200})
});
// const mock = jest.fn(() => Promise.resolve ({message:"fail", status:404}))

export default fetch