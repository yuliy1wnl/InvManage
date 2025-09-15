import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Landing & Auth Pages
import { LandingComponent } from './component/pages/landing/landing';
import { LoginComponent } from './component/pages/login/login';
import { SignupComponent } from './component/pages/signup/signup';

// Admin Module Components
import { AdminComponent } from './component/admin/admin/admin';
import { AdminLoginComponent } from './component/admin/admin-login/admin-login';
import { AdminDashboardComponent } from './component/admin/dashboard/dashboard';
import { AdminInventoryComponent } from './component/admin/inventory/inventory';
import { PurchaseOrders } from './component/admin/purchase-orders/purchase-orders';
import { Suppliers } from './component/admin/suppliers/suppliers';
import { Users } from './component/admin/users/users';
import { Reports } from './component/admin/reports/reports';

// User Module Components
import { UserComponents } from './component/user/user/user';
import { UserDashboardComponent } from './component/user/dashboard/dashboard';
import { OrderComponent } from './component/user/order/order';
import { UserInventoryComponent } from './component/user/inventory/userinventory';
import { PlaceOrder } from './component/user/place-order/place-order';
import { UserReports } from './component/user/reports/reports';
import { UserProfile } from './component/user/profile/profile';


// Guards
import { AdminGuard } from './component/core/guards/admin-guard';
import { UserGuard } from './component/core/guards/user-guard';

export const routes: Routes = [
  // Landing Page
  { path: '', component: LandingComponent },

  // Auth Pages
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // Admin login standalone page
  { path: 'admin/login', component: AdminLoginComponent },

  // Admin Routes (protected)
  
  {
  path: 'admin',
  children: [
    { path: 'login', component: AdminLoginComponent }, // login page
    {
      path: '',
      component: AdminComponent, // wrapper layout
      canActivateChild: [AdminGuard], // ✅ protect admin section
      children: [
        { path: 'dashboard', component: AdminDashboardComponent },
        { path: 'inventory', component: AdminInventoryComponent },
        { path: 'purchase-orders', component: PurchaseOrders },
        { path: 'suppliers', component: Suppliers },
        { path: 'users', component: Users },
        { path: 'reports', component: Reports },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
      ]
    }
  ]
},

  //USER ROUTES
  {
  path: 'user',
  component: UserComponents, // wrapper with sidebar like admin
  children: [
    { path: 'dashboard', component: UserDashboardComponent },
    { path: 'orders', component: OrderComponent },
    { path: 'inventory', component: UserInventoryComponent },
    { path: 'place-order', component: PlaceOrder },
    { path: 'reports', component: UserReports },
    { path: 'profile', component: UserProfile },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ],
  canActivate: [UserGuard]
},



  /* Placeholder for User Module (if implemented)
  {
    path: 'user',
    canActivate: [UserGuard],
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },
  */
  // Fallback
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
