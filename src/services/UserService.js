import { User } from '../database';
import bcrypt from 'bcrypt';
import config from '../config';
import jwt from 'jsonwebtoken';
import { createClient } from 'redis';

class UserService {

    constructor() {

        this.cache = createClient({});

        this.cache.connect()
        .then(() => {})
        .catch(() => console.log('Connection error!'));

        this.cache.on('connect', () => {
            console.log(`Redis connection established!`);
        });
      
        this.cache.on('error', error => {
            console.error(`Redis error, service degraded: ${error}`);
        });
    }

    /**
     * Signup your user
     * @param data properties: {email, password, kitchen, name, dateOfBirth}
     */
    async signup(data) {

        try {

            if (!data.email || !data.password) {
                return new Error('Email and/or password missing.');
            }
    
            if (!this.validCredentials(data.email, data.password)) {
                return new Error('Email and/or password format violated.');
            }
    
            if (await this.emailExists(data.email)) {
                return new Error('User exists in the database');
            }

            if (!data.dateOfBirth || !this.validDate(data.dateOfBirth)) {
                return new Error('Date format is yyyy-mm-dd');
            }
    
            await this.insertUser(data);

        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw err;
            }
            if (typeof err === 'string') {
                throw new Error(err);
            }
            throw new Error('Sign up error!');
        }
    }

    /**
     * User login.
     * @param email 
     * @param password 
     * @returns Signed JWT for this user.
     */
    async login(email, password) {

        try {

            if (!(await this.emailExists(email))) {
                return new Error('Invalid email/password');
            }

            const userData = await this.comparePasswordAndReturnData(email, password);

            if (!userData) {
                return new Error('Invalid email/password');
            }
            
            
            return {
                token: this.createJWT(userData.id),
                ...userData
            }
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw err;
            }
            if (typeof err === 'string') {
                throw new Error(err);
            }
            throw new Error('Log in error!');
        }
    }

    /**
     * User logout.
     * This creates an entry in our blacklist, i.e., Redis service
     * @param token JWT of the user
     */
    async logout(token) {

        try {
            await this.blacklistJWT(token);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw err;
            }
            if (typeof err === 'string') {
                throw new Error(err);
            }
            throw new Error('Logout error!');
        }
    }

    /**
     * Check if JWT is valid and decode it
     * @param token The JWT
     * @returns Decoded content
     */
    async verifyAndDecodeJWT(token) {

        try {
            const cached = await this.cache.get(token);

            // JWT exists in cache
            if (cached === 'true') {
                throw new Error('Token is blacklisted!');
            }

            const decoded = jwt.verify(token, config.JWT_SECRET);
            return decoded;
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw err;
            }
            if (typeof err === 'string') {
                throw new Error(err);
            }
            throw new Error('JWT error!');
        }
    }

    async blacklistJWT(token) {
        
        await this.cache.set(token, 'true');
    }

    createJWT(id) {
        
        const TOKEN_AGE = 3 * 24 * 60 * 60;
        const token = jwt.sign({ id }, config.JWT_SECRET, { expiresIn: TOKEN_AGE });
        return token;
    }

    async comparePasswordAndReturnData(email, password) {

        try {

            const user = await User.findOne({
                where: {
                    email
                }
            });
            
            const isGood = await bcrypt.compare(password, user.password.toString());
            
            if (isGood) {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    dateOfBirth: user.dateOfBirth
                }
            }
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw err;
            }
            if (typeof err === 'string') {
                throw new Error(err);
            }
            throw new Error('Password check error!');
        }
    }

    async insertUser(data) {
        try {
            const SALT_ROUNDS = 10;
            let user = new User();
            user = Object.assign(user, data);
            user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
            user.save();
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw err;
            }
            if (typeof err === 'string') {
                throw new Error(err);
            }
            throw new Error('User insertion error!');
        }
    }

    validDate(date) {

        const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        return dateRegex.test(date);
    }

    validCredentials(email, password) {

        //eslint-disable-next-line
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        //eslint-disable-next-line
        const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

        return regexEmail.test(email) && regexPassword.test(password);
    }

    async emailExists(email) {

        try {

            const list = await User.find({
                select: ['email'],
                where: {
                    email
                }
            });
            return (list.length > 0);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw err;
            }
            if (typeof err === 'string') {
                throw new Error(err);
            }
            throw new Error('Email check error!');
        }
    }

    async getUserId(email, password) {
        try {

            const id = await User.find({
                select: ['id'],
                where: {
                    email,
                    password
                }
            });

            if (id.length === 0) {
                throw new Error('Invalid email, password combination');
            }

            return id[0];
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                throw err;
            }
            if (typeof err === 'string') {
                throw new Error(err);
            }
            throw new Error('User id check error!');
        }
    }
}

export default new UserService();
