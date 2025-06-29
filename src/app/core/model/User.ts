export interface User {
  pK_UserId?: number;
  fK_CustomerId?: number;
  fK_RoleId?: number;
  userGUID: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  userName: string;
}