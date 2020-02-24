/*ignore file coverage*/

import { TestBed } from '@angular/core/testing';

const resetTestingModule = TestBed.resetTestingModule;
const preventAngularFromResetting = () => (TestBed.resetTestingModule = () => TestBed);
const allowAngularToReset = () => (TestBed.resetTestingModule = resetTestingModule);

export const preventTestBedResetForComponentCompilation = (configureTestingModule: () => void) => {
  beforeAll(async done =>
    (async () => {
      resetTestingModule();
      preventAngularFromResetting();
      configureTestingModule();
      await TestBed.compileComponents();

      // prevent Angular from resetting testing module
      TestBed.resetTestingModule = () => TestBed;
    })()
      .then(done)
      .catch(done.fail)
  );

  afterAll(allowAngularToReset);
};
