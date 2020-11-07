import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FollowedPage } from './followed.page';

describe('FollowedPage', () => {
  let component: FollowedPage;
  let fixture: ComponentFixture<FollowedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FollowedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
