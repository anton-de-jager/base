import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DirectoryDetailsOpenComponent } from 'app/modules/landing/directoryDetails/directoryDetails.component';

import { SharedModule } from 'app/shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const directoryDetailsRoutes: Route[] = [
    {
        path     : '',
        component: DirectoryDetailsOpenComponent
    }
];

@NgModule({
    declarations: [
        DirectoryDetailsOpenComponent
    ],
    imports     : [
        RouterModule.forChild(directoryDetailsRoutes),

        SharedModule,
        InfiniteScrollModule
    ]
})
export class DirectoryDetailsOpenModule
{
}
