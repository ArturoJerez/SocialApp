import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessagesSendedPage } from './messages-sended.page';

describe('MessagesSendedPage', () => {
  let component: MessagesSendedPage;
  let fixture: ComponentFixture<MessagesSendedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesSendedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesSendedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
