export interface ProjectFormData {
  name: string;
  // description: string;
  begin?: Date;
  end?: Date;
  pic?: string;
  needsroleassignment: boolean ;
}

export interface Project extends ProjectFormData {
  id: number;
  experts: number;
  users: number;
}

export interface UsersScale {
  experts: number;
  endUsers: number;
}

export interface ProjectEvaluatorFormData {
  user: number;
  role: "USER" | "EXPERT";
}

export interface ProjectEvaluator extends ProjectEvaluatorFormData {
  fullname: string;
  email: string;
  organization: string;
}
