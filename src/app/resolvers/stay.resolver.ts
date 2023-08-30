import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { StayService } from '../services/stay.service';
import { Stay } from '../models/stay.model';

export const stayResolver: ResolveFn<Stay> = (route, state) => {
    const id = route.params['stayId']
    return inject(StayService).getById(id).pipe()
};
