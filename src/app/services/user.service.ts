import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { catchError, retry, tap, map, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { storageService } from './async-storage.service';
import { FilterBy, User } from '../models/user.model';
const ENTITY = 'users'

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {
        const users = JSON.parse(localStorage.getItem(ENTITY) || 'null');
        if (!users || users.length === 0) {
            localStorage.setItem(ENTITY, JSON.stringify(this._createUsers()))
        }
    }

    private _users$ = new BehaviorSubject<User[]>([]);
    public users$ = this._users$.asObservable()

    private _filterBy$ = new BehaviorSubject<FilterBy>({ fullname: '' });
    public filterBy$ = this._filterBy$.asObservable()


    public query() {
        return from(storageService.query(ENTITY) as Promise<User[]>)
            .pipe(
                tap(users => {
                    const filterBy = this._filterBy$.value
                    if (filterBy) {
                        filterBy.fullname = filterBy.fullname ? filterBy.fullname : ''
                        users = users.filter(user => user.fullname.toLowerCase().includes(filterBy.fullname!.toLowerCase()))
                    }
                    this._users$.next(users)
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    public getEmptyUser() {
        return { fullname: '', stays: [], orders: [] }
    }

    public getLoggedInUser() {
        const user = localStorage.getItem('loggedUser')
        return user ? JSON.parse(user) : null
    }

    public login(user: User) {
        localStorage.setItem('loggedUser', JSON.stringify(user))
    }

    public logout() {
        localStorage.removeItem('loggedUser')
    }

    public remove(userId: string) {
        return from(storageService.remove(ENTITY, userId))
            .pipe(
                tap(() => {
                    const users = this._users$.value
                    const userIdx = users.findIndex(user => user._id === userId)
                    users.splice(userIdx, 1)
                    this._users$.next([...users]);
                    return userId
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    public getById(userId: string): Observable<User> {
        return from(storageService.get(ENTITY, userId) as Promise<User>)
            .pipe(
                retry(1),
                catchError(this._handleError)
            )
    }

    public save(user: User) {
        return user._id ? this._edit(user) : this._add(user)
    }

    public setFilterBy(filterBy: FilterBy) {
        this._filterBy$.next(filterBy)
        this.query().subscribe()
    }

    private _add(user: User) {
        return from(storageService.post(ENTITY, user) as Promise<User>)
            .pipe(
                tap(newUser => {
                    const users = this._users$.value
                    users.push(newUser)
                    this._users$.next([...users])
                    return newUser
                }),
                retry(1),
                catchError(this._handleError)
            )
    }

    private _edit(user: User) {
        return from(storageService.put(ENTITY, user) as Promise<User>)
            .pipe(
                tap(updatedUser => {
                    const users = this._users$.value
                    const userIdx = users.findIndex(_user => _user._id === user._id)
                    users.splice(userIdx, 1, updatedUser)
                    this._users$.next([...users])
                    return updatedUser
                }),
                retry(1),
                catchError(this._handleError)
            )
    }


    private _createUsers() {
        const users: User[] = [
            {
                _id: 'default',
                email: 'default',
                password: '123',
                fullname: 'default',
                imgUrl: '',
                orders: [],
                stays: []
            }
        ];
        return users
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
