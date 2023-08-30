import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StayDetailsComponent } from './pages/stay-details/stay-details.component';
import { stayResolver } from './resolvers/stay.resolver';
import { StayIndexComponent } from './pages/stay-index/stay-index.component';
import { staysResolver } from './resolvers/stays.resolver';
import { StayBookComponent } from './pages/stay-book/stay-book.component';

const routes: Routes = [
    {
        path: 'stay/:stayId',
        component: StayDetailsComponent,
        resolve: { stay: stayResolver },
        data: { name: 'details' }
    },
    {
        path: 'book/stays/:stayId',
        component: StayBookComponent,
        resolve: { stay: stayResolver },
        data: { name: 'book' }
    },
    {
        path: '',
        component: StayIndexComponent,
        resolve: { stays: staysResolver },
        data: { name: 'home' }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
