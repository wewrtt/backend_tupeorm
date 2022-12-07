import { Body, Controller, Get, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IUserPayload } from 'src/share/common/app.interface';
import { GetUser } from 'src/share/decorator/get-user.decorator';
// import { ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ATTACHMENT_SWAGGER_RESPONSE, ATTACHMENT_TYPE } from './attachment.constant';
import { AttachmentService } from './attachment.service';
import { CreateAttachmentDto, CreateAvatarDto } from './dto/create-attachment.dto';
import { QueryParamDto } from './dto/query-param.dto';

@Controller({
  version: ['1'],
  path: 'attachment',
})
@ApiTags('Attachment')
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Post('')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('attachment'))
  @ApiOkResponse(ATTACHMENT_SWAGGER_RESPONSE.CREATE_SUCCESS)
  @ApiBadRequestResponse(ATTACHMENT_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiBearerAuth()
  async uploadAttachment(@Body() body: CreateAvatarDto, @UploadedFile() file: Express.Multer.File) {
    return this.attachmentService.upload(file);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse(ATTACHMENT_SWAGGER_RESPONSE.GET_LIST_SUCCESS)
  @ApiBadRequestResponse(ATTACHMENT_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiBearerAuth()
  async getList(@Query() query: QueryParamDto) {
    return this.attachmentService.getList(query);
  }

  @Post('avatar')
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('attachment'))
  @ApiOkResponse(ATTACHMENT_SWAGGER_RESPONSE.CREATE_SUCCESS)
  @ApiBadRequestResponse(ATTACHMENT_SWAGGER_RESPONSE.BAD_REQUEST_EXCEPTION)
  @ApiBearerAuth()
  async uploadAvatar(
    @Body() body: CreateAvatarDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: IUserPayload,
  ) {
    const type = ATTACHMENT_TYPE.AVATAR;
    return this.attachmentService.uploadAttachment(file, user.sub, type);
  }
}
