'use strict';

import { getChildDebugElement } from 'tests/helpers';
import {Component, View, provide} from 'angular2/core';

import {
  TestComponentBuilder,
  injectAsync,
  beforeEach,
  beforeEachProviders,
  it
} from 'angular2/testing';

import Redoc from 'lib/components/Redoc/redoc';
import SchemaManager from 'lib/utils/SchemaManager';

describe('Redoc components', () => {
  describe('Redoc Component', () => {
    let builder;
    beforeEachProviders(() => [
        provide(SchemaManager, {useValue: new SchemaManager()})
    ]);
    beforeEach(injectAsync([TestComponentBuilder, SchemaManager], (tcb, schemaMgr) => {
      builder = tcb;
      return schemaMgr.load('/tests/schemas/extended-petstore.json').then(() => null, (err) => { throw err; });
    }));


    it('should init component', (done) => {
      builder.createAsync(TestApp).then(fixture => {
        let component = getChildDebugElement(fixture.debugElement, 'redoc').componentInstance;
        expect(component).not.toBeNull();
        fixture.destroy();
        done();
      }, err => done.fail(err));
    });

    it('should init components tree without errors', (done) => {
      builder.createAsync(TestApp).then(fixture => {
        (() => fixture.detectChanges()).should.not.throw();
        fixture.destroy();
        done();
      }, err => done.fail(err));
    });
  });
});

/** Test component that contains a Redoc. */
@Component({selector: 'test-app'})
@View({
  directives: [Redoc],
  template:
      `<redoc></redoc>`
})
class TestApp {
}