/*ignore file coverage*/

import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Type } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { Action, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, Observer, Subject, defer } from 'rxjs';

export interface ICompiledComponent<T> {
  fixture: ComponentFixture<T>;
  instance: T;
  nativeElement: any;
}

export interface IActivatedRouteMock extends ActivatedRoute {
  paramsMock$: Subject<Params>;
  parentMock: IActivatedRouteMock;
}

export interface IDeferredMock<T> {
  promise: Promise<T>;
  reject(error: any): any;
  resolve(result: T): any;
}

export interface IObservableMock<T> {
  observable: Observable<T>;
  observer: Observer<T>;
}

export class TestUtils {
  static configureBaseTestingModule(moduleDef: TestModuleMetadata = {}): typeof TestBed {
    return TestBed.configureTestingModule({
      declarations: [].concat(moduleDef.declarations || []),
      imports: [
        // Angular
        HttpClientModule,
        // Other libraries
        TranslateModule.forRoot()
      ].concat(moduleDef.imports || []),
      providers: [
        // Angular
      ].concat(moduleDef.providers || []),
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }

  // Http service

  static configureHttpServiceTestingModule(moduleDef: TestModuleMetadata = {}): typeof TestBed {
    return TestUtils.configureServiceTestingModule({
      declarations: [].concat(moduleDef.declarations || []),
      imports: [
        // Angular
        HttpClientModule
      ].concat(moduleDef.imports || []),
      providers: [
        // Angular
        // add providers if needed
      ].concat(moduleDef.providers || []),
      schemas: [].concat(moduleDef.schemas || [])
    });
  }

  // Service

  static configureServiceTestingModule(moduleDef: TestModuleMetadata = {}): typeof TestBed {
    return TestUtils.configureBaseTestingModule({
      declarations: [].concat(moduleDef.declarations || []),
      imports: [].concat(moduleDef.imports || []),
      providers: [].concat(moduleDef.providers || []),
      schemas: [].concat(moduleDef.schemas || [])
    });
  }

  // Guard service

  static configureGuardServiceTestingModule(moduleDef: TestModuleMetadata = {}): typeof TestBed {
    return TestUtils.configureServiceTestingModule({
      declarations: [].concat(moduleDef.declarations || []),
      imports: [HttpClientModule, RouterTestingModule].concat(moduleDef.imports || []),
      providers: [].concat(moduleDef.providers || []),
      schemas: [].concat(moduleDef.schemas || [])
    });
  }

  // Components

  static configureComponentTestingModule(moduleDef: TestModuleMetadata = {}): typeof TestBed {
    return TestUtils.configureBaseTestingModule({
      declarations: [].concat(moduleDef.declarations || []),
      imports: [].concat(moduleDef.imports || []),
      providers: [].concat(moduleDef.providers || []),
      schemas: [].concat(moduleDef.schemas || [])
    });
  }

  static configureComponentWithStoreTestingModule(
    moduleDef: TestModuleMetadata = {}
  ): typeof TestBed {
    return TestUtils.configureBaseTestingModule({
      declarations: [].concat(moduleDef.declarations || []),
      imports: [
        StoreModule.forRoot(
          {},
          {
            runtimeChecks: {
              strictStateImmutability: true,
              strictActionImmutability: true,
              strictActionSerializability: true,
              strictStateSerializability: true
            }
          }
        ),
        EffectsModule.forRoot([])
      ].concat(moduleDef.imports || []),
      providers: [provideMockStore()].concat(moduleDef.providers || []),
      schemas: [].concat(moduleDef.schemas || [])
    });
  }

  static createComponent<T>(
    component: Type<T>
  ): { fixture: ComponentFixture<T>; instance: T; nativeElement: any } {
    const fixture: ComponentFixture<T> = TestBed.createComponent<T>(component);

    return {
      fixture,
      instance: fixture.debugElement.componentInstance,
      nativeElement: fixture.debugElement.nativeElement
    };
  }

  // Pipes

  static configurePipeTestingModule(moduleDef: TestModuleMetadata = {}): typeof TestBed {
    return TestUtils.configureComponentTestingModule(moduleDef);
  }

  // Action

  static configureActionTestingModule(moduleDef: TestModuleMetadata = {}): typeof TestBed {
    return TestUtils.configureBaseTestingModule({
      declarations: [].concat(moduleDef.declarations || []),
      imports: [].concat(moduleDef.imports || []),
      providers: [].concat(moduleDef.providers || []),
      schemas: [].concat(moduleDef.schemas || [])
    });
  }

  // Effects

  static configureEffectTestingModule(moduleDef: TestModuleMetadata = {}): typeof TestBed {
    return TestUtils.configureBaseTestingModule({
      declarations: [].concat(moduleDef.declarations || []),
      imports: [
        // Angular
        RouterTestingModule,
        // Other libraries
        StoreModule.forRoot(
          {},
          {
            runtimeChecks: {
              strictStateImmutability: true,
              strictActionImmutability: true,
              strictActionSerializability: true,
              strictStateSerializability: true
            }
          }
        )
      ].concat(moduleDef.imports || []),
      providers: [].concat(moduleDef.providers || []),
      schemas: [].concat(moduleDef.schemas || [])
    });
  }

  // Observable

  static createObservableMock<T>(): IObservableMock<T> {
    const observableMock: IObservableMock<T> = {
      observable: undefined,
      observer: undefined
    };

    observableMock.observable = new Observable<T>(observer => {
      observableMock.observer = observer;
    });

    return observableMock;
  }

  // Spy

  static createSpyObjWithoutMethods<T>(baseName: string): T {
    return jasmine.createSpyObj<T>(baseName, ['toString'] as any);
  }

  // Mock
  static actionTransactionWithSomeTransactionId(action: Action): any {
    return jasmine.objectContaining<any>({
      ...action,
      transactionId: jasmine.any(String) as any
    }) as any;
  }

  static asyncData<T>(data: T) {
    return defer(() => Promise.resolve(data));
  }

  static asyncError<T>(errorObject: any) {
    return defer(() => Promise.reject(errorObject));
  }
}
