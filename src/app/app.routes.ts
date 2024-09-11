import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductComponent } from './components/product/product.component';
import { CategoryComponent } from './components/category/category.component';
import { BrandsComponent } from './components/brands/brands.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { OrdersComponent } from './components/orders/orders.component';

export const routes: Routes =  [
{path:'', component:AuthLayoutComponent ,canActivate:[logedGuard], children:[
    {path:'' , redirectTo:'login' , pathMatch:'full'},
    {path:'login' , component:LoginComponent},
    {path:'register' , component:RegisterComponent},
    {path:'forget' , component:ForgetpasswordComponent}
]},

{path:'', component:BlankLayoutComponent , canActivate:[authGuard] ,children:[

{path:'' , redirectTo:'home' , pathMatch:'full'},
{path:'home' , component:HomeComponent},
{path:'cart' , component:CartComponent},
{path:'product' ,component:ProductComponent},
{path:'category' , component:CategoryComponent},
{path:'brands' , component:BrandsComponent},
{path:'logout' , component:LoginComponent},
{path:'details/:id', component:DetailsComponent},
{path:"allorders" , component:AllordersComponent},
{path:"orders/:id",component:OrdersComponent}




] },

{path:'**' , component:NotfoundComponent}
];
