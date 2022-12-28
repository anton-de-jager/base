import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DirectoryDetailsComponent } from 'app/modules/admin/pages/directory-details/directory-details.component';

import { SharedModule } from 'app/shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const directoryDetailsRoutes: Route[] = [
    {
        path     : '',
        component: DirectoryDetailsComponent
    }
];

@NgModule({
    declarations: [
        DirectoryDetailsComponent
    ],
    imports     : [
        RouterModule.forChild(directoryDetailsRoutes),

        SharedModule,
        InfiniteScrollModule
    ]
})
export class DirectoryDetailsModule
{
}
