import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin',
        phoneNumber: '0500123456',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
        isDriver: false,
    },
    {
        name: 'Driver',
        phoneNumber: '0501123456',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
        isDriver: true,
    },
    {
        name: 'User',
        phoneNumber: '0502123456',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
        isDriver: false,
    },
];

export default users;
