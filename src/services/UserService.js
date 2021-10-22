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
     * Get a user using id
     * @param id id of the user
     * @returns a user (email, name, kitchenId, dateOfBirth)
     */
    async getUser(id) {
        try {

            const user = await User.find({
                select: ['email', 'name', 'kitchen', 'dateOfBirth'],
                where: {
                    id: id
                }
            });
            
            if (user.length === 0) {
                throw new Error('User not found!');
            }

            return user[0];
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Signup your user
     * @param data properties: {email, password, kitchen, name, dateOfBirth}
     */
    async signup(data) {

        try {

            console.log(data);
            if (!data.email || !data.password) {
                throw new Error('Email and/or password missing.');
            }
    
            if (!this.validCredentials(data.email, data.password)) {
                throw new Error('Email and/or password format violated.');
            }
    
            if (await this.emailExists(data.email)) {
                throw new Error('User exists in the database');
            }
    
            await this.insertUser(data);

        } catch (err) {
            console.error(err);
            return new Error('Sign up error!');
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
                throw new Error('Invalid email/password');
            }

            const id = await this.comparePasswordAndReturnId(email, password);

            if (!id) {
                throw new Error('Invalid email/password');
            }
            
            return this.createJWT(id);
        } catch (err) {
            console.error(err);
            return new Error('Log in error!');
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
            return new Error('Log out error!');
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
            return new Error('JWT error!');
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

    async comparePasswordAndReturnId(email, password) {

        try {

            const user = await User.findOne({
                select: ['id', 'password'],
                where: {
                    email
                }
            });
            
            const isGood = await bcrypt.compare(password, user.password.toString());
            
            if (isGood) {
                return user.id;
            }
        } catch (err) {
            console.error(err);
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
        }
    }

    validCredentials(email, password) {

        //eslint-disable-next-line
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        //eslint-disable-next-line
        const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

        console.log(regexEmail.test(email));
        console.log(regexPassword.test(password));
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
        }
    }
}

export default new UserService();
