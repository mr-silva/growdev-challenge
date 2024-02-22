import { RoleTypeEnum } from '../../Domain'

export class ApplicationContext {
  constructor(private readonly roleType?: RoleTypeEnum, private readonly userId?: string) {}

  public getUserId(): string | undefined {
    return this.userId
  }

  public getRoleType(): RoleTypeEnum | undefined {
    return this.roleType
  }
}
