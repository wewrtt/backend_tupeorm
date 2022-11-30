import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import DataSource from '../../configs/typeorm.config';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AWS_S3, CRON, NOTIFICATION } from 'src/configs/constant.config';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class NotificationService {
  pattern: string;
  constructor(private readonly httpService: HttpService) {}
  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async test() {
    const date = new Date().getDate() + '/' + (new Date().getMonth() + 1);
    const users: UserEntity[] = await DataSource.createQueryBuilder(UserEntity, 'u')
      .select(['*', 'substring(u.birthday, 1,5) currentdate'])
      .having('currentdate = :date', {
        date: date,
      })
      .execute();

    const webhookURL = NOTIFICATION.NOTIFICATION_URL;
    const img = [];
    let message = '';
    for (let i = 0; i < users.length; i++) {
      img.push({
        image: {
          imageUrl: `https://${AWS_S3.BUCKET}.${AWS_S3.REGION}.amazonaws.com/${users[i].avatar}`,
        },
      });
      message += ' ' + users[i].first_name;
    }
    const data = {
      text: CRON.MESSAGE + message,
      cards: [
        {
          sections: [
            {
              widgets: img,
            },
          ],
        },
      ],
    };
    try {
      await firstValueFrom(
        this.httpService.post(webhookURL, data, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        }),
      );
    } catch (error) {
      return error;
    }
    return true;
  }
}
