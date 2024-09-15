import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MachinesListComponent } from './pages/machines-list/machines-list.component';
import { AddMachineComponent } from './pages/add-machine/add-machine.component';
import { RegisterComponent } from './pages/register/register.component';
import { DeletionConfirmationComponent } from './pages/deletion-confirmation/deletion-confirmation.component';
import { EditMachinePageComponent } from './pages/edit-machine-page/edit-machine-page.component';
import { SparePartsListComponent } from './pages/spare-parts-list/spare-parts-list.component';
import { AddSparePartComponent } from './pages/add-spare-part/add-spare-part.component';
import { MaintenancesComponent } from './pages/maintenances/maintenances.component';

export const routes: Routes = [
    {'path': '', redirectTo: '/sign-in', pathMatch: 'full'},
    {'path': 'sign-in', component: LoginComponent},
    {'path': 'sign-up', component: RegisterComponent},
    {'path': 'machines', component: MachinesListComponent},
    {'path': 'machines/add', component: AddMachineComponent},
    {'path': 'deletion/confirmation', component: DeletionConfirmationComponent},
    {'path': 'edit/machine', component: EditMachinePageComponent},
    {'path': 'spare/parts', component: SparePartsListComponent},
    {'path': 'spare/parts/add', component: AddSparePartComponent},
    {'path': 'maintenances', component: MaintenancesComponent}
];
