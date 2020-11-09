import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessagesAddPage } from './messages-add.page';

describe('MessagesAddPage', () => {
  let component: MessagesAddPage;
  let fixture: ComponentFixture<MessagesAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
