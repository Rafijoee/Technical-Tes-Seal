module.exports = {
    headers: (headers) => {
        if (!headers.authorization) {
            throw new HttpRequestError('Authorization header tidak ditemukan.', 400);
        }
        if (!headers.authorization.startsWith('Bearer ')) {
            throw new HttpRequestError('Format Authorization header tidak valid. Gunakan format Bearer <token>.', 400);
        }
    },
}