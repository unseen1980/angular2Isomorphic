import {Component, Directive, ElementRef, Renderer} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Http} from '@angular/http';

@Component({
  selector: 'app', 
  directives: [
    ...ROUTER_DIRECTIVES
  ],
  styles: [`
    * { padding:0; margin:0; }
    #universal { text-align:center; font-weight:bold; padding:15px 0; }
    nav { background:#158126; min-height:40px; border-bottom:5px #046923 solid; }
    nav a { font-weight:bold; text-decoration:none; color:#fff; padding:20px; display:inline-block; }
    nav a:hover { background:#00AF36; }
    .hero-universal { min-height:500px; display:block; padding:20px;}
    .inner-hero { background: rgba(255, 255, 255, 0.75); border:5px #ccc solid; padding:25px; }
    .router-link-active { background-color: #00AF36; }
    blockquote { border-left:5px #158126 solid; background:#fff; padding:20px 20px 20px 40px; }
    blockquote::before { left: 1em; }
    main { padding:20px 0; }
    pre { font-size:12px; }
  `],
  template: `
  <h3 id="universal">Hacker News stories pre-rendered</h3>
  <div class="hero-universal" *ngIf="completeStories.length > 0">
    <div class="inner-hero">
      <!-- <pre>{{ completeStories | json }}</pre> -->
      <ul style="list-style-type: none;">
        <li *ngFor="let d of completeStories;" style="padding-bottom:20px;">
          <div>
            <h2>{{d.title}}</h2>
            <small>{{d.by}}</small>
            <p [innerHTML]=d.text></p>
          </div>    
        </li>
      </ul>
    </div>
  </div>
  `
})

export class App {
  title: string = 'ftw';
  data = [];
  qArray = [];
  completeStories = [];

  constructor(public http: Http) { }

  ngOnInit() {
    this.http.get('https://hacker-news.firebaseio.com/v0/askstories.json')
      .subscribe(res => {
        this.qArray = res.json().slice(0, 6);
        this.qArray.map(story => {
          this.http.get('https://hacker-news.firebaseio.com/v0/item/' + story + '.json')
            .subscribe(res => {
              //this.completeStories.push({res.json()});
              this.completeStories.push(
                  {
                    'title': res.json().title,
                    'text' : res.json().text,
                    'by': res.json().by
                  }
                );
            });
        });
      });
  }
}
