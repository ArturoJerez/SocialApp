import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessagesMainPage } from './messages-main.page';

describe('MessagesMainPage', () => {
  let component: MessagesMainPage;
  let fixture: ComponentFixture<MessagesMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesMainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessagesMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
