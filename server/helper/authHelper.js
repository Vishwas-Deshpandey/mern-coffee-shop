import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    } catch (error) {
        console.log(error)
    }
}

export const comparePassword = async (userPassword, hashedPassword) => {
    return await bcrypt.compare(userPassword, hashedPassword)
}


export const generateJwtToken = (userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '4d' });

        return token;
    } catch (error) {
        console.log(error);
    }
}

export const verifyJwtToken = (token) => {
    const isVerifiedUser = jwt.verify(token, process.env.JWT_SECRET);

    return isVerifiedUser.userId;
}