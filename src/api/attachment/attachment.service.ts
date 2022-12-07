import { Injectable } from '@nestjs/common';
import { UploadS3Service } from 'src/share/services/upload/upload-s3.service';
import { Not } from 'typeorm';
import { ATTACHMENT_TYPE } from './attachment.constant';
import { IAttachment } from './attachment.interface';
import { AttachmentRepository } from './attachment.repository';
import { QueryParamDto } from './dto/query-param.dto';

@Injectable()
export class AttachmentService {
  constructor(
    private readonly attachmentRepository: AttachmentRepository,
    private readonly uploadS3Service: UploadS3Service,
  ) {}
  async upload(file: Express.Multer.File) {
    const fileUploaded = await this.uploadS3Service.uploadPublicFile(file);
    // link sẽ là localhost:9000/buket/key
    return fileUploaded;
  }

  async uploadAttachment(file: Express.Multer.File, userId: number, type: string) {
    const fileUploaded = await this.uploadS3Service.uploadPublicFile(file);
    return fileUploaded;
  }

  async getList(query: QueryParamDto) {
    const condition = {};
    if (query.key) {
      condition['key'] = query.key;
    }
    if (query.original_name) {
      condition['original_name'] = query.original_name;
    }
    if (query.author) {
      condition['author'] = query.author;
    }
    if (query.type) {
      condition['type'] = query.type;
    } else {
      condition['type'] = Not(ATTACHMENT_TYPE.AVATAR);
    }
    return this.attachmentRepository.findAllByConditions(condition, query);
  }
}
