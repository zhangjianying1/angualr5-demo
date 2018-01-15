import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'

//const headers = new HttpHeaders().set("X-CustomHeader", "custom header value");

@Injectable()
export class HeroService {
	private heroesUrl = 'http://localhost:3000';
  constructor(private http: HttpClient, private messageService: MessageService) { }
	getHeroes(): Observable<Hero[]>{
		return this.http.get<Hero[]>("http://localhost:3000/users", {withCredentials: true})
		.pipe(
			map(heroes => {
				console.log(heroes)
				heroes[0].name="zhang jian ying";
				return heroes;
			}),
      catchError(this.handleError('getHeroes', []))
    );
    
	}
	getHeroesById(id: number): Observable<Hero[]> {
		const url = `${this.heroesUrl}/index/?id=${id}`;
		return this.http.get<Hero[]>(url);

	}

	private handleError<T> (operation = 'operation', result?: T) {
		
	  return (error: any): Observable<T> => {
	  	console.log(error)
	    this.log(`${operation} failed: ${error.message}`);
	    return of(result as T);
	  };
	}
	private log(message: string) {
	  this.messageService.add('HeroService: ' + message);
	}
}


