import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PublicationViewPage } from './publication-view.page';

describe('PublicationViewPage', () => {
  let component: PublicationViewPage;
  let fixture: ComponentFixture<PublicationViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicationViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
