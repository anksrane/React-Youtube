/* eslint-disable no-useless-catch */
/* eslint-disable no-unreachable */
import conf from '../conf/conf';
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client=new Client();
    account;


    // used constructor because we need to initialize the client with the appwrite url and the project id
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account=new Account(this.client);
    }

    async createAccount({email,password,name}){
        try{
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                return userAccount;
                // call another method like login
                return this.login({email,password});
            }else{
                return userAccount;
            }
        }catch(error){
            throw error;
        }
    }

    async login({email,password}){
        // eslint-disable-next-line no-useless-catch
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    // async getCurrentUser(){
    //     try {
    //         return await this.account.get();
    //     } catch (error) {
    //         console.log("getCurrentUser Error: ", error);
    //     }
    //     return null;
    // }

    // async getCurrentUser() {
    //     try {
    //         return await this.account.get();
    //     } catch (error) {
    //         console.log("getCurrentUser Error: ", error);
    //         return null; // <- ADD THIS inside the catch
    //     }
    // }    

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            if (error.code !== 401) {
                console.log("getCurrentUser Error: ", error);
            }
            return null;
        }
    }    

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("logout Error: ", error);
        }
    }
}

const authService=new AuthService();

export default authService;