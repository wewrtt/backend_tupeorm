import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';

@Controller({
  path: 'roles',
  version: '1',
})
@ApiTags('Roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
}
