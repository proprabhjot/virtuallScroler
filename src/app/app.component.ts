import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ApiServiceService } from 'src/app/Service/api-service.service';
import { Photos } from 'src/app/photos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent {
  title = 'Angular 7 CDK Virtual Scroll';
  ds = new MyDataSource(this.api);

  constructor(private api: ApiServiceService) {}
}

export class MyDataSource extends DataSource<Photos> {

  private photos:Photos[];
  private dataStream = new BehaviorSubject<Photos[]>([]);

  constructor(private api: ApiServiceService) {
    super();
  }

  connect() {
    this.api.getPhotos()
      .subscribe((photos) => {
        this.photos = photos;
        this.dataStream.next(this.photos);
      });

    return this.dataStream;
  }

  disconnect(): void {
  }

}
