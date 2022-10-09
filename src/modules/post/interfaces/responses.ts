export const LoginResponseSchema = {
    user: {
        $ref: '#components/schemas/'
    },
    token: {
        type: 'string',
    },
}