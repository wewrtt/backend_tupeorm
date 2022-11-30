import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';

@Controller({
  version: ['1'],
  path: 'notifications',
})
@ApiTags('Notification')
export class NotificationController {
  constructor(private readonly notificationervice: NotificationService) {}
}
