import { Component } from '@angular/core';

@Component({
    selector: 'app-main-panel',
    template: `
        <router-outlet></router-outlet>
    `,
})
export class MainPanelComponent {

    constructor() {}

    public ngOnInit() {}
}
