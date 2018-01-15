import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

import { HeroService } from '../hero.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
	selectedHero: Hero;
	heroes: Hero[];
	onSelect(hero: Hero): void{
		this.selectedHero = hero;
	}
	
  constructor(private heroService: HeroService, private http: HttpClient) { }
	getHeroes(): void{
			this.heroService.getHeroes()	
      .subscribe(heroes => {
      	this.heroes = heroes;
      })
  }
  ngOnInit() {

    this.getHeroes();        
  }

}
