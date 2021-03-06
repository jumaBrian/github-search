import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user/user';
import { Repository } from 'src/app/models/repository/repository';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  user!: User;
  repository!: Repository;
  repositoryItems: any;

  constructor(private http: HttpClient) { 
    this.user = new User('',0,0,'',new Date,'');
    this.repository = new Repository('','','','')

    console.log('git API in use')
  }

  getUser(searchName: any){
    interface ApiResponse{
      login: string;
      followers: number;
      following: number;
      avatar_url: string;
      created_at: Date;
      html_url: string;
    }

    return new Promise((resolve:any, reject)=> {
      this.http.get<ApiResponse>('https://api.github.com/users/' + searchName).toPromise().then(
        (result: any)=> {
          this.user.login = result.login;
          this.user.followers = result.followers;
          this.user.following = result.following;
          this.user.avatar_url = result.avatar_url;
          this.user.created_at =result.created_at;
          this.user.html_url = result.html_url;
          console.log(result);
          resolve();
        },
        (error)=> {
          console.log(error);
          reject();
        }
      );
    });
  }


  getRepositories(searchName:any){
    interface ApiResponse{
      repositories: [];
    }

    return new Promise((resolve:any,reject)=>{
      this.http.get<ApiResponse>('https://api.github.com/users/'+searchName+'/repositories').toPromise().then(
        (results) => {
          this.repositoryItems = results;
          console.log(results)
          resolve();
        },
        (error) => {
          console.log(error);
          reject();
        }
        );    
    });
  }
}
