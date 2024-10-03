import { Injectable } from '@angular/core';
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk/global';

const poolData = {
  UserPoolId: 'eu-north-1_x0M7aqwUT', // e.g. us-east-1_xxxxxxxxx
  ClientId: '3tp7d2kqg31garnkq49igqapio' // e.g. xxxxxxxxxxxxxxxxxxxxxxxxxx
};

const userPool = new CognitoUserPool(poolData);

@Injectable({
  providedIn: 'root',
})
export class CognitoService {

  register(email: string, password: string, favoriteSport: string): Promise<any> {
    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
      new CognitoUserAttribute({ Name: 'custom:favoritesport', Value: favoriteSport })
    ];
    return new Promise((resolve, reject) => {
      userPool.signUp(email, password, attributeList, [], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  login(email: string, password: string): Promise<any> {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          // Set the AWS credentials with the user's token
          const idToken = result.getIdToken().getJwtToken();
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'your-identity-pool-id',
            Logins: {
              [`cognito-idp.eu-north-1.amazonaws.com/${poolData.UserPoolId}`]: idToken,
            },
          });
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  getUserAttributes(): Promise<any> {
    const cognitoUser = userPool.getCurrentUser();

    return new Promise((resolve, reject) => {
      if (!cognitoUser) {
        return reject('User not found');
      }

      cognitoUser.getSession((err:any, session:any) => {
        if (err) {
          return reject(err);
        }
        cognitoUser.getUserAttributes((err, attributes) => {
          if (err) {
            reject(err);
          } else {
            console.log(attributes)
            resolve(attributes);
          }
        });
      });
    });
  }

  logout() {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
  }
}
