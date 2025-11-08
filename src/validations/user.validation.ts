export const userDataValidation = {
    password:
        [
            { required: true, message: 'Please input your password!' },
            { min: 4, message: "Password must be at least 4 characters" },
            { pattern: /^(?=.*\d).+$/, message: 'Password must include at least one digit!' },
        ],
    phone_number:
        [
            { required: true, message: 'Please input your password!' },
            { pattern: /^\+998\d{9}$/, message: 'Please enter valid phone number: +998 XX XXX XX XX' },
        ]

}
