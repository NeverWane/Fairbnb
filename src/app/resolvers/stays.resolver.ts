import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { StayService } from '../services/stay.service';
import { Stay } from '../models/stay.model';

export const staysResolver: ResolveFn<Stay[]> = (route, state) => {
    return inject(StayService).query().pipe()
};