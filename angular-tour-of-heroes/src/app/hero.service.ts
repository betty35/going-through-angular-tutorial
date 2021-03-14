import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    let re = HEROES.find(hero => hero.id === id);
    if(!re) {
      this.search_fallback.id = id;
      re = this.search_fallback;
    }
    return of(re);
  }

  search_fallback:Hero = {
    id:-99,
    name:"ID not found"
  };

  constructor(private messageService: MessageService) { }
}
