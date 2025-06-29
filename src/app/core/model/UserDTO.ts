export interface UserDTO {
  pK_UserId?: number;
  fK_CustomerId?: number;
  fK_RoleId?: number;
  userGUID: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  userName: string;
  pK_RoleId?: number;
  roleGUID: string;
  roleName: string;
  rOName: string;
  rODescription: string;
}