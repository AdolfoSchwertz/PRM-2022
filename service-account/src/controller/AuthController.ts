import {Request, Response} from 'express';
import { IUser, ICredential } from '@typesCustom';
import {FirebaseError, signInAdmin} from '../services/firebase'

class AuthController{

    public async signInAdmin(request: Request, response: Response) {
        const credential = request.body;

        try {

            const result = await signInAdmin(credential.email, credential.password);

            const user:IUser = {
                uid: result.user.uid,
                name:result.user.displayName || '',
                email: result.user.email || credential.email

            }

            const accessToken = await result.user.getIdToken();

            return response.json({user: user, token: accessToken})


        } catch (e) {
            const error = e as FirebaseError;

            //bad request
            if (error.code === 'auth/missing-email') {
                return response.status(400).json({message: 'É preciso informar um email'});
            
            }

            //user not found
            if (error.code === 'auth/user-not-found') {
                return response.status(401).json({message: 'Usuario não encontrado'});
            }

            //Password wrong
            if (error.code === 'auth/wrong-password') {
                return response.status(401).json({message: 'A senha está incorreta'});
            }

            return response.status(500).json(error.message)
        }

    }

}

export default new AuthController();