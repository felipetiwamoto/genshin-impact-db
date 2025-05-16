import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import characters from './db/GENSHIN_IMPACT_CHARACTER_LIST.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public http = inject(HttpClient);
  public characters = characters;
  public elements: string[] = [];
  public stars: number[] = [];
  public weapons: string[] = [];
  public nations: string[] = [];
  public genders: string[] = [];
  public models: string[] = [];

  constructor() { }

  setElements(element: string) {
    const alreadyExists = this.elements.find((e) => e === element);
    (alreadyExists)
      ? this.elements = this.elements.filter((e) => e !== element)
      : this.elements.push(element);
  }

  setStars(star: number) {
    const alreadyExists = this.stars.find((e) => e === star);
    (alreadyExists)
      ? this.stars = this.stars.filter((e) => e !== star)
      : this.stars.push(star);
  }

  setWeapons(weapon: string) {
    const alreadyExists = this.weapons.find((e) => e === weapon);
    (alreadyExists)
      ? this.weapons = this.weapons.filter((e) => e !== weapon)
      : this.weapons.push(weapon);
  }

  setNations(nation: string) {
    const alreadyExists = this.nations.find((e) => e === nation);
    (alreadyExists)
      ? this.nations = this.nations.filter((e) => e !== nation)
      : this.nations.push(nation);
  }

  setGenders(gender: string) {
    const alreadyExists = this.genders.find((e) => e === gender);
    (alreadyExists)
      ? this.genders = this.genders.filter((e) => e !== gender)
      : this.genders.push(gender);
  }

  setModels(model: string) {
    const alreadyExists = this.models.find((e) => e === model);
    (alreadyExists)
      ? this.models = this.models.filter((e) => e !== model)
      : this.models.push(model);
  }

  hasElement(element: string) {
    return this.elements.find((e) => e === element);
  }

  hasStar(star: number) {
    return this.stars.find((e) => e === star);
  }

  hasWeapon(weapon: string) {
    return this.weapons.find((e) => e === weapon);
  }

  hasNation(nation: string) {
    return this.nations.find((e) => e === nation);
  }

  hasGender(gender: string) {
    return this.genders.find((e) => e === gender);
  }

  hasModel(model: string) {
    return this.models.find((e) => e === model);
  }

  get filteredCharacters() {
    const filteredElements = this.elements.length > 0 ? this.characters.filter((item) => this.hasElement(item.element)) : this.characters
    const filteredStars = this.stars.length > 0 ? filteredElements.filter((item) => this.hasStar(item.star)) : filteredElements;
    const filteredWeapons = this.weapons.length > 0 ? filteredStars.filter((item) => this.hasWeapon(item.weapon)) : filteredStars;
    const filteredNations = this.nations.length > 0 ? filteredWeapons.filter((item) => this.hasNation(item.nation)) : filteredWeapons;
    const filteredGenders = this.genders.length > 0 ? filteredNations.filter((item) => this.hasGender(item.gender)) : filteredNations;
    const filteredModels = this.models.length > 0 ? filteredGenders.filter((item) => this.hasModel(item.model)) : filteredGenders;

    const characters = [
      ...filteredModels,
    ]
    return characters.sort((a, b) => {
      if (a.star === b.star) return a.name.localeCompare(b.name);
      return b.star - a.star;
    })
  }
}
