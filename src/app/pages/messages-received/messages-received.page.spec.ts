import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessagesReceivedPage } from './messages-received.page';

describe('MessagesReceivedPage', () => {
  let component: MessagesReceivedPage;
  let fixture: ComponentFixture<MessagesReceivedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesReceivedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesReceivedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
