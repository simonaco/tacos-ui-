import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { AppInsights } from 'applicationinsights-js';
import { DeviceDetectorService } from 'ngx-device-detector';
import { UserService } from './security/user.service';
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  deviceInfo;
  constructor(public router: Router, private deviceService: DeviceDetectorService, public userService: UserService) {
    userService.checkUserState();
  }

  ngOnInit() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    AppInsights.downloadAndSetup({
      instrumentationKey: '2c847176-e1b4-4b63-b2c5-996753f5410b',
      enableCorsCorrelation: true
    });
    AppInsights.queue.push(() => {
      AppInsights.context.addTelemetryInitializer(envelope => {
        envelope.tags['ai.cloud.role'] = 'UI';
      });
      AppInsights.context.device.os = this.deviceInfo.os;
      AppInsights.context.device.osversion = this.deviceInfo.os_version;
      AppInsights.context.device.browser_version = this.deviceInfo.browser_version;
      AppInsights.context.device.userAgent = this.deviceInfo.userAgent;
    });

    console.log(this.deviceInfo);
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          AppInsights.trackPageView('home');
        } else {
          AppInsights.trackPageView(event.url.substring(1));
        }
      }
    });
  }
}
