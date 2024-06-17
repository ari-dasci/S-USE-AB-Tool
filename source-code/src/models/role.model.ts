export interface Role {
  id: number;
  role_category: number;
  title: string;
  caption?: string;
}

export interface RoleCategory {
  id: number;
  caption: string;
  roles: Role[];
}
