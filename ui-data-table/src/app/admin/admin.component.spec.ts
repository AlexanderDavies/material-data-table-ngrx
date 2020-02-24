
import { AdminComponent } from './admin.component';

import { preventTestBedResetForComponentCompilation } from '../shared/utils/tests/test.common';
import { TestUtils, ICompiledComponent } from '../shared/utils/tests/test-utils';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

describe('AdminComponent', () => {

  let compiled: ICompiledComponent<AdminComponent>;

  preventTestBedResetForComponentCompilation(() => {
    TestUtils.configureComponentWithStoreTestingModule({
      declarations: [
        AdminComponent,
      ],
      imports: [
        CommonModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    compiled = TestUtils.createComponent(AdminComponent);
  });

  it('should create', () => {
    expect(compiled.instance).toBeTruthy();
  });

  it('should render the app-header component', () => {
    compiled.fixture.detectChanges();
    expect(compiled.fixture.nativeElement.querySelector('app-header')).toBeTruthy();
  });

  it('should have a body element', () => {
    expect(compiled.fixture.nativeElement.querySelector('.body')).toBeTruthy();
  });

  it('should render the data table component', () => {
    expect(compiled.fixture.nativeElement.querySelector('app-user-table')).toBeTruthy();
  });

});
