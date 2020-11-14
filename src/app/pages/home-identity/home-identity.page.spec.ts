import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeIdentityPage } from './home-identity.page';

describe('HomeIdentityPage', () => {
  let component: HomeIdentityPage;
  let fixture: ComponentFixture<HomeIdentityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeIdentityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeIdentityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
