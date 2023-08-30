import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, retry, tap, map, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { storageService } from './async-storage.service';
import { FilterBy, Stay } from '../models/stay.model';
const ENTITY = 'stays'

@Injectable({
  providedIn: 'root'
})
export class StayService {
  constructor(private http: HttpClient) {
    const stays = JSON.parse(localStorage.getItem(ENTITY) || 'null');
    if (!stays || stays.length === 0) {
      this._createStays()
    }
  }

  private _stays$ = new BehaviorSubject<Stay[]>([]);
  public stays$ = this._stays$.asObservable()

  private _filterBy$ = new BehaviorSubject<FilterBy>({ fullname: '' });
  public filterBy$ = this._filterBy$.asObservable()


  public query() {
    return from(storageService.query(ENTITY) as Promise<Stay[]>)
      .pipe(
        tap(stays => {
          // const filterBy = this._filterBy$.value
          // if (filterBy) {
          //     filterBy.fullname = filterBy.fullname ? filterBy.fullname : ''
          //     stays = stays.filter(stay => stay.fullname.toLowerCase().includes(filterBy.fullname!.toLowerCase()))
          // }
          this._stays$.next(stays)
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  public getEmptyStay() {
    return { fullname: '', age: 0, birthDate: new Date() }
  }

  public remove(stayId: string) {
    return from(storageService.remove(ENTITY, stayId))
      .pipe(
        tap(() => {
          const stays = this._stays$.value
          const stayIdx = stays.findIndex(stay => stay._id === stayId)
          stays.splice(stayIdx, 1)
          this._stays$.next([...stays]);
          return stayId
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  public getById(stayId: string): Observable<Stay> {
    return from(storageService.get(ENTITY, stayId) as Promise<Stay>)
      .pipe(
        retry(1),
        catchError(this._handleError)
      )
  }

  public save(stay: Stay) {
    return stay._id ? this._edit(stay) : this._add(stay)
  }

  public setFilterBy(filterBy: FilterBy) {
    this._filterBy$.next(filterBy)
    this.query().subscribe()
  }

  private _add(stay: Stay) {
    return from(storageService.post(ENTITY, stay) as Promise<Stay>)
      .pipe(
        tap(newStay => {
          const stays = this._stays$.value
          stays.push(newStay)
          this._stays$.next([...stays])
          return newStay
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  private _edit(stay: Stay) {
    return from(storageService.put(ENTITY, stay) as Promise<Stay>)
      .pipe(
        tap(updatedStay => {
          const stays = this._stays$.value
          const stayIdx = stays.findIndex(_stay => _stay._id === stay._id)
          stays.splice(stayIdx, 1, updatedStay)
          this._stays$.next([...stays])
          return updatedStay
        }),
        retry(1),
        catchError(this._handleError)
      )
  }

  private async _createStays() {
    const stays = await (await fetch('../assets/data/stay.json')).json()
    localStorage.setItem(ENTITY, JSON.stringify(stays))
  }

  private _handleError(err: HttpErrorResponse) {
    console.log('err:', err)
    return throwError(() => err)
  }

  private _makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
