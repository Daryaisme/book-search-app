import { TestBed } from '@angular/core/testing';
import {  provideStore,  Store } from '@ngxs/store';
import { SelectedBookState, SelectedBookStateModel } from './selected-book.state';
import { SelectedBookAction } from './selected-book.actions';

describe('SelectedBook store', () => {
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
       providers: [provideStore([SelectedBookState])]
      
    });

    store = TestBed.inject(Store);
  });

  it('should create an action and add an item', () => {
    const expected: SelectedBookStateModel = {
      items: ['item-1']
    };
    store.dispatch(new SelectedBookAction('item-1'));
    const actual = store.selectSnapshot(SelectedBookState.getState);
    expect(actual).toEqual(expected);
  });

});
