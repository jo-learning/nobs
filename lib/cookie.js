import cookie from 'cookie';

export const setCookie = (res, name, value, options = {}) => {
    const serializedCookie = cookie.serialize(name, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
        ...options,
    });
    res.setHeader('Set-Cookie', serializedCookie);
};

export const parseCookies = (req) => {
    return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
};
